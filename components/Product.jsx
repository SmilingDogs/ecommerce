import Image from 'next/image';
import Link from 'next/link';

import { urlFor } from '@/sanity_ecommerce/lib/image';

const Product = ({ product }) => {
  const { image, name, slug, price } = product;
  const imageUrl = image?.[0] ? urlFor(image[0]).url() : '';
  const href = slug?.current ? `/product/${slug.current}` : '/';

  return (
    <Link href={href}>
      <div className="product-card">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name || 'Product image'}
            width={250}
            height={250}
            className="product-image"
          />
        ) : null}
        <p className="product-name">{name}</p>
        <p className="product-price">${price}</p>
      </div>
    </Link>
  );
};

export default Product;
