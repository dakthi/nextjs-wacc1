-- Add missing Booking and BookingAvailability tables

-- Create bookings table
CREATE TABLE IF NOT EXISTS "public"."bookings" (
    "id" SERIAL NOT NULL,
    "facility_id" INTEGER NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "customer_phone" TEXT,
    "event_title" TEXT NOT NULL,
    "event_description" TEXT,
    "start_date_time" TIMESTAMP(3) NOT NULL,
    "end_date_time" TIMESTAMP(3) NOT NULL,
    "total_hours" DECIMAL(4,2) NOT NULL,
    "hourly_rate" DECIMAL(8,2),
    "total_cost" DECIMAL(10,2),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- Create booking_availability table
CREATE TABLE IF NOT EXISTS "public"."booking_availability" (
    "id" SERIAL NOT NULL,
    "facility_id" INTEGER NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "booking_availability_pkey" PRIMARY KEY ("id")
);

-- Add unique constraint for booking_availability
CREATE UNIQUE INDEX IF NOT EXISTS "booking_availability_facility_id_day_of_week_key" 
ON "public"."booking_availability"("facility_id", "day_of_week");

-- Add foreign key constraints
ALTER TABLE "public"."bookings" 
ADD CONSTRAINT "bookings_facility_id_fkey" 
FOREIGN KEY ("facility_id") REFERENCES "public"."facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "public"."booking_availability" 
ADD CONSTRAINT "booking_availability_facility_id_fkey" 
FOREIGN KEY ("facility_id") REFERENCES "public"."facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;