import React from "react";
import { useAddresses } from "../AddressProvider.js"; // Import custom hook

const ManageAddress = () => {
  const { addresses, deleteAddress } = useAddresses(); // Access context values

  console.log(addresses)
  // Fallback if addresses is undefined or null
  if (!addresses) {
    addresses = [];
  }

  return (
    <div style={{padding:"0px 20px"}}>
      <h2 >Manage Addresses</h2>
      {addresses.length === 0 ? (
        <p>No addresses saved yet.</p>
      ) : (
        <ul>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "18px" }}>
  <thead>
    <tr style={{ borderBottom: "2px solid black" }}>
      <th style={{ padding: "10px", textAlign: "left" }}>#</th>
      <th style={{ padding: "10px", textAlign: "left" }}>Category</th>
      <th style={{ padding: "10px", textAlign: "left" }}>Address</th>
      <th style={{ padding: "10px", textAlign: "left" }}>Location</th>
      <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {addresses.map((address, index) => (
      <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
        <td style={{ padding: "10px" }}>{index + 1}</td>
        <td style={{ padding: "10px" }}>{address.category}</td>
        <td style={{ padding: "10px" }}>{address.flat}</td>
        <td style={{ padding: "10px" }}>{address.area}</td>
        <td style={{ padding: "10px" }}>
          <button
            style={{
              margin: "0",
              padding: "5px 10px",
              textDecoration: "none",
              color: "black",
              border: "1px solid black",
              borderRadius: "5px",
              cursor: "pointer",
              background: "white",
              fontSize: "16px",
            }}
            onClick={() => deleteAddress(index)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </ul>
      )}
    </div>
  );
};

export default ManageAddress;
