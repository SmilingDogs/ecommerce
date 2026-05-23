'use client';

import { useStateContext } from '@/context/StateContext';
import { useState } from 'react';

import Image from 'next/image';
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from 'react-icons/ai';

import { Product } from '@/components';
import { urlFor } from '@/sanity_ecommerce/lib/image';

const ProductDetails = ({ product, relatedProducts }) => {
  const { image = [], name, details, price } = product;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { qty, onAdd, incQty, decQty } = useStateContext();

  const selectedImage = image[selectedImageIndex] || image[0];
  const selectedImageUrl = selectedImage ? urlFor(selectedImage).url() : '';

  const handleAddToCart = () => {
    onAdd(product, qty);
  };

  const handleBuyNow = () => {
    onAdd(product, qty);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {selectedImageUrl ? (
              <Image
                src={selectedImageUrl}
                alt={name || 'Product image'}
                width={400}
                height={400}
                loading="eager"
                className="product-detail-image"
              />
            ) : null}
          </div>

          {image.length ? (
            <div className="small-images-container">
              {image.map((item, index) => {
                const imageUrl = urlFor(item).url();
                const isSelected = index === selectedImageIndex;

                return (
                  <button
                    key={`${product._id}-${index}`}
                    type="button"
                    className={
                      isSelected ? 'small-image selected-image' : 'small-image'
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    onMouseEnter={() => setSelectedImageIndex(index)}
                    aria-label={`Show image ${index + 1} for ${name}`}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${name || 'Product'} preview ${index + 1}`}
                      width={70}
                      height={70}
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <div className="quantity-desc">
              <button
                type="button"
                className="minus"
                onClick={decQty}
                aria-label="Decrease quantity"
              >
                <AiOutlineMinus />
              </button>
              <span className="num">{qty}</span>
              <button
                type="button"
                className="plus"
                onClick={incQty}
                aria-label="Increase quantity"
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length ? (
        <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {relatedProducts.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
