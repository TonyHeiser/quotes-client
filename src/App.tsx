import './App.scss'
import { useEffect, useState } from 'react';

type Quotes = {
  name: string;
  current: string
}

function App() {

  const [theme, setTheme] = useState("light"); //Switch light or dark mode
  const [data, setData] = useState<Quotes[]>([]); //We use this in updateData() and put here Quotes

  const url = "http://127.0.0.1:8787/";

  const changeTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const updateData = () => {
    fetch(url)
      .then(response => response.json())
      .then(newData => setData(newData))
  }

  useEffect(() => {
    updateData();
    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <button className="change-theme__button" onClick={changeTheme}>{theme}</button>
      <div className="showQuotes">
        <ul className="quotes__container">
          {data.map((element, index) => {
            return (
              <li key={index} className="quotes-list">
                <button className="quotes-list__tab">
                  <span className="element-name">{element.name}</span> 
                  <span className={`element-current`}>{element.current}</span>
                </button>
              </li>
            )})
          }
        </ul>
      </div>
      <div className="quotes__tab-content">

      </div>
    </>
  )
}

export default App
