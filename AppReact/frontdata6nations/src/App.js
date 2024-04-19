import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cate from './Cate';
import Radar from './Radar';


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeGraph, setTypeGraph] = useState('cate');

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
          localStorage.setItem(`${team}Data`, JSON.stringify(data.data))
        }
      };
      const cachedData = localStorage.getItem(`List_stats`)
      if (!cachedData){
        const data = await axios.get(`http://localhost:8000/api/stats/`)
        localStorage.setItem(`List_stats`, JSON.stringify(data.data))
      };

      const a = localStorage.getItem('MaxList');
      if (!a){
        
      }

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

  const handleGraphButtonClick = (graph) => {
    setTypeGraph(graph);
  };


  return (
    <>
      {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <button style={{ position: 'fixed', top: '10px', right: '10px', zIndex: '999' }} onClick={clearCache}>Clear Cache</button>
            <div style={{display: 'flex', justifyContent:"center",alignItems: 'center',gap: "10px", top:"10px"}}>
              <button className="button" onClick={() => handleGraphButtonClick('cate')}>cate</button>
              <button className="button" onClick={() => handleGraphButtonClick('radar')}>radar</button>
            </div>
            {typeGraph === 'cate' && <Cate/>}
            {typeGraph === 'radar' && <Radar/>}
          </>
        )
      } 
    </>
  );
}

export default App;
