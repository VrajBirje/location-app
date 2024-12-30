import React, { useState } from "react";
import LocationModal from "../components/LocationModal";
import LocationPicker from "../components/LocationPicker";
import AddressForm from "../components/AddressForm";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [manualSearch, setManualSearch] = useState(false); // New state to track manual search

  return (
    <div style={{ padding: "5px 10px" }}>
      <h1>Delivery Location Picker</h1>
      {isModalOpen && (
        <LocationModal
          onClose={() => setModalOpen(false)}
          onLocationSelected={(location) => {
            if (location === "manual") {
              setManualSearch(true); // Set manual search flag
              setModalOpen(false);
            } else {
              setSelectedLocation(location);
              setModalOpen(false);
              setManualSearch(false); // Reset manual search flag
            }
          }}
        />
      )}
      {!manualSearch && !selectedLocation && (
        <button
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
          }}
          onClick={() => setModalOpen(true)}
        >
          Select Location
        </button>
      )}
      {selectedLocation && !manualSearch && (
        <LocationPicker
          location={selectedLocation}
          onLocationChange={(location) => setSelectedLocation(location)}
        />
      )}
      {(selectedLocation || manualSearch) && <AddressForm location={selectedLocation} />}
    </div>
  );
};

export default Home;
