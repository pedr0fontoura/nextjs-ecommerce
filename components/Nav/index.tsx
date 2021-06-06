import { FaShoppingCart } from "react-icons/fa";

import { useCart } from "../../hooks/useCart";

import styles from "./Nav.module.css";

const Nav = () => {
  const { subtotal, checkout } = useCart();

  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>Space Jelly Shop</p>
      <p className={styles.navCart}>
        <button onClick={checkout}>
          <FaShoppingCart /> R${subtotal}
        </button>
      </p>
    </nav>
  );
};

export default Nav;
