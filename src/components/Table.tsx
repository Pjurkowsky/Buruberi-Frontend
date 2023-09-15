import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

interface TableColumn {
  name: string;
  label: string;
  format?: (value: any) => string;
}

interface DataItem {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: DataItem[];
}

function Table({ columns, data }: TableProps) {
  const [tableData, setTableData] = useState(data);
  const handleSorting = (label: string, order: string) => {
    if (label) {
      const sortedData = [...tableData].sort((a, b) => {
        return (
          a[label]
            .toString()
            .localeCompare(b[label].toString(), "en", { numeric: true }) *
          (order === "asc" ? 1 : -1)
        );
      });
      setTableData(sortedData);
    }
  };
  return (
    <table className="my-40 mx-20 h-5 text-sm text-left text-gray-500 dark:text-gray-400">
      <TableHead columns={columns} handleSorting={handleSorting} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}

export default Table;
export type { TableColumn, TableProps, DataItem };
