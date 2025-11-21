-- CreateTable
CREATE TABLE "Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "city_mpg" REAL NOT NULL,
    "hwy_mpg" REAL NOT NULL
);
