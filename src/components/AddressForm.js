import React, { useState } from "react";
import { useAddresses } from "../AddressProvider"; // Import custom hook to access the context

const AddressForm = ({ location }) => {
  const { addAddress } = useAddresses(); // Use context to get addAddress function
  const [address, setAddress] = useState({
    flat: "",
    area: "",
    category: "Home",
  });

  const saveAddress = () => {
    if (address.flat && address.area) {
      // Use the context's addAddress function to save the address
      addAddress({ ...address, location });
      alert("Address saved successfully!");
      // Reset the form fields after saving
      setAddress({
        flat: "",
        area: "",
        category: "Home",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h2>Delivery Address</h2>
      <input
        type="text"
        placeholder="House/Flat/Block No."
        value={address.flat}
        onChange={(e) => setAddress({ ...address, flat: e.target.value })}
        style={{
          padding: "10px 20px",
          border: "1px solid black",
          background: "white",
          borderRadius: "5px",
          width: "30%"
        }}
      />
      <input
        type="text"
        placeholder="Apartment/Road/Area"
        value={address.area}
        onChange={(e) => setAddress({ ...address, area: e.target.value })}
        style={{
          padding: "10px 20px",
          border: "1px solid black",
          background: "white",
          borderRadius: "5px",
          width: "30%"
        }}
      />
      <select
        value={address.category}
        onChange={(e) => setAddress({ ...address, category: e.target.value })}
        style={{
          padding: "10px 20px",
          border: "1px solid black",
          background: "white",
          borderRadius: "5px",
          width: "32.4%"
        }}
      >
        <option value="Home">Home</option>
        <option value="Office">Office</option>
        <option value="Friends & Family">Friends & Family</option>
      </select>
      <button onClick={saveAddress}
        style={{
          margin: "20px",
          padding: "10px 20px",
          textDecoration: "none",
          color: "black",
          border: "1px solid black",
          borderRadius: "5px",
          cursor: "pointer",
          background: "white",
          fontSize: "16px",
        }}>Save Address</button>
    </div>
  );
};

export default AddressForm;
