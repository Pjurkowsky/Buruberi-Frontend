import { useEffect, useState } from "react";
import Table, { DataItem, TableColumn } from "./Table";
import PopupCustomer from "./PopupCustomer";

interface TablePanelProps {
  url: URL;
  columns: TableColumn[];
}

function flattenObject(obj: Record<string, any>, parentKey = ""): DataItem {
  const result: DataItem = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        const flattened = flattenObject(obj[key], newKey);
        Object.assign(result, flattened);
      } else {
        result[key] = obj[key];
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
    <div className="flex">
      <PopupCustomer onSubmit={handleCustomerSubmitted} />
      <Table columns={columns} data={data} />
    </div>
  );
}

export default ClientTableController;
