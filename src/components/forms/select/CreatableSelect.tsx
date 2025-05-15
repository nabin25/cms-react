import { useContext, type ReactNode } from "react";
import {
  default as ReactSelect,
  type CreatableProps,
} from "react-select/creatable";
import type { GroupBase } from "react-select";
import { ThemeContext } from "../../../providers/ThemeProvider";

export interface Option {
  label: string;
  value: string;
  __isNew__?: string;
}

export interface ColourOption
  extends CreatableProps<Option, true, GroupBase<Option>> {
  label?: ReactNode;
  error?: string;
  className?: string;
  value?: any;
  onChange?: (selected: any) => void;
}

const CreatableSelect = ({ label, ...props }: ColourOption) => {
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
      fontSize: "13px",

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
    option: (styles: any) => ({
      ...styles,
      color: themeContext?.theme === "dark" ? "#aaa" : "#333",
    }),
  };

  return (
    <div className="flex flex-col flex-1 gap-1.5">
      {label}
      <ReactSelect
        {...props}
        styles={customStyles}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        isMulti
      />
      <p className="text-red-600">{props.error}</p>
    </div>
  );
};
export default CreatableSelect;
