-- CreateEnum
CREATE TYPE "VocabularyItemLevel" AS ENUM ('A1_2', 'B1_2');

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VocabularyItem" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,
    "plural" TEXT,
    "exampleSentence" TEXT,
    "level" "VocabularyItemLevel" NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "VocabularyItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabularyItem" ADD CONSTRAINT "VocabularyItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
