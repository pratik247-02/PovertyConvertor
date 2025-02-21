import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    const fetchCurrencyData = async () => {
        try {
            let response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`);
            let result = await response.json();
            setData(result[currency]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchCurrencyData();
    }, [currency]); // Runs when currency changes

    return data;
}

export default useCurrencyInfo;