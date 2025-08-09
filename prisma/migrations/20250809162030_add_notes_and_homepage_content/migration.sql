-- CreateTable
CREATE TABLE "public"."notes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."homepage_content" (
    "id" SERIAL NOT NULL,
    "hero_title" TEXT,
    "hero_subtitle" TEXT,
    "hero_description" TEXT,
    "hero_video_url" TEXT,
    "hero_button_text" TEXT,
    "hero_button_link" TEXT,
    "banner_programs_title" TEXT,
    "banner_programs_subtitle" TEXT,
    "banner_programs_image" TEXT,
    "banner_facilities_title" TEXT,
    "banner_facilities_subtitle" TEXT,
    "community_pretitle" TEXT,
    "community_title" TEXT,
    "community_description" TEXT,
    "about_title" TEXT,
    "about_description" TEXT,
    "about_button_text" TEXT,
    "about_button_link" TEXT,
    "facilities_title" TEXT,
    "facilities_description" TEXT,
    "facilities_contact" TEXT,
    "facilities_section_heading" TEXT,
    "location_title" TEXT,
    "location_description" TEXT,
    "location_contact" TEXT,
    "location_section_heading" TEXT,
    "location_image" TEXT,
    "programs_section_title" TEXT,
    "programs_view_all_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homepage_content_pkey" PRIMARY KEY ("id")
);
