'use client'

/**
 * This configuration powers the Sanity Studio mounted at `/app/ecommerce/[[...tool]]/page.jsx`.
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId } from './sanity_ecommerce/env';
import { schema } from './sanity_ecommerce/schemaTypes';
import { structure } from './sanity_ecommerce/structure';

export default defineConfig({
  basePath: '/ecommerce',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity_ecommerce/schemaTypes' folder.
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
