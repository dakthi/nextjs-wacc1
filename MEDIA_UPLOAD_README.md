# Media Upload System

## Overview

The CMS now includes a comprehensive media upload and management system that replaces manual URL entry with proper file uploads.

## Features

### ✅ **File Upload & Management**
- **Drag & Drop**: Intuitive file upload with drag and drop support
- **File Validation**: Automatic validation of file type, size (max 5MB)
- **Supported Formats**: JPG, PNG, GIF, WebP, SVG
- **Metadata Management**: Alt text and captions for accessibility

### ✅ **Media Library**
- **Centralized Storage**: All uploaded media in `/admin/media`
- **Visual Browser**: Grid-based image browser with previews
- **Search & Filter**: Easy browsing of uploaded files
- **File Details**: View dimensions, file size, upload date
- **Copy Paths**: One-click copy of file paths for manual use

### ✅ **Integration Points**
- **Programs**: Featured images for program listings
- **Facilities**: Hero images for facility descriptions  
- **FAQ**: Supporting images for FAQ items
- **Future**: Testimonials, site settings, etc.

## File Storage

- **Upload Directory**: `/public/uploads/`
- **File Naming**: `{timestamp}_{random}_{sanitized_name}.{ext}`
- **Database**: `MediaItem` model tracks all uploaded files
- **Cleanup**: Delete operations remove both file and database record

## API Endpoints

### `GET /api/media`
Get all media items (sorted by upload date)

### `POST /api/media`
Upload new media file
- **Auth Required**: Yes
- **Body**: FormData with `file`, `altText`, `caption`
- **Validation**: File type, size limits
- **Response**: Created MediaItem

### `GET /api/media/[id]`
Get single media item details

### `PUT /api/media/[id]`
Update media item metadata (alt text, caption)
- **Auth Required**: Yes

### `DELETE /api/media/[id]`
Delete media item and file from disk
- **Auth Required**: Yes

## Components

### `<FileUpload />`
Reusable upload component with:
- File validation
- Drag & drop support  
- Media library browser
- Current image preview
- Remove functionality

**Usage:**
```tsx
<FileUpload
  onFileSelect={(mediaItem) => {
    setFormData(prev => ({ ...prev, imageUrl: mediaItem.filePath }))
  }}
  currentImage={formData.imageUrl}
  label="Program Image"
  accept="image/*"
/>
```

## Updated Admin Forms

The following admin forms now use `<FileUpload />` instead of text inputs:

- **Programs** (`/admin/programs`) - Program images
- **Facilities** (`/admin/facilities`) - Facility images  
- **FAQ** (`/admin/faq`) - Supporting images

## Security

- **Authentication**: All upload operations require admin authentication
- **File Validation**: Strict file type and size limits
- **Sanitization**: Filenames are sanitized to prevent path traversal
- **Storage**: Files stored in public directory with unique names

## Future Enhancements

### Planned Features:
- **Image Resizing**: Automatic generation of thumbnail/responsive sizes
- **Bulk Upload**: Multiple file upload at once
- **Advanced Search**: Filter by file type, date, size
- **Usage Tracking**: See where images are used across the site
- **CDN Integration**: Optional cloud storage integration

### Database Schema:
The `MediaItem` model is ready for additional fields:
```typescript
model MediaItem {
  id           Int      @id @default(autoincrement())
  filename     String
  originalName String   @map("original_name")
  filePath     String   @map("file_path")
  fileType     String   @map("file_type")
  fileSize     Int?     @map("file_size")
  altText      String?  @map("alt_text")
  caption      String?
  uploadedAt   DateTime @default(now()) @map("uploaded_at")
  
  @@map("media_library")
}
```

## Migration Notes

- Existing image URLs in the database will continue to work
- Admin forms now provide both upload and media library selection
- No database migration required - MediaItem table already exists
- Uploaded files are stored in `/public/uploads/` (make sure this directory exists)

The system is fully backward compatible while providing modern file upload capabilities.