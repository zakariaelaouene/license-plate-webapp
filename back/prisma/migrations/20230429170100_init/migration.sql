-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_registrationNumber_key" ON "cars"("registrationNumber");
