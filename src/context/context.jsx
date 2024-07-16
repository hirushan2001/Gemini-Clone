import { createContext , useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevprompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState([]);

  const delayPara = (index,nextWord) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(para);
      }, 500);
    });
  };


  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input)
    const response = await run(input);
    let responseArray = response.split("**");
    let newresponse;
    for (let i = 0; i < responseArray.length; i++) {
    if( i ===0 || i%2 !== 1){
        newresponse += responseArray[i];
    }
    else{
        newresponse += " " + responseArray[i];
    }
    }
    let newResponse2 = newresponse.split("*").join("</br>");
    setResultData(newResponse2);
    setLoading(false);
    setInput("");
  };

  const contextvalue = {
     prevprompt,
     setPrevPrompt,
     onSent,
     setRecentPrompt,
     recentPrompt,
     loading,
     resultData,
     showResult,
     input,
     setInput,
  };

  return (
    <Context.Provider value={contextvalue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
