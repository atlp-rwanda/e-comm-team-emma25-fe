import React from "react";
import Navbar from "../components/Navbar";

function Cart() {
  return (
    <div>
      <Navbar iconNumber={3} />
      <p>cart</p>
    </div>
  );
}
// add checkout payment using stripe
export default Cart;
