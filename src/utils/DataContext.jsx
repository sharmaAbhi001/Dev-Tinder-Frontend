import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const storedData = JSON.parse(sessionStorage.getItem("appData")) || [];
    const [data, setData] = useState(storedData);
    useEffect(() => {
        sessionStorage.setItem("appData", JSON.stringify(data));
    }, [data]);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
