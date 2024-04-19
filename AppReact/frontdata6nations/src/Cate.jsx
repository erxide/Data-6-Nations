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
        localStorage.setItem('selectedStat', event.target.value)

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
        setStat(localStorage.getItem("selectedStat") || stats[33])
      }, [stats])

      useEffect (() => {
        
        const createTab = (data) => {
            let tab = []
            if (data) {
                const years = Object.keys(data);
                years.forEach(year => {
                    const yearData = data[year];
                    tab.push(yearData?.[stat]);
                });
            } else {
                console.error("Data is null")
            }
            tab = veriftab(tab)
            return tab
        };

        const veriftab = (data) => {
            for (let i of data) {
                if (i === undefined) {
                    data[data.indexOf(i)] = 0;
                }
            }

            return data
        };

        const tabFrance = dataFrance ? createTab(dataFrance) : [];
        const tabItaly = dataItaly ? createTab(dataItaly) : [];
        const tabWales = dataWales ? createTab(dataWales): [];
        const tabScotland = dataScotland ? createTab(dataScotland): [];
        const tabIreland = dataIreland ? createTab(dataIreland) : [];
        const tabEngland = dataEngland ? createTab(dataEngland): [];

        let myChart = null;

        const ctx = document.getElementById('myChart');

        if (dataFrance) {
            if (ctx) {
                myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: Object.keys(dataFrance),
                        datasets : [
                            {
                              label:'Ireland',
                              data: tabIreland,
                              borderColor: 'rgba(75, 192, 192, 1)',
                              backgroundColor : 'rgba(75, 192, 192, 1)',
                              borderWidth: 3
                            },
                            {
                              label: 'France',
                              data: tabFrance,
                              backgroundColor : 'rgba(0, 112, 192, 1)',
                              borderColor: 'rgba(0, 112, 192, 1)',
                              borderWidth: 3
                            },
                            {
                              label: 'England',
                              data: tabEngland,
                              backgroundColor : 'rgba(0, 0, 0, 1)',
                              borderColor: 'rgba(0, 0, 0, 1)',
                              borderWidth: 3
                            },
                            {
                              label: 'Wales',
                              data: tabWales,
                              backgroundColor : 'rgba(255, 0, 0, 1)',
                              borderColor: 'rgba(255, 0, 0, 1)',
                              borderWidth: 3
                            },
                            {
                              label: 'Italy',
                              data: tabItaly,
                              backgroundColor : 'rgba(135, 206, 250, 1)',
                              borderColor: 'rgba(135, 206, 250, 1)',
                              borderWidth: 3
                            },
                            {
                              label: 'Scotland',
                              data: tabScotland,
                              backgroundColor : 'rgba(0, 0, 139, 1)',
                              borderColor: 'rgba(0, 0, 139, 1)',
                              borderWidth: 3
                            }
                          ],
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        },
                    },
                });
            };
        };
        setLoading(false)
        return () => {
            if (myChart) {
              myChart.destroy();
            }
        };
      }, [stat])

      return (
        <div>
            { loading ? (
                <p>Loading...</p>
            ) : (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '85vh' }}>
                <h1>{stat}</h1>
                <canvas id="myChart"></canvas>
                <select value={stat} onChange={handleStat}>
                {stats.map(s => (
                    <option key={s} value={s}>{s}</option>
                ))}
                </select> 
            </div>
            )}      
        </div>
    );
    
    
}


export default Cate;