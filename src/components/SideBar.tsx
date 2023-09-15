import { Link, Outlet, useNavigate } from "react-router-dom";

function SideBar() {
  return (
    <div className="p-6 w-[200px] text-center bg-neutral-50">
      <div>
        <div className="p-2.5 mt-1 flex items-center"></div>
        <h1>chuj</h1>
        <div className="my-2 bg-gray-900 h-[1px]"></div>
      </div>
      <div className="flex flex-col">
        <Link
          to="../admin/order"
          className="p-2.5 mt-3 mb-auto flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-neutral-200 text-black"
        >
          Orders
        </Link>
        <Link
          to="../admin/customer"
          className="p-2.5 mt-3 mb-auto flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-neutral-200 text-black"
        >
          Customer
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
