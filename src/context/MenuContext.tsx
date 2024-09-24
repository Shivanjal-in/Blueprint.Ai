"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface MenuContextProps {
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
  currentPage: string;
  setCurrentPage: (value: string) => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <MenuContext.Provider value={{ showMobileMenu, setShowMobileMenu, currentPage, setCurrentPage }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
