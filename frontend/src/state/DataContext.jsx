import React, {
  createContext,
  useCallback,
  useContext,
  useState
} from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchItems = useCallback(
    async ({
      page = 1,
      limit = 20,
      q = "",
      signal
    } = {}) => {
      const params = new URLSearchParams({
        page,
        limit,
        q
      });

      const res = await fetch(
        `/api/items?${params}`,
        { signal }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch items");
      }

      const json = await res.json();

      console.log("API Response:", json);

      setItems(json.items);
      console.log("Items:", json.items);
      setTotal(json.total);

      return json;
    },
    []
  );

  return (
    <DataContext.Provider
      value={{
        items,
        total,
        fetchItems
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);