import { useContext, useRef, useState, useEffect } from "react";
import AdviceContext from "../../../context/adviceContext";
import { Toast } from "primereact/toast";

function ErrorOffline() {
  const [isOnline, setIsOnline] = useState(true);

  const toastOffline = useRef(null);

  const { configAdvice } = useContext(AdviceContext);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
      toastOffline.current.clear();
    }
    function handleOffline() {
      setIsOnline(false);
      configAdvice({
        id: 500,
        advice: "Ops! Você Está Offline... Verifique sua conexão",
      });
      toastOffline.current.show({
        sticky: true,
        closable: false,
        severity: "warn",
        summary: "Rede",
        detail: "Você está off-line. Verifique sua rede",
      });
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <Toast ref={toastOffline} />;
}

export default ErrorOffline;
