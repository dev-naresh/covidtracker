import axios from "axios";

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {

    let changeableUrl = url;
    // console.log(country)
    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);
        
        // const modData = {
        //     confirmed: confirmed,
        //     recovered: recovered,
        //     deaths: deaths,
        //     lastUpdate: lastUpdate,
        // }
        // remove the above modData and add the below return
        // console.log({ confirmed, recovered, deaths, lastUpdate });
        return { confirmed, recovered, deaths, lastUpdate };
        // return modData;
    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
    
        const modData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        
        return modData;
        // console.log(data);
    } catch (error) {
        console.log(error)
    }
}


export const countries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error)
    }
}