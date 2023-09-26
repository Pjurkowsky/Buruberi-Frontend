import { FormEvent, useRef, useState } from "react";
import FormInput from "./FormInput";
import fetchDataPost from "../utils/fetchData";

interface PopupCustomerProps {
  onSubmit: () => void;
}

function PopupCustomer({ onSubmit }: PopupCustomerProps) {
  const [modal, setModal] = useState(false);
  const refs = {
    firstName: useRef(null),
    lastName: useRef(null),
    phoneNumber: useRef(null),
    emailAddress: useRef(null),
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData);
    event.preventDefault();

    let validation = true;
    Object.values(refs).forEach((ref: any) => {
      if (ref.current.validate(ref.current.getInput()) && validation)
        validation = false;
    });
    if (!validation) {
      console.log("chuj");
      return;
    }

    const responseCustomer = await fetchDataPost(
      new URL("http://localhost:8080/api/customer/add"),
      JSON.stringify(dataObject)
    );

    console.log(responseCustomer);
    if (!responseCustomer) {
      console.log("error");
      return;
    }

    onSubmit();
  };

  return (
    <div>
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Toggle modal
      </button>
      {modal && (
        <div
          id="defaultModal"
          className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add Customer
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                  onClick={() => {
                    setModal(!modal);
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 md:gap-6 h-20 mb-4">
                    <FormInput
                      type="text"
                      name="firstName"
                      labelText="Imię *"
                      errorMessage="Imię nieprawidłowe"
                      ref={refs.firstName}
                    />
                    <FormInput
                      type="text"
                      name="lastName"
                      labelText="Nazwisko *"
                      errorMessage="Nazwisko nieprawidłowe"
                      ref={refs.lastName}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 h-20 mb-4">
                    <FormInput
                      type="tel"
                      name="phoneNumber"
                      errorMessage="Numer telefonu nieprawidłowy"
                      ref={refs.phoneNumber}
                    />
                    <div className="lg col-span-2">
                      <FormInput
                        type="email"
                        name="emailAddress"
                        errorMessage="E-mail nieprawidłowy"
                        labelText="E-mail *"
                        ref={refs.emailAddress}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  <button
                    type="submit"
                    className="text-white ml-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupCustomer;
