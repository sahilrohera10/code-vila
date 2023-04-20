import React, { useEffect, useState } from "react";
import CodeEditor from "../Components/CodeEditor";
import { classnames } from "../utils/general";
import { Languages } from "../Constants/Languages";
import axios from "axios";

// import { ToastContainer, toast } from "react-toastify";
import { useToast } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputCompo from "../Components/OutputCompo";
import CustomInputs from "../Components/CustomInputs";
import OutputDetail from "../Components/OutputDetail";
import ThemesDropdown from "../Components/ThemesDropdown";
import LanguageDropdown from "../Components/LanguageDropdown";

const cppDefault = `
//SELECT YOUR LANGUAGE AND CONTINUE TO CODE !!
`;
// const cDefault = `#include <stdio.h>
// int main() {
//     printf("Hello World!");
// }
// `;
// const jDefault = `public class Main {
//     public static void main(String args[]) {
//         System.out.println("Hello World!");
//     }
// }`;

// this will be the main landing page of our code editor
// basically comprises of three major parts
// 1. action bar - for changing language and theme
// 2. the code editor
// 3. input and output components

export default function LandingPage() {
  const [code, setCode] = useState(cppDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetail, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(Languages[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const toast = useToast();

  const onSelectChange = (sl) => {
    console.log("selected option=>", sl.value);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [enterPress, ctrlPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = (e) => {
    e.preventDefault();
    setProcessing(true);
    const body = {
      source_code: code,
      language_id: language.id,
      stdin: customInput,
    };
    console.log("form data=>", body);
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      },
      data: body,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + token,
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      },
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status_id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        // showSuccessToast(`Compiled Successfully!`);
        toast({
          title: "Complied Successful",
          // description: "We've created your account for you.",
          status: "success",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      toast({
        title: "Some error has occured",
        // description: "We've created your account for you.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      // showErrorToast();
    }
  };

  const handleThemeChange = (th) => {
    const theme = th;
    console.log("theme....", theme);
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  };

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  // const showSuccessToast = (msg) => {
  //   toast.success(msg || `Compiled Successfully!`, {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };
  // const showErrorToast = (msg, timer) => {
  //   toast.error(msg || `Something went wrong! Please try again.`, {
  //     position: "top-right",
  //     autoClose: timer ? timer : 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  return (
    <div
      style={{ backgroundColor: "black", height: "105vh", paddingTop: "15px" }}
    >
      <h1
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: "25px",
          marginLeft: "20px",
          // marginTop: "20px",
        }}
      >
        CODE VILA :{" "}
        <span
          style={{
            color: "white",
            fontWeight: "500",
            fontSize: "20px",
            marginLeft: "20px",
            // marginTop: "20px",
          }}
        >
          Code the way you love
        </span>
      </h1>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguageDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemesDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditor
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>

        <div style={{ width: "30vw", marginLeft: "-100px" }}>
          {/* <h1 style={{ color: "white" }}>Output</h1> */}
          <OutputCompo outputDetails={outputDetail} />
          <div className="flex flex-col items-end">
            {/* <h1 style={{ color: "white" }}>Custom Input</h1> */}
            <CustomInputs
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              style={{ margin: "auto", marginTop: "10px" }}
              onClick={(e) => handleCompile(e)}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetail && <OutputDetail outputDetails={outputDetail} />}
        </div>
      </div>
      <p style={{ textAlign: "center", color: "white" }}>
        Developed with ❤️ by Sahil Rohera
      </p>
    </div>
  );
}
