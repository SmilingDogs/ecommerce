#!/usr/bin/env node
/**
 * Sync Sanity products to Stripe
 * Creates Stripe products and updates Sanity with Price IDs
 *
 * Usage: node scripts/sync-products-to-stripe.js
 */

import dotenv from 'dotenv';
import path from 'path';
import Stripe from 'stripe';
import { fileURLToPath } from 'url';
import { client } from '../sanity_ecommerce/lib/client.js';

// Load .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function fetchSanityProducts() {
  try {
    const products = await client.fetch('*[_type == "product"]');
    return products;
  } catch (error) {
    console.error('Error fetching Sanity products:', error);
    throw error;
  }
}

async function createStripeProduct(product) {
  try {
    console.log(`Creating Stripe product: ${product.name}`);

    // Create product in Stripe
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.details || '',
      metadata: {
        sanityId: product._id,
      },
    });

    // Create price for the product
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(product.price * 100), // Convert to cents
      currency: 'usd',
    });

    console.log(`✓ Created: ${product.name} (Price ID: ${stripePrice.id})`);

    return stripePrice.id;
  } catch (error) {
    console.error(`Error creating Stripe product for ${product.name}:`, error);
    throw error;
  }
}

async function updateSanityProduct(productId, stripeId) {
  try {
    await client.patch(productId).set({ stripeId }).commit();

    console.log(
      `✓ Updated Sanity product ${productId} with stripeId: ${stripeId}`
    );
  } catch (error) {
    console.error(`Error updating Sanity product ${productId}:`, error);
    throw error;
  }
}

async function syncProductsToStripe() {
  console.log('Starting product sync from Sanity to Stripe...\n');

  try {
    // Fetch all products from Sanity
    const sanityProducts = await fetchSanityProducts();

    if (sanityProducts.length === 0) {
      console.log('No products found in Sanity');
      return;
    }

    console.log(`Found ${sanityProducts.length} products in Sanity\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const product of sanityProducts) {
      try {
        // Check if product already has a Stripe ID
        if (product.stripeId) {
          console.log(`⊘ Skipping ${product.name} (already has stripeId)`);
          continue;
        }

        // Create in Stripe and get Price ID
        const stripePriceId = await createStripeProduct(product);

        // Update Sanity with the Price ID
        await updateSanityProduct(product._id, stripePriceId);

        successCount++;
      } catch (error) {
        errorCount++;
        console.error(`Failed to sync ${product.name}\n`);
      }
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`Sync completed!`);
    console.log(`✓ Success: ${successCount}`);
    console.log(`✗ Errors: ${errorCount}`);
    console.log(`${'='.repeat(50)}`);
  } catch (error) {
    console.error('Fatal error during sync:', error);
    process.exit(1);
  }
}

// Run the sync
syncProductsToStripe();
