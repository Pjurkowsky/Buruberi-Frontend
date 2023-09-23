import {
  ChangeEvent,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  useState,
} from "react";
import { PatternFormat } from "react-number-format";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  labelText?: string;
  errorMessage?: string;
}

const regexPatterns = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  names: /^[a-zA-ZęĘóÓąĄśŚłŁżŻźŹćĆńŃ]+$/,
  amount: /^[0-9]+$/,
  phone: /^\+\d{2} \d{3} \d{3} \d{3}$/,
};

function FormInput({
  labelProps,
  labelText,
  errorMessage,
  ...inputProps
}: FormInputProps) {
  const [error, setError] = useState(false);
  const inputClassName = `block py-2 pr-2 w-full text-md bg-transparent appearance-none focus:outline-none focus:ring-0 peer ${
    error
      ? "border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 block w-full dark:text-red-500 dark:border-red-500"
      : ""
  } ${
    inputProps.disabled
      ? "cursor-not-allowed rounded border border-1 border-gray-g text-gray-g px-2"
      : "border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
  }`;
  const labelClassName = `z-20 bg-white peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
    error
      ? "text-red-600 dark:text-red-500"
      : "text-gray-500 dark:text-gray-400"
  } ${inputProps.disabled ? "mx-2 px-2 " : " "}`;

  const validateInput = (input: HTMLInputElement, regex: RegExp) => {
    const child = input.parentNode?.querySelector("p > span.error");
    if (regex.test(input.value)) {
      child?.classList.add("hidden");
      setError(false);
    } else {
      child?.classList.remove("hidden");
      setError(true);
    }
  };

  const validate = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const childExceptionEmpty = input.parentNode?.querySelector(
      "p > span.emptyException"
    );
    const child = input.parentNode?.querySelector("p > span.error");
    if (input.value === "") {
      childExceptionEmpty?.classList.remove("hidden");
      child?.classList.add("hidden");
      setError(true);
    } else {
      childExceptionEmpty?.classList.add("hidden");
      setError(false);
      switch (input.getAttribute("name")) {
        case "firstName":
        case "lastName":
          validateInput(input, regexPatterns.names);
          break;
        case "emailAddress":
          validateInput(input, regexPatterns.email);
          break;
        case "amount":
          validateInput(input, regexPatterns.amount);
          break;
        case "phoneNumber":
          validateInput(input, regexPatterns.phone);
      }
    }
  };

  return (
    <div className="relative z-0 w-full group ">
      {(() => {
        switch (inputProps.type) {
          case "tel":
            return (
              <div>
                <PatternFormat
                  className={inputClassName}
                  required
                  placeholder=" "
                  type="tel"
                  defaultValue={
                    inputProps.defaultValue as
                      | string
                      | number
                      | null
                      | undefined
                  }
                  name="phoneNumber"
                  id="phoneNumber"
                  format="+48 ### ### ###"
                  mask="_"
                  onBlur={validate}
                />
                <label htmlFor="phoneNumber" className={labelClassName}>
                  Telefon *
                </label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="error hidden text-sm">{errorMessage}</span>
                  <span className="emptyException hidden text-xs">
                    Pole nie może być puste
                  </span>
                </p>
              </div>
            );

          default:
            return (
              <div>
                <input
                  {...inputProps}
                  id={inputProps.name}
                  placeholder=" "
                  required
                  className={inputClassName}
                  onBlur={validate}
                />

                <label
                  htmlFor={inputProps.id || ""}
                  {...labelProps}
                  className={labelClassName}
                >
                  {labelText}
                </label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="error hidden text-sm">{errorMessage}</span>
                  <span className="emptyException hidden text-xs">
                    Pole nie może być puste
                  </span>
                </p>
              </div>
            );
        }
      })()}
    </div>
  );
}

export default FormInput;
