import { useEffect, useState } from "react";
import Table from "./Table";

const columns = [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "firstName",
    label: "Imię",
  },
  {
    name: "lastName",
    label: "Nazwisko",
  },
  {
    name: "emailAddress",
    label: "Email",
  },
  {
    name: "phoneNumber",
    label: "Telefon",
  },
];

function ClientTableController() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch("http://localhost:8080/api/customer")
      ).json();
      console.log(data);
      setData(data);
    };
    dataFetch();
  }, []);

  return <Table columns={columns} data={data} />;
}

export default ClientTableController;
