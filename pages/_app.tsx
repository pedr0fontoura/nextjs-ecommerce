import { AppProps } from "next/app";

import "../styles/globals.css";

import { CartProvider } from "../hooks/useCart";

import Nav from "../components/Nav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Nav />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
