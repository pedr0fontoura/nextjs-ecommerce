import { useState } from "react";

import { initiateCheckout } from "../lib/payments";

import products from "../products.json";

interface IProduct {
  id: string;
  quantity: number;
}

interface ICart {
  products: IProduct[];
}

const defaultCart = {
  products: [],
};

export default function useCart() {
  const [cart, setCart] = useState<ICart>(defaultCart);

  const cartItems = cart.products.map((cartProduct) => {
    const product = products.find(({ id }) => id === cartProduct.id);

    return {
      ...cartProduct,
      pricePerItem: product?.price,
    };
  });

  const subtotal = cartItems.reduce(
    (accumulator, { pricePerItem = 0, quantity }) => {
      return accumulator + pricePerItem * quantity;
    },
    0
  );

  const totalItems = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  function addToCart({ id }: { id: string }): void {
    setCart((previous) => {
      let cartState = { ...previous };

      const productIndex = cartState.products.findIndex(
        (product) => product.id === id
      );

      if (productIndex !== -1) {
        cartState.products[productIndex].quantity += 1;
      } else {
        cartState.products.push({
          id,
          quantity: 1,
        });
      }

      return cartState;
    });
  }

  function checkout(): void {
    initiateCheckout({
      lineItems: cartItems.map((item) => ({
        price: item.id,
        quantity: item.quantity,
      })),
    });
  }

  return {
    cart,
    setCart,
    subtotal,
    totalItems,
    addToCart,
    checkout,
  };
}
