import styles from "./Advices.module.css";
import divider from "../../assets/icons/pattern-divider-desktop.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

import { useContext, useRef, useState } from "react";
import { url } from "../../services/apiAdvices";
import { Toast } from "primereact/toast";
import AdviceContext from "../../context/adviceContext";

function Advices() {
  const toastError = useRef(null);

  const { adviceDataContext, configAdvice } = useContext(AdviceContext);

  const [buttonEnabled, setButtonEnabled] = useState(false);

  const [buttonClass, setButtonClass] = useState(styles.changeAdvice);

  const getRandomAdvice = () => {
    url
      .get("/advice")
      .then((resp) => {
        configAdvice(resp.data.slip);
      })
      .catch((error) => {
        configAdvice({
          id: 500,
          advice: `
                Ops! Parece Que Algo Deu Errado...
                Tente Novamente Mais tarde.
            `,
        });
      });
  };

  function actionButton() {
    getRandomAdvice();
    setButtonEnabled(true);
    setButtonClass(styles.changeAdviceDisabled);
    setTimeout(() => {
      setButtonEnabled(false);
      setButtonClass(styles.changeAdvice);
      console.log(buttonEnabled);
    }, 2000);
    console.log(buttonEnabled);
  }

  return (
    <div className={styles.card}>
      <div className={styles.adviceId}> ADVICE #{adviceDataContext.id}</div>
      <div className={styles.advice}>
        <FontAwesomeIcon className={styles.quotes} icon={faQuoteLeft} />
        {" " + adviceDataContext.advice + " "}
        <FontAwesomeIcon className={styles.quotes} icon={faQuoteRight} />
      </div>
      <div className={styles.divider}>
        <img src={divider} alt="" />
      </div>
      <button
        disabled={buttonEnabled}
        onClick={() => actionButton()}
        className={buttonClass}
      />
      <Toast ref={toastError} />
    
    </div>
  );
}

export default Advices;
