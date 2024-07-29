import { Resource } from './types.js';

export const categoryResource: Resource = async ({ client }) => {
  const { getModelByName } = await import('@adminjs/prisma');

  return {
    resource: {
      model: getModelByName('Category'),
      client,
    },
    options: {
      navigation: {},
    },
  };
};
