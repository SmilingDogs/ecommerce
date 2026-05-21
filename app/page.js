import { FooterBanner, HeroBanner, Product } from '../components';
import { client } from '../sanity_ecommerce/lib/client';

const productsQuery = '*[_type == "product"]';
const bannerQuery = '*[_type == "banner"]';

export default async function Home() {
  const [products, bannerData] = await Promise.all([
    client.fetch(productsQuery),
    client.fetch(bannerQuery),
  ]);

  return (
    <>
      <HeroBanner heroBanner={bannerData?.[0]} />
      <div className="products-heading">
        <h2>Best Selling products</h2>
        <p>Speakers of different variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner heroBanner={bannerData?.[0]} />
    </>
  );
}
