import React, { createContext, useState, useContext } from "react";

// Create the context
const AddressesContext = createContext();

// Create a provider component
export const AddressesProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);

  const addAddress = (newAddress) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };

  const deleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  return (
    <AddressesContext.Provider value={{ addresses, addAddress, deleteAddress }}>
      {children}
    </AddressesContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAddresses = () => {
  return useContext(AddressesContext);
};
