'use client';
import { useStateContext } from '@/context/StateContext';
import { handleCheckout } from '@/lib/handleCheckout';
import { urlFor } from '@/sanity_ecommerce/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from 'react-icons/ai';
import { MdOutlineInfo } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <Image
                  src={urlFor(item?.image[0]).url()}
                  className="cart-product-image"
                  alt="cart-product-image"
                  width={150}
                  height={150}
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <button
                          type="button"
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, 'dec')
                          }
                        >
                          <AiOutlineMinus />
                        </button>
                        <span className="num">{item.quantity}</span>
                        <button
                          type="button"
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, 'inc')
                          }
                        >
                          <AiOutlinePlus />
                        </button>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={(e) => handleCheckout(e, cartItems)}
              >
                Pay with Stripe
              </button>
            </div>
            <div className="payment-info">
              <MdOutlineInfo size={20} />
              <p>Use card 4242 4242 4242 4242 for payment imitation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
