import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./assets/Borówka amerykańska przez.svg";
import buruberi from "./assets/buruberi.png";
import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";
import OrderConfirmationPanel from "./components/OrderConfirmationPanel";
import ErrorPanel from "./components/ErrorPanel";

const containerStyle = {
  backgroundImage: `url(${buruberi})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
};
function App() {
  return (
    <Router>
      <div className="flex h-screen flex-col">
        <div className="lg:flex w-full h-max lg:h-screen">
          <Link to="/">
            <img
              src={logo}
              className=" lg:mt-20 lg:ml-20 lg:h-96 lg:w-96 lg:fixed "
            />
          </Link>
          <div className="font-mono body-font font-poppins lg:fixed mt-10 lg:mt-32 w-full z-10 text-center  leading-none tracking-tight font-extrabold text-6xl text-gray-900 dark:text-black "></div>
          <div
            style={containerStyle}
            className="fixed ml-96 left-48 w-full z-0"
          ></div>
          <Routes>
            <Route path="/admin/*" element={<AdminPanel />}></Route>
            <Route
              path="/order-confirmations"
              element={<OrderConfirmationPanel />}
            />
            <Route path="/order-error" element={<ErrorPanel />} />
            <Route path="/" element={<UserPanel />}></Route>
          </Routes>
        </div>
        <footer className="z-50 bg-white md:rounded-lg shadow md:m-4 mt-auto ">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center ">
              © 2024 WdowiakBrothers™{" "}
              <span className="ml-1">Wszelkie prawa zastrzeżone.</span>
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  O nas
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Polityka prywatności
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Lokalizacja
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </footer>
        {/*
        </div> */}
      </div>
    </Router>
  );
}

export default App;
