

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";


import axios from "axios";
import { REST_API_BASE_URL } from "./../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Store } from "../../../store";



function CartItems() {
    const [cartItems, setCartItems] = useState([]);

    const { state } = useContext(Store);
    const { userInfo } = state;
  
    useEffect(() => {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(`${REST_API_BASE_URL}/student/cart/${userInfo.id}`);
          setCartItems(response.data);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
  
      fetchCartItems();
    }, []);
    const handleDelete = async (cartItemId) => {
      try {
        const response = await axios.delete(
          `${REST_API_BASE_URL}/student/cart/delete/${cartItemId}`
        );
        if (response.status === 200) {
          // Call onDelete to update UI or perform any necessary action
          // onDelete(cartItemId);
          console.log(`Cart item with ID ${cartItemId} deleted successfully.`);
        }
      } catch (error) {
        console.error("Error deleting cart item:", error.message);
      }
    };
  
    // Function to calculate the total sum of prices
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      cartItems.forEach((cartItem) => {
        totalPrice += cartItem.course.price;
      });
      return totalPrice;
    };
  
    return (
      <>
        <div className="dropdown">
          <button
            className="btn  dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faShoppingCart} size="lg"/>
            <span className="badge ">{cartItems.length}</span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1"  style={{ maxHeight: "400px", overflowY: "auto" }}>
            {cartItems.map((cartItem, index) => (
              <li
                key={cartItem.id}
                className="dropdown-item d-flex justify-content-between align-items-center"
              >
                <div style={{ fontFamily: `${cartItem.course.fontFamily}` }}>
                  <span class="fw-bold">{cartItem.course.title}</span>
                  <br />
                  Price: ${cartItem.course.price}
                  <br />
                  By: {""}
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(cartItem.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
            {cartItems.length !== 0 ? (
              <>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li> Total Price: ${calculateTotalPrice()}</li>
                <Link to="#">
                  <button className=" btn btn-primary"> Go to The Cart </button>
                </Link>
              </>
            ) : (
              <li> Not Found Item in Cart</li>
            )}
          </ul>
        </div>
      </>
    );
  }

  export default CartItems