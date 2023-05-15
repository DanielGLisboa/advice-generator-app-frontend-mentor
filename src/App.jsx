import "./App.css";
import Advices from "./Pages/Main/Advices";
import ErrorOffline from "./components/Errors/ErrorOffline/ErrorOffline";
import SearchBar from "./components/SearchBar";
import { AdviceProvider } from "./context/adviceContext";
import { useEffect, useState } from "react";

function App() {


  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
      window.location.reload();
     
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="main">
      <AdviceProvider>
        <SearchBar disabled={isOnline} className="searchBar" />
        <Advices />
        <ErrorOffline/>
      </AdviceProvider>
      <footer className="footer">Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="blank">Frontend Mentor</a>. 
    Coded by <a href="https://github.com/DanielGLisboa/advice-generator-app-frontend-mentor" target="blank">Daniel Guerra Lisboa</a>.</footer>
    </div>
  );
}

export default App;
