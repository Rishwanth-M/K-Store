import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const BuyNowButton = ({ product, qty }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");

  const handleBuyNow = async () => {
    if (!color) return;

    await addDoc(collection(db, "users", "guest", "orders"), {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.mainImg,
      color,
      qty,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    alert("Order placed");
    setOpen(false);
    setColor("");
  };

  return (
    <>
      <button className="buy-now-btn" onClick={() => setOpen(true)}>
        BUY NOW
      </button>

      {open && (
        <div className="option-backdrop" onClick={() => setOpen(false)}>
          <div className="option-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Select Socks</h3>

            <div className="option-list">
              <button
                className={color === "Black" ? "active" : ""}
                onClick={() => setColor("Black")}
              >
                Black Socks
              </button>

              <button
                className={color === "White" ? "active" : ""}
                onClick={() => setColor("White")}
              >
                White Socks
              </button>
            </div>

            <button
              className="confirm-btn"
              disabled={!color}
              onClick={handleBuyNow}
            >
              BUY NOW
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyNowButton;
