import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({ });

  useEffect(() => {
    if (!currency) return; 

    const lowerCaseCurrency = currency.toLowerCase(); // Ensure lowercase

    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${lowerCaseCurrency}.json`)
      .then((res) => res.json())
      .then((res) => {
        if (res[lowerCaseCurrency]) {
          setData(res[lowerCaseCurrency]);
        } else {
          console.error("Invalid currency data received:", res);
          setData({});
        }
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
        setData({});
      });

  }, [currency]);

  return data;
}

export default useCurrencyInfo;
