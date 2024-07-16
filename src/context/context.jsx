import { createContext , useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevprompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index,nextWord) => {
    setTimeout( function () {
      setResultData(prev => prev+nextWord);
    }, 75*index);
  };


  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    setPrevPrompt(prev => [...prev, input])
    const response = await run(input);
    let responseArray = response.split("**");
    let newresponse;
    for (let i = 0; i < responseArray.length; i++) {
    if( i === 0 || i%2 !== 1){
        newresponse += responseArray[i];
    }
    else{
        newresponse += "<b>" + responseArray[i] +"</b>";
    }
    }
    let newResponse2 = newresponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i,nextWord+ "");
    }
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
