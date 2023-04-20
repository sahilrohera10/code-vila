import React, { useState } from "react";
import Editor from "@monaco-editor/react";

// LANGUAGE - The language for which we require syntax highlighting and intellisense.

// THEME - The colors and background of code snippet (we'll configure it in the later part of the tutorial).

//VALUE - The actual code value that goes into the code editor

//onChange - This is triggered when the value in the code editor changes. We need to save the changed value in the state so that we can, later on, call the Judge0 API to compile it.

export default function CodeEditor({ onChange, language, code, theme }) {
  const [value, setValue] = useState(code || "");

  const handleEditor = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="80vh"
        width={`90%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditor}
      />
    </div>
  );
}
