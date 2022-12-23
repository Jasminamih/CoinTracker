import React, { createContext, useEffect, useState } from "react";
import categories from "../data/data";
import { Category } from "../interfaces/CategoryInterface";

interface CategoryContextProps {
  category: Category[];
  enabled: Category[];
  setCategory: (prevState: any) => void;
  setEnabled: (prevState: any) => void;
}
export const CategoryContext = createContext<CategoryContextProps>({
  category: [],
  enabled: [],
  setCategory: () => {},
  setEnabled: () => {},
});

export const CategoryConstructor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [category, setCategory] = useState<Category[]>(() => {
    if (localStorage.getItem("category")) {
      return JSON.parse(localStorage.getItem("category")!);
    }
    return [];
  });

  const [enabled, setEnabled] = useState<Category[]>(() => {
    if (localStorage.getItem("enabled")) {
      return JSON.parse(localStorage.getItem("enabled")!);
    }
    return [];
  });

  useEffect(() => {
    if (!localStorage.getItem("category")) {
      setCategory(categories);
      setEnabled([]);
      localStorage.setItem("category", JSON.stringify(categories));
      localStorage.setItem("enabled", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(category));
  }, [category]);

  useEffect(() => {
    localStorage.setItem("enabled", JSON.stringify(enabled));
  }, [enabled]);

  return (
    <CategoryContext.Provider
      value={{ category, setCategory, enabled, setEnabled }}
    >
      {" "}
      {children}
    </CategoryContext.Provider>
  );
};
