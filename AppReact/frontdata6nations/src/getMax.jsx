import React from 'react';

export const getMax = (stat) => {
    
    const list = []

    for (let team of ["France", "Italy", "Scotland", "Wales", "Ireland", "England"]) {
        const getcachedData = () => {
            const cachedData = localStorage.getItem(`${team}Data`) 
            if (cachedData) {
                return JSON.parse(cachedData)
            }
        }

        for (let year of Array.from({length: 24}, (_, i) => 2023 - i)) {
            if (getcachedData()?.[year]?.[stat]) {
                list.push(getcachedData()?.[year]?.[stat])
            }
        }
    }
    return Math.max(...list)

};

const Max = () => {
    return null;
}

export default Max;