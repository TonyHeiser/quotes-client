import './App.scss'
import { useEffect, useState } from 'react';
// import type { ReactElement } from 'react';

type Quotes = {
  name: string;
  current: string
}

// interface TabContent {
//   [key: string]: ReactElement
// }

function App() {

  const [theme, setTheme] = useState("light"); //Switch light or dark mode
  const [data, setData] = useState<Quotes[]>([]); //We use this in updateData()
  const [prevData, setPrevData] = useState<Quotes[]>([]); //I have no idea what this is made for
  // const [activeTab, setActiveTab] = useState(null);
  const [error, setError] = useState<string | null>(null); //I think it's for errors in updateData();

  const url = "http://127.0.0.1:8787/";

  const changeTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    updateData();

    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval)
  }, [])

  const updateData = () => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        };
        return response.json();
      })
      .then(newData => {
        setPrevData(data);
        console.log("Updated", JSON.stringify(data[0]));
        setData(newData);
        console.log("Updated", JSON.stringify(newData[0].current));
        setError(null);
      })
      .catch(error => {
        console.error("Failed to fetch data: ", error.message);
        setError("Unable to fetch data. Please check your connection")

        if (error.message.includes("Unable to fetch data")) {
          clearInterval(interval)
        }
      })
      ;
  }

  return (
    <>
      <button className="change-theme__button" onClick={changeTheme}>{theme}</button>
      <div className="showQuotes">
        {error && <div className="errorMessage">{error}</div>}
        <ul className="quotes__container">
          {data.map((element, index) => {
            const prev = prevData[index]?.current;
            const curr = element.current;
            let className = "";

            if (prev !== undefined) {
              if (+curr > +prev) className = "up";
              else if (+curr < +prev) className = "down";
            }

            return (
              <li key={index} className="quotes-list">
                <button className="quotes-list__tab">
                  <span className="element-name">{element.name}</span> 
                  <span className={`element-current ${className}`} key={element.name + element.current}>{element.current}</span>
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
