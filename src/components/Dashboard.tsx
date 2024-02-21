import { Button } from "@mui/material";
import FormInput from "./FormInput";
import { useEffect, useState } from "react";

function DashBoard() {
  const [price, setPrice] = useState<any>(null);
  const [infoOrders, setInfoOrders] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8080/api/price/getlast");
      const data = await response.json();

      setPrice(data.price);
    })();
    (async () => {
      const response = await fetch(
        "http://localhost:8080/api/order/getinfoorders"
      );
      const data = await response.json();

      setInfoOrders(data);
      console.log(data);
    })();
  }, []);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/api/price/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: price,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex gap-6">
        <FormInput
          type="text"
          labelText="Aktualny koszt za kg"
          name="amount"
          defaultValue={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={handleSubmit}
        >
          Zapisz
        </button>
      </div>
      {infoOrders && (
        <div>
          <h2>Zamówienia na dzień:</h2>
          <ul className="flex gap-6">
            {Object.keys(infoOrders)
              .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
              .map((date, index) => (
                <li key={index}>
                  <strong>{date}</strong>
                  <ul>
                    {Object.entries(infoOrders[date]).map(([key]) => (
                      <li key={key}>
                        {key}: {infoOrders[date][key]}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default DashBoard;
