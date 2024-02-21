import { useEffect, useState } from "react";
import Table, { DataItem, TableColumn } from "./Table";
import PopupCustomer from "./PopupCustomer";

import { DataGrid } from "@mui/x-data-grid";

interface TablePanelProps {
  url: URL;
  columns: any;
}

function flattenObject(obj: Record<string, any>, parentKey = ""): DataItem {
  const result: DataItem = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}_${key}` : key;
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        const flattened = flattenObject(obj[key], newKey);
        Object.assign(result, flattened);
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

function ClientTableController({ url, columns }: TablePanelProps) {
  const [data, setData] = useState<DataItem[]>([]);
  const [popupCustomerSubmitted, setPopupCustomerSubmitted] = useState(0);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url)).json();

      data.forEach(
        (
          element: Record<string, any>,
          index: string | number,
          array: { [x: string]: DataItem }
        ) => {
          array[index] = flattenObject(element);
        }
      );
      console.log(data);

      setData(data);
    };
    dataFetch();
  }, [url, popupCustomerSubmitted]);

  const handleCustomerSubmitted = () => {
    setPopupCustomerSubmitted((prevCount) => prevCount + 1);
  };

  return (
    <div className="flex flex-col">
      <PopupCustomer onSubmit={handleCustomerSubmitted} />
      <DataGrid rows={data} columns={columns}></DataGrid>
    </div>
  );
}

export default ClientTableController;
