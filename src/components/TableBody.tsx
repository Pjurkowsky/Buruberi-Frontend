function TableBody({ columns, data }: any) {
  return (
    <tbody>
      {data.map((row: any) => {
        return (
          <tr
            className="bg-white border-b text-center light:bg-gray-800 light:border-gray-700 transition duration-300 ease-in-out hover:bg-neutral-100 h-1"
            key={row.id}
          >
            {columns.map(({ name }: any) => {
              return <td key={name}>{row[name]}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
