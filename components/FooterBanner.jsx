import Image from 'next/image';
import Link from 'next/link';

import { urlFor } from '@/sanity_ecommerce/lib/image';

const FooterBanner = ({ heroBanner }) => {
  if (!heroBanner) return null;

  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    desc,
    buttonText,
    image,
    product,
  } = heroBanner;

  const imageUrl = image ? urlFor(image).url() : '';
  const href = product ? `/product/${product}` : '/';

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>

        <div className="right">
          <p>{smallText}</p>
          <h3>{product}</h3>
          <p className="company-desc">{desc}</p>
          <Link href={href}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product || 'Footer banner'}
            width={350}
            height={350}
            className="footer-banner-image"
          />
        ) : null}
      </div>
    </div>
  );
};

export default FooterBanner;
