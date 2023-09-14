function SideBar() {
  return (
    <div className="p-6 w-[200px] text-center bg-neutral-50">
      <div>
        <div className="p-2.5 mt-1 flex items-center"></div>
        <i></i>
        <h1>chuj</h1>
        <div className="my-2 bg-gray-900 h-[1px]"></div>
      </div>
      <div className="flex flex-col  ">
        <a
          href="#"
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-neutral-200 text-black"
        >
          Home
        </a>
        <a
          href="#"
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-neutral-200 text-black"
        >
          Orders
        </a>
        <a
          href="#"
          className="p-2.5 mt-3 mb-auto flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-neutral-200 text-black"
        >
          Customers
        </a>
      </div>
    </div>
  );
}

export default SideBar;
