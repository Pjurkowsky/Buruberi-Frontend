import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useRef, useState } from "react";
import FormInput from "./FormInput";

interface FormPanelProps {
  onSubmit: (formData: FormData) => void;
  formData: FormData;
  style: React.CSSProperties;
}

function FormPanel({ onSubmit, formData, style }: FormPanelProps) {
  const [deliveryDate, setDeliveryDate] = useState<Dayjs | unknown>(dayjs());

  const [error, setError] = useState<DateValidationError | null>(null);

  const errorMessage = useMemo(() => {
    return error ? "Data nieprawidłowa" : "";
  }, [error]);

  const objectwew = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
    amount: "",
    emailAddress: "",
  };

  let dataObject;

  if (formData && Symbol.iterator in formData) {
    // Ensure formData is iterable
    dataObject = Object.fromEntries(formData);
  } else {
    // Handle the case where formData is not iterable (optional)
    dataObject = objectwew;
  }
  const fetchDataPost = async (url: URL, body: BodyInit) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    return response;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    onSubmit(formData);
    // const dataObject = Object.fromEntries(formData);

    // const responseCustomer = await fetchDataPost(
    //   new URL("http://localhost:8080/api/customer/add"),
    //   JSON.stringify(dataObject)
    // );
    // const responseCustomerData = await responseCustomer.json();

    // const orderObject = {
    //   address: dataObject.address,
    //   city: dataObject.city,
    //   customer: responseCustomerData,
    //   deliveryDate: deliveryDate,
    //   amount: dataObject.amount,
    // };

    // const responseOrder = await fetchDataPost(
    //   new URL("http://localhost:8080/api/order/add"),
    //   JSON.stringify(orderObject)
    // );
    // console.log(responseOrder);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={style}
        className="z-10 bg-white m-auto shadow-xl p-5 lg:border-solid lg:border-2 lg:border-slate-400 rounded-2xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6 h-20 mb-4">
            <FormInput
              type="text"
              name="firstName"
              defaultValue={dataObject.firstName.toString()}
              labelText="Imię *"
              errorMessage="Imię nieprawidłowe"
            />
            <FormInput
              type="text"
              name="lastName"
              defaultValue={dataObject.lastName.toString()}
              labelText="Nazwisko *"
              errorMessage="Nazwisko nieprawidłowe"
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 h-20 mb-4">
            <FormInput
              type="text"
              name="address"
              defaultValue={dataObject.address.toString()}
              labelText="Adres zamieszkania *"
            />
            <FormInput
              type="text"
              name="city"
              defaultValue={dataObject.city.toString()}
              labelText="Miasto *"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 h-20 mb-4">
            <FormInput
              type="tel"
              name="phoneNumber"
              defaultValue={dataObject.phoneNumber.toString()}
              errorMessage="Numer telefonu nieprawidłowy"
            />
            <div className="lg col-span-2">
              <FormInput
                type="email"
                name="emailAddress"
                defaultValue={dataObject.emailAddress.toString()}
                errorMessage="E-mail nieprawidłowy"
                labelText="E-mail *"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 h-20">
            <FormInput
              type="text"
              name="amount"
              defaultValue={dataObject.amount.toString()}
              labelText="Ilość w kg *"
              errorMessage="Pole powinno zawierać tylko liczby"
            />
            <div className="ml-5">
              <DatePicker
                onChange={(newDeliveryDate) => setDeliveryDate(newDeliveryDate)}
                defaultValue={dayjs()}
                disablePast
                label="Wybierz date dostawy"
                onError={(newError) => setError(newError)}
                slotProps={{ textField: { helperText: errorMessage } }}
                minDate={dayjs()}
                maxDate={dayjs().add(3, "month")}
              />
            </div>
          </div>
          <div className="flex items-start mb-2 mt-10 ">
            <div className="flex items-center h-5 ml-auto">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Przeczytałem i akceptuję{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Regulamin
              </a>{" "}
              oraz{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Polityke prywatności
              </a>{" "}
              *.
            </label>
          </div>
          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="mt-3 mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-15 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Kontynuuj
            </button>
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
}

export default FormPanel;
