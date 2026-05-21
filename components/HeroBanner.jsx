import { urlFor } from '@/sanity_ecommerce/lib/image';
import Image from 'next/image';
import Link from 'next/link';

const HeroBanner = ({ heroBanner }) => {
  const { smallText, midText, largeText1, buttonText, desc, image, product } =
    heroBanner;
  const imageUrl = image ? urlFor(image).url() : null;

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        {imageUrl ? (
          <div className="hero-banner-image-wrapper">
            <Image
              src={imageUrl}
              alt="headphones"
              fill
              loading="eager"
              sizes="(max-width: 800px) 77vw, 450px"
              style={{ objectFit: 'contain' }}
            />
          </div>
        ) : null}
        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
