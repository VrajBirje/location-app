import React from "react";

const AddressList = ({ addresses, onSelect, onDelete }) => {
  return (
    <div>
      <h2>Saved Addresses</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {addresses.map((address, index) => (
          <li
            key={index}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p><strong>{address.label}</strong></p>
              <p>{address.details}</p>
            </div>
            <div>
              <button
                onClick={() => onSelect(address)}
                style={{
                  padding: "5px 10px",
                  marginRight: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Select
              </button>
              <button
                onClick={() => onDelete(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
