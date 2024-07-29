import type { ActionRequest } from 'adminjs' with { 'resolution-mode': 'require' };
import { prismaClient } from 'src/prisma.service';

export const newHandler = async (request: ActionRequest) => {
  const {
    word,
    plural,
    ranking,
    meaning,
    exampleSentence,
    exampleSentenceTranslation,
    category,
    level,
  } = request.payload;

  // TODO: Call the DeepL service once it's implemented
  const exampleSentenceTranslationContent = exampleSentenceTranslation;

  const vocabularyItem = await prismaClient.vocabularyItem.create({
    data: {
      word,
      plural,
      ranking: Number(ranking),
      meaning,
      exampleSentence,
      exampleSentenceTranslation: exampleSentenceTranslationContent,
      categoryId: Number(category),
      level,
    },
  });

  return {
    redirectUrl: `/admin/resources/VocabularyItem/actions/new?word=&level=${level}&category=${category}`, // redirect to the new page with prefilled level and category
    record: {
      success: true,
      errors: [],
      ...vocabularyItem,
    },
  };
};
