import React from "react";

const LocationModal = ({ onClose, onLocationSelected }) => {
  const requestLocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        onLocationSelected(location);
      },
      (error) => {
        alert("Location permission denied.");
      }
    );
  };

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "20px" }}>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>Enable Location</h2>
        <button style={{ margin: "20px", padding:"10px 20px", textDecoration:"none", color:"black", border:"1px solid black", borderRadius:"5px", cursor:"pointer",background:"white", fontSize:"16px" }}  onClick={requestLocationPermission}>Enable Location</button>
        <button style={{ margin: "20px", padding:"10px 20px", textDecoration:"none", color:"black", border:"1px solid black", borderRadius:"5px", cursor:"pointer",background:"white", fontSize:"16px" }}  onClick={() => onLocationSelected("manual")}>Search Manually</button>
        <button style={{ margin: "20px", padding:"10px 20px", textDecoration:"none", color:"black", border:"1px solid black", borderRadius:"5px", cursor:"pointer",background:"white", fontSize:"16px" }}  onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LocationModal;
