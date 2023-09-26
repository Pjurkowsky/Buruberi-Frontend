import {
  ChangeEvent,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
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

const FormInput = forwardRef(
  (
    { labelProps, labelText, errorMessage, ...inputProps }: FormInputProps,
    ref: any
  ) => {
    {
      const [error, setError] = useState(false);
      const [errorMessageText, setErrorMessageText] = useState(errorMessage);
      const refInput = useRef(null);

      useImperativeHandle(ref, () => ({
        validate,
        getInput: () => refInput.current,
      }));

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

      const emptyErrorMessage = "Pole nie może być puste";
      const errorMessageSaved = errorMessage;

      const validateInput = (input: HTMLInputElement, regex: RegExp) => {
        if (regex.test(input.value)) {
          setError(false);
          return false;
        } else {
          setError(true);
          setErrorMessageText(errorMessageSaved);
          return true;
        }
      };

      const validate = (input: HTMLInputElement) => {
        if (input.value === "") {
          setError(true);
          setErrorMessageText(emptyErrorMessage);
          return true;
        } else {
          setError(false);
          switch (input.getAttribute("name")) {
            case "firstName":
            case "lastName":
              return validateInput(input, regexPatterns.names);
            case "emailAddress":
              return validateInput(input, regexPatterns.email);
            case "amount":
              return validateInput(input, regexPatterns.amount);
            case "phoneNumber":
              return validateInput(input, regexPatterns.phone);
          }
        }
        return false;
      };

      const validateEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        validate(input);
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
                      onBlur={validateEvent}
                      getInputRef={refInput}
                    />
                    <label htmlFor="phoneNumber" className={labelClassName}>
                      Telefon *
                    </label>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {error && (
                        <span className="text-sm">{errorMessageText}</span>
                      )}
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
                      className={inputClassName}
                      onBlur={validateEvent}
                      ref={refInput}
                    />

                    <label
                      htmlFor={inputProps.id || ""}
                      {...labelProps}
                      className={labelClassName}
                    >
                      {labelText}
                    </label>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {error && (
                        <span className="text-sm">{errorMessageText}</span>
                      )}
                    </p>
                  </div>
                );
            }
          })()}
        </div>
      );
    }
  }
);

export default FormInput;
