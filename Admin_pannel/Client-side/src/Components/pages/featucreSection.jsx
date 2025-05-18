import React from "react";
import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import "./featcure.css";

const FeatucreSection = () => {
  return (
    <section className="feature-section">
      <div className="feature-container">
        {/* feature 1 */}
        <div className="feature-item">
          <div className="feature-icon">
            <HiShoppingBag className="icon" />
          </div>
          <h4 className="feature-title">Free International Shipping</h4>
          <p className="feature-description">On all orders over $100.00</p>
        </div>

        {/* feature 2 */}
        <div className="feature-item">
          <div className="feature-icon">
            <HiArrowPathRoundedSquare className="icon" />
          </div>
          <h4 className="feature-title">45 Days Return</h4>
          <p className="feature-description">Money back guarantee</p>
        </div>

        {/* feature 3 */}
        <div className="feature-item">
          <div className="feature-icon">
            <HiOutlineCreditCard className="icon" />
          </div>
          <h4 className="feature-title">Secure Checkout</h4>
          <p className="feature-description">100% safe & encrypted</p>
        </div>
      </div>
    </section>
  );
};

export default FeatucreSection;
