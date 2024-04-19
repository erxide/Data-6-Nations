import React, { useState, useEffect } from 'react';
import { getMax } from './getMax';
import Chart from 'chart.js/auto';

function Radar() {

    let chartRef = React.createRef();
    const [dataIreland, setDataIreland] = useState(null);
    const [dataFrance, setDataFrance] = useState(null);
    const [dataEngland, setDataEngland] = useState(null);
    const [dataWales, setDataWales] = useState(null);
    const [dataItaly, setDataItaly] = useState(null);
    const [dataScotland, setDataScotland] = useState(null);
    const years = (Array.from({length: 24}, (_, i) => 2023 - i))
    const [year, setYear] = useState(localStorage.getItem('selectedYear') || years[0])
    const teams = ["France", "Italy", "Scotland", "Wales", "Ireland", "England"]
    const listScrumStats = ["Scrum-Lost", "Scrum-Reset-Retained", "Scrums Lost %", "Scrums Lost from Opp feed", "Scrums Won %", "Scrums Won from Opp feed", "Scrum-Won"];

    const handleYear = (event) => {
        setYear(event.target.value);
        localStorage.setItem('selectedYear', event.target.value);
    };

    useEffect(() => {
        for (let team of teams) {
            const cachedData = localStorage.getItem(`${team}Data`)
            if (cachedData){
                const jsonData = JSON.parse(cachedData)
                switch (team) {
                    case "France":
                        setDataFrance(jsonData[year]);
                        break;
                    case "Italy":
                        setDataItaly(jsonData[year]);
                        break
                    case "Scotland":
                        setDataScotland(jsonData[year]);
                        break;
                    case "Wales":
                        setDataWales(jsonData[year]);
                        break
                    case "Ireland":
                        setDataIreland(jsonData[year]);
                        break;
                    case "England":
                        setDataEngland(jsonData[year]);
                        break
                }
            };
        }

    }, [year]);

    useEffect(() => {
        const verifTab = (data) => {
            for (let i of data) {
                if (i === undefined) {
                    data[data.indexOf(i)] = 0
                }
            }
            return data
        };

        const createTab = (data, stats) => {
            let tab = [];
            for (let stat of stats) {
                tab.push(data?.[stat])
            }
            tab = verifTab(tab)
            return tab
        };

        const scaleData = (data, stats) => {
            let tab = [];
            for (let stat of stats) {
                if (data?.[stat] != 0)
                    tab.push(isNaN(((data?.[stat] * 100) / getMax(stat))) ? data?.[stat] : ((data?.[stat] * 100) / getMax(stat)))
            }
            tab = verifTab(tab)
            return tab
        } 



        const tabFrance = dataFrance ? createTab(dataFrance, listScrumStats) : [];
        const scaletabFrance = dataFrance ? scaleData(dataFrance, listScrumStats) : [];
        
        const tabItaly = dataItaly ? createTab(dataItaly, listScrumStats) : [];
        const scaletabItaly = dataItaly ? scaleData(dataItaly, listScrumStats) : [];
        
        const tabWales = dataWales ? createTab(dataWales, listScrumStats): [];
        const scaletabWales = dataWales ? scaleData(dataWales, listScrumStats) : [];

        const tabScotland = dataScotland ? createTab(dataScotland, listScrumStats): [];
        const scaletabScotland = dataScotland ? scaleData(dataScotland, listScrumStats) : [];

        const tabIreland = dataIreland ? createTab(dataIreland, listScrumStats) : [];
        const scaletabIreland = dataIreland ? scaleData(dataIreland, listScrumStats) : [];
        
        const tabEngland = dataEngland ? createTab(dataEngland, listScrumStats): [];
        const scaletabEngland = dataEngland ? scaleData(dataEngland, listScrumStats) : [];
        

        const ctx = chartRef.current.getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: listScrumStats,
                datasets : [
                    {
                        label:"France",
                        data: scaletabFrance,
                        borderColor: `rgba(0, 112, 192, 1)`,
                        backgroundColor: `rgba(0, 112, 192, 0.15)`
                    },
                    {
                        label:'Ireland',
                        data: scaletabIreland,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor : 'rgba(75, 192, 192, 0.15)',
                        borderWidth: 3
                    },
                    {
                      label: 'England',
                      data: scaletabEngland,
                      backgroundColor : 'rgba(0, 0, 0, 0.15)',
                      borderColor: 'rgba(0, 0, 0, 1)',
                      borderWidth: 3
                    },
                    {
                      label: 'Wales',
                      data: scaletabWales,
                      backgroundColor : 'rgba(255, 0, 0, 0.15)',
                      borderColor: 'rgba(255, 0, 0, 1)',
                      borderWidth: 3
                    },
                    {
                      label: 'Italy',
                      data: scaletabItaly,
                      backgroundColor : 'rgba(135, 206, 250, 0.15)',
                      borderColor: 'rgba(135, 206, 250, 1)',
                      borderWidth: 3
                    },
                    {
                      label: 'Scotland',
                      data: dataScotland,
                      backgroundColor : 'rgba(0, 0, 139, 0.15)',
                      borderColor: 'rgba(0, 0, 139, 1)',
                      borderWidth: 3
                    },
                ]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        suggestedMax: 100,
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const teamData = context.dataset.label === "France" ? tabFrance : 
                                                context.dataset.label === "Italy" ? tabItaly :
                                                context.dataset.label === "Scotland" ? tabScotland :
                                                context.dataset.label === "Wales" ? tabWales :
                                                context.dataset.label === "Ireland" ? tabIreland :
                                                context.dataset.label === "England" ? tabEngland : null;
                                const originalValue = teamData ? teamData[context.dataIndex] : null;
                                return `(original value) ${originalValue}`;
                            }
                            }
                        }
                    }
                }
            })
        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [dataEngland, dataFrance, dataIreland, dataItaly, dataWales, dataScotland]);

    return <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <canvas ref={chartRef} />
            <select value={year} onChange={handleYear}>
                {years.map(s => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
        </div>
    </div>
};


export default Radar;