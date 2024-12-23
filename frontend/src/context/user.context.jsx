import React, { createContext, useState, useContext } from 'react';

// Create a context for the user
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
     const [user, setUser] = useState(null);

     // const login = (userData) => {
     //      setUser(userData);
     // };

     // const logout = () => {
     //      setUser(null);
     // };

     return (
          <UserContext.Provider value={{ user, setUser }}>
               {children}
          </UserContext.Provider>
     );
};

// Create a custom hook to use the UserContext
