import { notFound } from 'next/navigation';

import { ProductDetails } from '@/components';
import { client } from '@/sanity_ecommerce/lib/client';

const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0]`;
const allProductsQuery = `*[_type == "product"]`;
const productSlugsQuery = `*[_type == "product" && defined(slug.current)]{
  "slug": slug.current
}`;

export async function generateStaticParams() {
  const slugs = await client.fetch(productSlugsQuery);

  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await client.fetch(productBySlugQuery, { slug });

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.details || `${product.name} product details page.`,
  };
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const [product, products] = await Promise.all([
    client.fetch(productBySlugQuery, { slug }),
    client.fetch(allProductsQuery),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    (item) => item._id !== product._id && item.slug?.current !== slug
  );

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
