import { Resource } from './types.js';

export const moduleResource: Resource = async ({ client }) => {
  const { getModelByName } = await import('@adminjs/prisma');

  return {
    resource: {
      model: getModelByName('Module'),
      client,
    },
    options: {
      navigation: {},
    },
  };
};
