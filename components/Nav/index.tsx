import { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

import { useCart } from "../../hooks/useCart";

import styles from "./Nav.module.css";

const Nav = () => {
  const [origin, setOrigin] = useState("#");

  const { subtotal, checkout } = useCart();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <nav className={styles.nav}>
      <Link href={origin}>
        <a className={styles.navTitle}>Space Jelly Shop</a>
      </Link>
      <p className={styles.navCart}>
        <Link href="/cart">
          <a>
            <FaShoppingCart /> R${subtotal}
          </a>
        </Link>
      </p>
    </nav>
  );
};

export default Nav;
