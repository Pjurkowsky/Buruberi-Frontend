import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useMemo, useRef, useState } from "react";
import FormInput from "./FormInput";
import DirectionCarIcon from "@mui/icons-material/DirectionsCar";
import InfoIcon from "@mui/icons-material/Info";

interface FormPanelProps {
  onSubmit: (formData: FormData) => void;
  formData: FormData;
}

function FormPanel({ onSubmit, formData }: FormPanelProps) {
  const [errorDeliveryDate, setErrorDeliveryDate] =
    useState<DateValidationError | null>(null);

  const [politicyCheckBox, setPoliticyCheckBox] = useState<boolean | null>(
    null
  );

  const [price, setPrice] = useState<number>(50);

  const refs = {
    firstName: useRef(null),
    lastName: useRef(null),
    address: useRef(null),
    city: useRef(null),
    phoneNumber: useRef(null),
    amount: useRef(null),
    emailAddress: useRef(null),
  };

  const deliveryDate = useRef<any>();

  const objectwew = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
    amount: "",
    emailAddress: "",
    deliveryDate: "",
  };

  let dataObject;

  if (formData && Symbol.iterator in formData) {
    dataObject = Object.fromEntries(formData);
  } else {
    dataObject = objectwew;
  }

  const handleDeliveryDateError = (
    newError: DateValidationError | null,
    value: any
  ) => {
    setErrorDeliveryDate(newError);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let validation = true;
    Object.values(refs).forEach((ref: any) => {
      console.log(ref.current.validate(ref.current.getInput()));
      if (ref.current.validate(ref.current.getInput()) && validation)
        validation = false;
    });
    if (deliveryDate == undefined || deliveryDate == null) {
      handleDeliveryDateError("invalidDate", 1);
    } else {
      handleDeliveryDateError(null, 1);
    }
    if (!politicyCheckBox) {
      setPoliticyCheckBox(false);
      console.log("politicy");
      return;
    }
    if (!validation) {
      console.log("validation");
      return;
    }
    if (errorDeliveryDate) {
      console.log("delivery");
      return;
    }
    console.log(deliveryDate);
    formData.append("deliveryDate", deliveryDate.current.value);
    onSubmit(formData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex m-auto z-10">
        <div className="m-auto bg-white shadow-xl p-5 lg:border-solid lg:border-2 lg:border-slate-400 md:rounded-2xl lg:w-[50rem]">
          <form onSubmit={handleSubmit} className="w-80 lg:w-full">
            <div className="grid grid-cols-2 gap-3 md:gap-6 lg:h-14 mb-4">
              <FormInput
                type="text"
                name="firstName"
                defaultValue={dataObject.firstName.toString()}
                labelText="Imię *"
                errorMessage="Imię nieprawidłowe"
                ref={refs.firstName}
              />
              <FormInput
                type="text"
                name="lastName"
                defaultValue={dataObject.lastName.toString()}
                labelText="Nazwisko *"
                errorMessage="Nazwisko nieprawidłowe"
                ref={refs.lastName}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-6 lg:h-14 mb-4">
              <FormInput
                type="text"
                name="address"
                defaultValue={dataObject.address.toString()}
                labelText="Ulica *"
                ref={refs.address}
              />
              <FormInput type="text" name="text" labelText="Nr domu" />
            </div>
            <div className="grid md:grid-cols-3 gap-3 md:gap-6 lg:h-14 mb-4">
              <FormInput type="zip" name="zipCode" labelText="Kod pocztowy *" />
              <div className="lg:col-span-2">
                <FormInput
                  type="text"
                  name="city"
                  defaultValue={dataObject.city.toString()}
                  labelText="Miasto *"
                  ref={refs.city}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:h-14 mb-4">
              <FormInput
                type="tel"
                name="phoneNumber"
                defaultValue={dataObject.phoneNumber.toString()}
                errorMessage="Numer telefonu nieprawidłowy"
                ref={refs.phoneNumber}
              />
              <div className="lg:col-span-2">
                <FormInput
                  type="email"
                  name="emailAddress"
                  defaultValue={dataObject.emailAddress.toString()}
                  errorMessage="E-mail nieprawidłowy"
                  labelText="E-mail *"
                  ref={refs.emailAddress}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6 lg:h-14">
              <FormInput
                type="text"
                name="amount"
                defaultValue={dataObject.amount.toString()}
                labelText="Ilość w kg *"
                errorMessage="Pole powinno zawierać tylko liczby"
                ref={refs.amount}
              />
              <div className="ml-5 mt-5 lg:mt-0">
                <DatePicker
                  disablePast
                  label="Wybierz date dostawy *"
                  onError={handleDeliveryDateError}
                  inputRef={deliveryDate}
                  defaultValue={
                    dayjs(dataObject.deliveryDate as string).isValid()
                      ? dayjs(dataObject.deliveryDate as string)
                      : undefined
                  }
                  minDate={dayjs()}
                  maxDate={dayjs().add(3, "month")}
                />
                {errorDeliveryDate && (
                  <div className="text-sm text-red-600 dark:text-red-500">
                    Data nieprawidłowa
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-rows-2 grid-flow-col">
              <div className="row-span-2 m-auto">
                Aktualna cena za kg: {price} zł
              </div>
              <div className=" flex flex-col mt-12 lg:mt-6">
                <div className="flex items-center h-5 ml-auto mr-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    onChange={() => {
                      setPoliticyCheckBox(!politicyCheckBox);
                    }}
                  />

                  <label
                    htmlFor="remember"
                    className={`ml-2 text-sm font-medium ${
                      politicyCheckBox || politicyCheckBox == null
                        ? "text-gray-900 dark:text-gray-300"
                        : "text-red-500"
                    } `}
                  >
                    Przeczytałem i akceptuję <br className="lg:hidden" />
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Regulamin
                    </a>{" "}
                    oraz <br className="lg:hidden" />
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Polityke prywatności
                    </a>{" "}
                    *.
                  </label>
                </div>
                <div className="flex items-center ml-auto">
                  <p className="text-md text-red-600 dark:text-red-500 mr-[18.2rem] h-5">
                    {politicyCheckBox == false && (
                      <span className="text-sm">Pole jest wymagane</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-3 lg:mt-0 mr-8">
                <button
                  type="submit"
                  className="mt-3 mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-15 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Kontynuuj
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col bg-white shadow-xl p-6 md:rounded-2xl lg:border-solid lg:border-2 lg:border-slate-400 ml-2 hidden">
          <DirectionCarIcon sx={{ fontSize: 32 }} />
          <InfoIcon sx={{ fontSize: 32 }} />
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default FormPanel;
