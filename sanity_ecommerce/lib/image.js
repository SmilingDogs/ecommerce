import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};
