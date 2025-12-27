import React, { useState } from "react";
import "../styles/OptionModal.css";

const OptionModal = ({ type, onClose, onConfirm }) => {
  const [color, setColor] = useState("");

  return (
    <div className="option-backdrop" onClick={onClose}>
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
          onClick={() => onConfirm(color)}
        >
          {type === "cart" ? "ADD TO CART" : "BUY NOW"}
        </button>
      </div>
    </div>
  );
};

export default OptionModal;
