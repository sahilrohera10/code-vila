import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { Styles } from "../Constants/Styles";

export default function ThemesDropdown({ handleThemeChange, theme }) {
  return (
    // <div>
    <Select
      placeholder={`Select Theme`}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}
      styles={Styles}
      onChange={handleThemeChange}
    />

    // </div>
  );
}
