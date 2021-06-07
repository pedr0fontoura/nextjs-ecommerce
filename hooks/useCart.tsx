import React, { useState, createContext, useContext, useEffect } from "react";

import { initiateCheckout } from "../lib/payments";

import products from "../products.json";

interface IProduct {
  id: string;
  quantity: number;
}

interface ICart {
  products: IProduct[];
}

interface IAddToCart {
  id: string;
}

interface IRemoveFromCart {
  id: string;
}

interface IUpdateQuantity {
  id: string;
  quantity: number;
}

interface ICartProvider {
  children: React.ReactNode;
}

interface ICartItem {
  id: string;
  quantity: number;
  pricePerItem: number;
}

interface ICartContext {
  cartItems: ICartItem[];
  subtotal: number;
  totalItems: number;
  addToCart(args: IAddToCart): void;
  removeFromCart(args: IRemoveFromCart): void;
  updateQuantity(args: IUpdateQuantity): void;
  checkout(): void;
}

const LOCAL_STORAGE_CART_ITEM_KEY = "@spacejellystore:cart";

const defaultCart = {
  products: [],
};

const CartContext = createContext<ICartContext>({} as ICartContext);

const CartProvider = ({ children }: ICartProvider) => {
  const [cart, setCart] = useState<ICart>(defaultCart);

  useEffect(() => {
    const cachedCart = window.localStorage.getItem(LOCAL_STORAGE_CART_ITEM_KEY);

    const parsedCart = cachedCart ? JSON.parse(cachedCart) : undefined;

    setCart(parsedCart ? parsedCart : defaultCart);
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);

    window.localStorage.setItem(LOCAL_STORAGE_CART_ITEM_KEY, data);
  }, [cart]);

  const cartItems = cart.products.map((cartProduct) => {
    const product = products.find(({ id }) => id === cartProduct.id);

    return {
      ...cartProduct,
      pricePerItem: product?.price ? product.price : 0,
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

  const addToCart = ({ id }: IAddToCart): void => {
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
  };

  const removeFromCart = ({ id }: IRemoveFromCart): void => {
    setCart((previous) => {
      let cartState = { ...previous };

      const filteredProducts = cartState.products.filter(
        (product) => product.id !== id
      );

      cartState.products = filteredProducts;

      return cartState;
    });
  };

  const updateQuantity = ({ id, quantity }: IUpdateQuantity): void => {
    if (quantity <= 0) {
      removeFromCart({ id });
      return;
    }

    setCart((previous) => {
      let cartState = { ...previous };

      const productIndex = cartState.products.findIndex(
        (product) => product.id === id
      );

      if (productIndex !== -1) {
        cartState.products[productIndex].quantity = quantity;
      }

      return cartState;
    });
  };

  const checkout = (): void => {
    initiateCheckout({
      lineItems: cartItems.map((item) => ({
        price: item.id,
        quantity: item.quantity,
      })),
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        subtotal,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useContext must be used within an CartProvider");
  }

  return context;
};

export { CartProvider, useCart };
