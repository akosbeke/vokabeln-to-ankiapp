/*
  Warnings:

  - Added the required column `vocabularyItemLevelId` to the `VocabularyItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "VocabularyItemLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VocabularyItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,
    "plural" TEXT,
    "exampleSentence" TEXT,
    "categoryId" INTEGER NOT NULL,
    "vocabularyItemLevelId" INTEGER NOT NULL,
    CONSTRAINT "VocabularyItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VocabularyItem_vocabularyItemLevelId_fkey" FOREIGN KEY ("vocabularyItemLevelId") REFERENCES "VocabularyItemLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VocabularyItem" ("categoryId", "exampleSentence", "id", "meaning", "plural", "ranking", "word") SELECT "categoryId", "exampleSentence", "id", "meaning", "plural", "ranking", "word" FROM "VocabularyItem";
DROP TABLE "VocabularyItem";
ALTER TABLE "new_VocabularyItem" RENAME TO "VocabularyItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
