import { createContext, useState, useEffect, useRef } from "react";
import { url } from "../services/apiAdvices";

import { Toast } from "primereact/toast";

export const AdviceContext = createContext();

export const AdviceProvider = ({ children }) => {
  const toastError = useRef(null);

  const [adviceDataContext, setAdviceDataContext] = useState({id: 0, advice: "getting inspired..."});

  function configAdvice(objAdvice) {
    setAdviceDataContext(objAdvice);
  }

  const show = (msg) => {
    toastError.current.show({
      sticky: true,
      closable: false,
      severity: "error",
      summary: "Erro:",
      detail: msg,
    });
  };

  const getRandomAdvice = () => {
    url
      .get("/advice")
      .then((resp) => {
        configAdvice(resp.data.slip);
      })
      .catch((error) => {
        show(error.message);
        configAdvice({
          id: 500,
          advice: `
                Ops! Parece Que Algo Deu Errado...
                Tente Novamente Mais tarde.
              `,
        });
      });
  };

  useEffect(() => {
    getRandomAdvice();
  }, []);

  return (
    <AdviceContext.Provider value={{ adviceDataContext, configAdvice, getRandomAdvice }}>
      {children}
      <Toast ref={toastError} />
    </AdviceContext.Provider>
  );
};

export default AdviceContext;
