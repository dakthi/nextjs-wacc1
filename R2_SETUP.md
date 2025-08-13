# Cloudflare R2 Storage Setup Guide

## Overview
This application supports both local file storage and Cloudflare R2 (S3-compatible cloud storage). When R2 is configured, all uploaded images are stored in the cloud and served via Cloudflare's global CDN.

## Current Status
- ✅ R2 integration code is ready
- ✅ Automatic fallback to local storage when R2 is not configured
- ✅ Environment variables are prepared in `.env`
- ⏳ Waiting for R2 credentials to be filled in

## Setup Instructions

### 1. Create a Cloudflare R2 Bucket

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **R2** in the sidebar
3. Click **Create Bucket**
4. Name your bucket (e.g., `wacc-media`)
5. Choose a location (recommend: Automatic)
6. Click **Create Bucket**

### 2. Create R2 API Token

1. In R2 dashboard, click **Manage R2 API Tokens**
2. Click **Create API Token**
3. Configure the token:
   - **Token name**: `wacc-website-token`
   - **Permissions**: `Object Read & Write`
   - **Specify bucket**: Select your bucket
   - **TTL**: Leave as default or set expiry
4. Click **Create API Token**
5. **IMPORTANT**: Copy and save these values immediately:
   - Access Key ID
   - Secret Access Key
   - Account ID (shown in R2 dashboard URL)

### 3. Configure Public Access (Optional but Recommended)

For public website images, enable public access:

1. Go to your bucket settings
2. Click **Settings** tab
3. Under **Public Access**, click **Configure**
4. Enable public access
5. Copy the public URL (format: `https://pub-xxxxx.r2.dev`)

Alternatively, set up a custom domain:
1. Go to bucket **Settings** → **Custom Domains**
2. Add your domain (e.g., `media.yoursite.com`)
3. Configure DNS as instructed

### 4. Update Environment Variables

Edit your `.env` file with the R2 credentials:

```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID="your-actual-account-id"
R2_ACCESS_KEY_ID="your-actual-access-key-id"
R2_SECRET_ACCESS_KEY="your-actual-secret-access-key"
R2_BUCKET_NAME="wacc-media"  # or your bucket name

# R2 Public URL (if public access is enabled)
R2_PUBLIC_URL="https://pub-xxxxx.r2.dev"  # or your custom domain

# R2 Region (usually auto)
R2_REGION="auto"
```

### 5. Restart the Application

After updating `.env`, restart your Next.js application:

```bash
npm run dev
# or in production
npm run build && npm start
```

### 6. Verify Configuration

1. Go to `/admin/media` in your browser
2. Check the storage status banner:
   - ✅ Green: "Storage Mode: Cloudflare R2 (Cloud)"
   - ⚠️ Yellow: "Storage Mode: Local File System"

## How It Works

### When R2 is Configured:
1. Files are uploaded directly to R2
2. Database stores the R2 URL
3. Images are served from R2's global CDN
4. Automatic cleanup when images are deleted

### When R2 is NOT Configured:
1. Files are stored in `/public/uploads`
2. Database stores local file paths
3. Images are served via `/api/media/file/[filename]`
4. Works fine for development and small deployments

## Storage Comparison

| Feature | Local Storage | R2 Storage |
|---------|--------------|------------|
| **Setup Complexity** | None | Medium |
| **Cost** | Free | Pay per usage |
| **Scalability** | Limited | Unlimited |
| **Global Performance** | Slow | Fast (CDN) |
| **Persistence** | Server-dependent | Always persistent |
| **Backup** | Manual | Automatic |
| **Max File Size** | 5MB (configurable) | 5MB (configurable) |

## Costs

Cloudflare R2 pricing (as of 2024):
- **Storage**: $0.015 per GB per month
- **Class A operations** (uploads): $4.50 per million requests
- **Class B operations** (downloads): $0.36 per million requests
- **Free tier**: 10GB storage, 1M Class A ops, 10M Class B ops per month

For a community center website, the free tier should be sufficient.

## Troubleshooting

### "R2 storage is not configured" error
- Check all environment variables are set correctly
- Ensure no typos in credentials
- Restart the application after updating `.env`

### "Failed to upload file to cloud storage" error
- Verify API token has write permissions
- Check bucket name matches exactly
- Ensure bucket exists in your account

### Images not loading from R2
- If using public URL, ensure public access is enabled
- Check CORS settings if needed
- Verify the public URL format is correct

## Migration

### From Local to R2
1. Configure R2 as above
2. Existing local files continue to work
3. New uploads go to R2
4. Optionally migrate old files using AWS CLI:
   ```bash
   aws s3 sync ./public/uploads s3://your-bucket/uploads --endpoint-url https://[account-id].r2.cloudflarestorage.com
   ```

### From R2 to Local
1. Remove R2 configuration from `.env`
2. Restart application
3. New uploads will use local storage
4. Existing R2 URLs continue to work

## Security Notes

- Never commit R2 credentials to git
- Use environment variables only
- Rotate API tokens periodically
- Consider IP restrictions for API tokens
- Enable 2FA on your Cloudflare account

## Support

For R2-specific issues:
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [R2 API Documentation](https://developers.cloudflare.com/r2/api/s3/)

For application issues:
- Check `/api/media/status` endpoint
- Review logs for `[MEDIA API]` entries
- Ensure sharp library is installed for image processing