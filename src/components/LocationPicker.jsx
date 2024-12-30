import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useAddresses } from "../AddressProvider";


const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 19.0178,
  lng: 72.8478, // Default location (San Francisco)
};

const LocationPicker = () => {
  const { addAddress } = useAddresses();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AlzaSydmdExZoKQLJD5jRBWy0TgrMKl8MP3ke4M", // Replace with your API Key
  });

  const [selectedLocation, setSelectedLocation] = useState(center);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    fetchAddressFromLatLng(lat, lng);
  };


  const fetchAddressFromLatLng = async (lat, lng) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${lng}&key=AlzaSydmdExZoKQLJD5jRBWy0TgrMKl8MP3ke4M`
      );
      const data = await response.json();
      console.log("Geocoding API Response:", data); // Log response for debugging

      if (data.status === "OK" && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress("Unable to fetch address");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (address) {
      const newAddress = { category: "Home", flat: address, area: `${selectedLocation.lat}, ${selectedLocation.lng}` };
      addAddress(newAddress); // Save the address in context
      alert("Address saved successfully!");
      setAddress("");
    } else {
      alert("No address to save.");
    }
  };


  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        center={selectedLocation}
        zoom={12}
        mapContainerStyle={containerStyle}
        onClick={handleMapClick}
      >
        <Marker position={selectedLocation} draggable />
      </GoogleMap>
      <div style={{ marginTop: "20px", display: 'flex', flexDirection: "column", alignItems: "center" }}>
        {isLoading ? (
          <p>Fetching address...</p>
        ) : (
          <p>
            <strong>Selected Address:</strong> {address || "Click on the map to select a location"}
          </p>
        )}
        <button onClick={handleSave}
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
        >
          Save Address
        </button>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          OR
        </p>
      </div>
    </div>
  );
};

export default LocationPicker;
