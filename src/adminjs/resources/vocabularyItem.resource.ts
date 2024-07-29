import { newHandler } from '../actions/vocabularyItems.actions.js';
import { Resource } from './types.js';

export const vocabularyItemResource: Resource = async ({ client }) => {
  const { getModelByName } = await import('@adminjs/prisma');

  return {
    resource: {
      model: getModelByName('VocabularyItem'),
      client,
    },
    options: {
      navigation: {},
      sort: {
        sortBy: 'id',
        direction: 'asc',
      },
      listProperties: [
        'word',
        'plural',
        'meaning',
        'ranking',
        'category',
        'level',
      ],
      editProperties: [
        'word',
        'plural',
        'ranking',
        'meaning',
        'exampleSentence',
        'exampleSentenceTranslation',
        'category',
        'level',
      ],
      properties: {
        exampleSentenceTranslation: {
          description:
            'This is being generated automatically from the example sentence',
        },
        word: {
          type: 'richtext',
          isTitle: true,
        },
        level: {
          availableValues: [
            { value: 'A1_2', label: 'A-level' },
            { value: 'B1_2', label: 'B-level' },
          ],
        },
      },
      actions: {
        new: {
          handler: newHandler,
        },
      },
    },
  };
};
