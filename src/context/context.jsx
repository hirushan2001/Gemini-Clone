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
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input)
    const response = await run(input);
    setResultData(response);
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
