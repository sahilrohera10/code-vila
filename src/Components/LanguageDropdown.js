import React from "react";
import Select from "react-select";
import { Styles } from "../Constants/Styles";
import { Languages } from "../Constants/Languages";

export default function LanguageDropdown({ onSelectChange }) {
  // console.log("lang=>", Languages);
  return (
    // <div>
    <Select
      placeholder={`select language`}
      options={Languages}
      styles={Styles}
      defaultValue={Languages[0]}
      onChange={(options) => onSelectChange(options)}
    />
    // </div>
  );
}
