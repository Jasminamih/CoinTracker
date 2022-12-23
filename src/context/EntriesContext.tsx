import React, { createContext, useEffect, useState } from "react";
import { Entries } from "../interfaces/EntriesInterface";

interface EntriesContextProps {
  entries: Entries[];
  setEntries: (prevState: any) => void;
}
export const EntriesContext = createContext<EntriesContextProps>({
  entries: [],
  setEntries: () => {},
});

export const EntriesConstructor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [entries, setEntries] = useState<Entries[]>(() => {
    if (localStorage.getItem("entries")) {
      return JSON.parse(localStorage.getItem("entries")!);
    }
    return [];
  });

  useEffect(() => {
    if (!localStorage.getItem("entries")) {
      setEntries([]);
      localStorage.setItem("entries", JSON.stringify(entries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  return (
    <EntriesContext.Provider value={{ entries, setEntries }}>
      {" "}
      {children}
    </EntriesContext.Provider>
  );
};
