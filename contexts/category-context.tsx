"use client"

import { createContext, useContext, useState } from "react";

const CategoryContext = createContext({
    selectedCategory: null,
    setSelectedCategory: (category: string | null) => {},
});

export const CategoryProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");


    return (
        <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);
