import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import logo from "../../../src/assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { Container, Row } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cartActions } from "../../redux/slices/cartSlice";
import "./Header.css";

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [LogoutVisible, setLogoutVisible] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    {
      path: "home",
      display: "Home",
    },
    {
      path: "shop",
      display: "Shop",
    },
    {
      path: "cart",
      display: "Cart",
    },
    
  ];

  const dispatch = useDispatch();
  const menuRef = useRef();
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef();

  const handleScroll = () => {
    if (window.scrollY > 80) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(cartActions.clearCart());
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const profileActionRef = useRef(null);

  const toggleProfileActions = () => {
    setLogoutVisible(!LogoutVisible);

    const profileActions = profileActionRef.current;

    profileActions.classList.remove("profile__actions");

    profileActions.classList.add("show__profileActions");
    profileActions.style.display =
      profileActions.style.display === "flex" ? "none" : "flex";
  };

  return (
    <header
      className={`header ${isSticky ? "sticky__header" : ""}`}
      ref={headerRef}
    >
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="log-img" />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {navLinks.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-cart-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt="user-img"
                  onClick={toggleProfileActions}
                />

                <div
                  className={`profile__actions ${
                    LogoutVisible ? "show__profileActions" : ""
                  }`}
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                     <div onClick={navigateToLogin}>
                     <Link  to="/dashboard">
                        Dashboard
                      </Link>
                      </div> 
                    </div>
                  )}
                </div>
              </div>
              <span className="mobile__menu" onClick={menuToggle}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
