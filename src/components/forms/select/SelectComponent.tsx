import type { ReactNode } from "react";
import { useContext } from "react";
import { default as ReactSelect } from "react-select";
import type { Props as ReactSelectProps } from "react-select";
import { ThemeContext } from "../../../providers/ThemeProvider";

export interface ColourOption extends ReactSelectProps {
  label: ReactNode | string;
  value?: any;
  onChange?: (selected: any) => void;
  className: string;
  error: any;
  isClearable?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const SelectComponent = ({
  label,
  placeholder,
  disabled = false,
  isClearable,
  ...props
}: ColourOption) => {
  const themeContext = useContext(ThemeContext);

  const getBorderColor = (theme: string | undefined) => {
    if (theme === "dark") {
      return "white";
    } else {
      return "#3B82F6";
    }
  };
  const customStyles = {
    input: (provided: any) => ({
      ...provided,
      "input:focus": {
        boxShadow: "none",
      },
      color: "inherit",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: "40px",

      fontSize: "14px",
      borderColor: props.error
        ? "red"
        : state.isFocused
          ? getBorderColor(themeContext?.theme)
          : "",
      backgroundColor: "transparent",
      boxShadow: "none",
      borderRadius: "5px",
      borderWidth: "2px",
      "&:hover": {
        borderColor: props.error ? "red" : getBorderColor(themeContext?.theme),
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999,
      backgroundColor: themeContext?.theme === "dark" ? "#333333" : "white",
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
    singleValue: (base: any) => ({
      ...base,
      color: themeContext?.theme === "dark" ? "white" : "black",
    }),
    option: (styles: any) => {
      return {
        ...styles,
        color: themeContext?.theme === "dark" ? "#aaa" : "#333",
      };
    },
  };

  return (
    <div className="flex flex-col flex-1 gap-1.5">
      {label}
      <ReactSelect
        isDisabled={disabled}
        {...props}
        //@ts-ignore
        menuPortalTarget={document.body}
        menuPosition="fixed"
        isClearable={isClearable}
        styles={customStyles}
        placeholder={placeholder}
      />
      {props.error && props.error !== "" && (
        <p className="text-red-600">{props.error}</p>
      )}
    </div>
  );
};

export default SelectComponent;
