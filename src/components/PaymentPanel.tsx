import FormInput from "./FormInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import fetchDataPost from "../utils/fetchData";

interface PaymentPanelProps {
  back: () => void;
  formData: FormData;
  style: React.CSSProperties;
}

function PaymentPanel({ back, formData, style }: PaymentPanelProps) {
  const dataObject = Object.fromEntries(formData);

  const handleSubmit = async () => {
    const responseCustomer = await fetchDataPost(
      new URL("http://localhost:8080/api/customer/add"),
      JSON.stringify(dataObject)
    );

    if (!responseCustomer) {
      console.log("error");
      return;
    }

    const responseCustomerData = await responseCustomer.json();
    const orderObject = {
      address: dataObject.address,
      city: dataObject.city,
      customer: responseCustomerData,
      deliveryDate: dayjs(dataObject!.deliveryDate.toString()).format(
        "YYYY-MM-DD"
      ),
      amount: dataObject.amount,
    };

    console.log(orderObject);

    const responseOrder = await fetchDataPost(
      new URL("http://localhost:8080/api/order/add"),
      JSON.stringify(orderObject)
    );
    console.log(responseOrder);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={style}
        className="z-10 bg-white m-auto shadow-xl p-5 lg:border-solid lg:border-2 lg:border-slate-400 rounded-2xl"
      >
        <div className=" flex">
          <div className="w-96">
            <h2 className="mb-5"> Twoje dane: </h2>
            <div className="w-fit">
              <div className="">
                <FormInput
                  value={
                    dataObject.firstName.toString() +
                    " " +
                    dataObject.lastName.toString()
                  }
                  labelText="Imie i Nazwisko"
                  disabled
                />
              </div>
              <div className="mt-5">
                <FormInput
                  value={
                    dataObject.address.toString() +
                    ", " +
                    dataObject.city.toString()
                  }
                  labelText="Adres"
                  disabled
                />
              </div>

              <div className="mt-5">
                <FormInput
                  value={dataObject.phoneNumber.toString()}
                  labelText="Numer Telefonu"
                  disabled
                />
              </div>

              <div className="mt-5">
                <FormInput
                  value={dataObject.emailAddress.toString()}
                  labelText="Email"
                  disabled
                />
              </div>

              <div className="mt-5">
                <FormInput
                  value={dataObject.amount.toString() + " kg"}
                  labelText={"Zamówina ilość"}
                  disabled
                />
              </div>

              <div className="mt-5">
                <DatePicker
                  disabled
                  label="Data dostawy"
                  defaultValue={dayjs()} // TU KURWA JEST ZLE
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col">
              <h2>Rodzaj płatności:</h2>
              <div className="flex items-center mb-4">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  PayU (BLIK, przelew)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  defaultChecked
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Płatność gotówka przy odbiorze
                </label>
              </div>
            </div>
            <div className="relative mt-2">
              <textarea
                id="comment"
                rows={5}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="comment"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-2 peer-focus:mx-1 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Uwagi do zamówienia
              </label>
            </div>
          </form>
        </div>
        <div className="flex  ">
          <button
            onClick={back}
            className="mt-3 mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-15 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Powrót
          </button>
          <button
            type="submit"
            className="ml-auto mt-3 mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-15 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Przejdz do płatności
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default PaymentPanel;
