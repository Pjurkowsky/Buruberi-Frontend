import FormPanel from "./FormPanel";
import buruberi from "../assets/buruberi.png";
import logo from "../assets/Borówka amerykańska przez.svg";
import { useState } from "react";
import PaymentPanel from "./PaymentPanel";

function UserPanel() {
  const [showPaymentPanel, setShowPaymentPanel] = useState(false);
  const [formData, setFormData] = useState<FormData>({} as FormData);

  const handleSubmit = (formData: FormData) => {
    setFormData(formData);
    setShowPaymentPanel(true);
  };
  const back = () => {
    setShowPaymentPanel(false);
  };

  const containerStyle = {
    backgroundImage: `url(${buruberi})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  const style = {
    height: "32rem",
    width: "50rem",
  };

  return (
    <div className="lg:flex w-full">
      <div className="lg:fixed ">
        {" "}
        <img src={logo} className=" lg:mt-20 lg:ml-20 lg:h-96 lg:w-96 "></img>
      </div>
      <div className="font-mono body-font font-poppins lg:fixed mt-10 lg:mt-32 w-full z-10 text-center  leading-none tracking-tight font-extrabold text-6xl text-gray-900 dark:text-black "></div>
      <div className="font-mono body-font font-poppins lg:fixed mt-10 lg:mt-32 w-full z-10 text-center  leading-none tracking-tight font-extrabold text-6xl text-gray-900 dark:text-black ">
        {" "}
        ZŁÓŻ ZAMÓWIENIE{" "}
      </div>

      <div
        style={containerStyle}
        className="fixed ml-96 left-48 w-full z-0"
      ></div>
      {showPaymentPanel ? (
        <PaymentPanel back={back} formData={formData} style={style} />
      ) : (
        <FormPanel onSubmit={handleSubmit} formData={formData} style={style} />
      )}
    </div>
  );
}

export default UserPanel;
