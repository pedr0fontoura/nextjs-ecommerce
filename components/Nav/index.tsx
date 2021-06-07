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
        <button onClick={checkout}>
          <FaShoppingCart /> R${subtotal}
        </button>
      </p>
    </nav>
  );
};

export default Nav;
