import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cate from './Cate'


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearCache = () => {
    localStorage.clear();
    window.location.reload();
  };

  const fetchData = async () => {
    try {
      for (let team of ["France", "Italy", "Scotland", "Wales", "Ireland", "England"]) {
        const cachedData = localStorage.getItem(`${team}Data`)
        if (!cachedData){
          const data = await axios.get(`http://localhost:8000/api/${team}`)
          localStorage.setItem(`${team}Data`, JSON.stringify(data))
        }
      };
      setIsLoading(false);
    } catch(error) {
      console.error('Error fetching data: ', error);
      setError('Une erreur s\'est produite lors de la récupération des données.');
      setIsLoading(false);
    };
  };

  useEffect(() => {
    document.title = "Data 6 Nations";
    fetchData();
  }, []);


  return (
    <>
      {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <button style={{ position: 'fixed', top: '10px', right: '10px', zIndex: '999' }} onClick={clearCache}>Clear Cache</button>
            <Cate/>
          </>
        )
      } 
    </>
  );
}

export default App;
