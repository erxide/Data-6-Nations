import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function Cate() {

    const [dataIreland, setDataIreland] = useState(null);
    const [dataFrance, setDataFrance] = useState(null);
    const [dataEngland, setDataEngland] = useState(null);
    const [dataWales, setDataWales] = useState(null);
    const [dataItaly, setDataItaly] = useState(null);
    const [dataScotland, setDataScotland] = useState(null);
    const [stats, setStats] = useState([]);
    const [stat, setStat] = useState(null);
    const [loading, setLoading] = useState(true)

    const handleStat = (event) => {
        setStat(event.target.value);
    };

    useEffect(() => {
        const cachedData = localStorage.getItem("List_stats")
        if (cachedData) {
            setStats((JSON.parse(cachedData)).stats)
            setStat(stats[0])
        }
        for (let team of ["France", "Italy", "Scotland", "Wales", "Ireland", "England"]) {
            const cachedData = localStorage.getItem(`${team}Data`)
            if (cachedData){
                switch (team) {
                    case "France":
                        setDataFrance(JSON.parse(cachedData));
                        break;
                    case "Italy":
                        setDataItaly(JSON.parse(cachedData));
                        break
                    case "Scotland":
                        setDataScotland(JSON.parse(cachedData));
                        break;
                    case "Wales":
                        setDataWales(JSON.parse(cachedData));
                        break
                    case "Ireland":
                        setDataIreland(JSON.parse(cachedData));
                        break;
                    case "England":
                        setDataEngland(JSON.parse(cachedData));
                        break
                }
            };
          };
      }, []);

      useEffect (() => {
        setStat(stats[58])
      }, [stats])

      useEffect (() => {
        
        const createTab = (data) => {
            const tab = []
            if (data) {
                const years = Object.keys(data);
                years.forEach(year => {
                    const yearData = data[year];
                    tab.push(yearData?.[stat]);
                });
            } else {
                console.error("Data is null")
            }
            return tab
        };

        const tabFrance = dataFrance ? createTab(dataFrance) : [];
        const tabItaly = dataItaly ? createTab(dataItaly) : [];
        const tabWales = dataWales ? createTab(dataWales): [];
        const tabScotland = dataScotland ? createTab(dataScotland): [];
        const tabIreland = dataIreland ? createTab(dataIreland) : [];
        const tabEngland = dataEngland ? createTab(dataEngland): [];

        

        setLoading(false)
      }, [stat])

    return (
        <>
            <p>skjifd</p>
            { loading ? (
                <p>Loading...</p>
            ) : (
            <select value={stat} onChange={handleStat}>
              {stats.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
              </select> 
            )}      
        </>
    );
}


export default Cate;