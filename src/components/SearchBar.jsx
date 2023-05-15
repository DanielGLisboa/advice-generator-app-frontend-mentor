import styles from "./SearchBar.module.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { InputText } from "primereact/inputtext";

import { useContext, useEffect, useState } from "react";
import adviceContext from "../context/adviceContext";
import { url } from "../services/apiAdvices";

function SearchBar({ disabled }) {
  const { configAdvice } = useContext(adviceContext);

  const getAdviceById = (id) => {
    url
      .get("/advice/" + id)
      .then(async (resp) => {
        await configAdvice(resp.data.slip);
      })
      .catch((error) => {
        configAdvice({ id: "1", advice: error.message });
      });
  };

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

  const notFound = [22, 48, 67];

  function validationSearchBar(value) {
    if (value == "") getRandomAdvice();
    else if (!Number.parseInt(value)) getRandomAdvice();
    else if (value <= 0) getRandomAdvice();
    else if (value > 219 || notFound.includes(Number.parseInt(value)))
      Search(219);
    else Search(value);
  }

  function Search(value) {
    getAdviceById(value);
  }

  const [classBlink, setClassBlink] = useState(styles.blinkCursor);

  useEffect(() => {
    setTimeout(() => {
      setClassBlink(styles.enterOnlyNumber);
    }, 3100);
  }, []);

  return (
    <span className={styles.searchBar}>
      {console.log(disabled)}
      <p className={classBlink}>enter only numbers:</p>
      <InputText
        maxLength={3}
        disabled={!disabled}
        onChange={(e) => validationSearchBar(e.target.value)}
        keyfilter={/[0-9]/}
        className={styles.searchInput}
        placeholder="Search"
      />
      <i className="pi pi-search" />
    </span>
  );
}

export default SearchBar;
