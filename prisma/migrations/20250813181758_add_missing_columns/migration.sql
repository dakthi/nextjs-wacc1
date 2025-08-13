/*
  Warnings:

  - You are about to drop the `homepage_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "public"."community_groups" ADD COLUMN     "age_group" TEXT,
ADD COLUMN     "category" TEXT DEFAULT 'Cultural & Social',
ADD COLUMN     "contact_email" TEXT,
ADD COLUMN     "contact_name" TEXT,
ADD COLUMN     "contact_phone" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "display_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "facebook_url" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fees" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "instagram_url" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "meeting_day" TEXT,
ADD COLUMN     "meeting_time" TEXT,
ADD COLUMN     "member_count" INTEGER,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "website_url" TEXT;

-- AlterTable
ALTER TABLE "public"."media_library" ADD COLUMN     "height" INTEGER,
ADD COLUMN     "optimized_path" TEXT,
ADD COLUMN     "optimized_size" INTEGER,
ADD COLUMN     "thumbnail_path" TEXT,
ADD COLUMN     "thumbnail_size" INTEGER,
ADD COLUMN     "width" INTEGER;

-- DropTable
DROP TABLE "public"."homepage_content";

-- DropTable
DROP TABLE "public"."notes";
