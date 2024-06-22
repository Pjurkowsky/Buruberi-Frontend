import FormPanel from "./FormPanel";
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

  return (
    <div className="lg:flex w-full">
      <div className="font-mono body-font font-poppins lg:fixed mt-10 lg:mt-24 w-full z-10 text-center  leading-none tracking-tight font-extrabold text-6xl text-gray-900 dark:text-black ">
        ZŁÓŻ ZAMÓWIENIE
      </div>
      {showPaymentPanel ? (
        <PaymentPanel back={back} formData={formData} />
      ) : (
        <FormPanel onSubmit={handleSubmit} formData={formData} />
      )}
    </div>
  );
}

export default UserPanel;
