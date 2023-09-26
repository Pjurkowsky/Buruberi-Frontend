import { useState } from "react";

function TableHead({ columns, handleSorting }: any) {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (label: string) => {
    const sortOrder = label === sortField && order === "asc" ? "desc" : "asc";
    setSortField(label);
    setOrder(sortOrder);
    handleSorting(label, sortOrder);
  };

  return (
    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 light:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map(({ name, label }: any) => {
          return (
            <th
              className="px-6 py-3"
              key={name}
              onClick={() => handleSortingChange(label)}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHead;
