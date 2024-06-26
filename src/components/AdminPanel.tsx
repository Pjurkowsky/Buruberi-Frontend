import { Link, Route, Routes } from "react-router-dom";
import ClientTableController from "./ClientTableController";
import SideBar from "./SideBar";
import DashBoard from "./Dashboard";

type DateArray = [number, number, number, number, number, number, number];

const columnsDriver = [
  { field: "firstName", headerName: "Imię" },
  { field: "lastName", headerName: "Nazwisko" },
  { field: "phoneNumber", headerName: "Telefon", minWidth: 130 },
  { field: "orderCount", headerName: "Ilość zamówień", minWidth: 130 },
  {
    field: "orders",
    headerName: "Zamówienia",
    minWidth: 130,
    renderCell: (params: any) => {
      return (
        <button
          type="submit"
          className="text-white ml-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Chuj
        </button>
      );
    },
  },
];

const columnsCustomer = [
  { field: "firstName", headerName: "Imię" },
  { field: "lastName", headerName: "Nazwisko" },
  { field: "emailAddress", headerName: "Email", minWidth: 100 },
  { field: "phoneNumber", headerName: "Telefon", minWidth: 130 },
];

const columnsOrder = [
  { field: "customer_firstName", headerName: "Imię" },
  { field: "customer_lastName", headerName: "Nazwisko" },
  {
    field: "customer_emailAddress",
    headerName: "Email",
    resizeable: true,
    minWidth: 100,
  },
  {
    field: "customer_phoneNumber",
    headerName: "Telefon",
    resizeable: true,
    minWidth: 130,
  },
  { field: "amount", headerName: "Ilość", width: 40 },
  { field: "address", headerName: "Adres" },
  { field: "city", headerName: "Miasto" },
  {
    field: "createdDate",
    headerName: "Data utworzenia",
    width: 170,
    valueGetter: (params: { value: DateArray }) => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      return new Date(...params.value).toLocaleDateString("pl-PL", options);
    },
  },
  {
    field: "deliveryDate",
    headerName: "Zamówienie na",
    width: 130,
    valueGetter: (params: { value: string | number | Date }) => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };

      return new Date(params.value).toLocaleDateString("pl-PL", options);
    },
  },
  { field: "description", headerName: "Opis" },
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
        <Route
          path="driver"
          element={
            <ClientTableController
              url={new URL("http://localhost:8080/api/driver")}
              columns={columnsDriver}
            />
          }
        />

        <Route path="" element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default AdminPanel;
