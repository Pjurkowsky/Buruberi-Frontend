import { Outlet, Route, Routes } from "react-router-dom";
import ClientTableController from "./ClientTableController";
import SideBar from "./SideBar";

const columnsCustomer = [
  { name: "firstName", label: "Imię" },
  { name: "lastName", label: "Nazwisko" },
  { name: "emailAddress", label: "Email" },
  { name: "phoneNumber", label: "Telefon" },
];

const columnsOrder = [
  { name: "firstName", label: "Imię" },
  { name: "lastName", label: "Nazwisko" },
  { name: "emailAddress", label: "Email" },
  { name: "phoneNumber", label: "Telefon" },
  { name: "amount", label: "Ilość" },
  { name: "address", label: "Adres" },
  { name: "city", label: "City" },
  {
    name: "createdDate",
    label: "Data utworzenia",
    format: (createdDate: string) => {
      const formattedDate = new Date(parseInt(createdDate)); // Convert Unix timestamp to milliseconds
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      return formattedDate.toLocaleDateString("pl-PL", options);
    },
  },
  {
    name: "deliveryDate",
    label: "Zamówienie na",
    format: (deliveryDate: [number, number, number]) => {
      if (!deliveryDate) return deliveryDate;
      const [year, month, day] = deliveryDate;
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
        "pl-PL",
        options
      );
      return formattedDate;
    },
  },
  { name: "description", label: "Opis" },
];

function AdminPanel() {
  return (
    <>
      <SideBar />
      <Routes>
        <Route
          path="order"
          element={
            <ClientTableController
              url={new URL("http://localhost:8080/api/order")}
              columns={columnsOrder}
            />
          }
        />
        <Route
          path="customer"
          element={
            <ClientTableController
              url={new URL("http://localhost:8080/api/customer")}
              columns={columnsCustomer}
            />
          }
        />
      </Routes>
    </>
  );
}

export default AdminPanel;
