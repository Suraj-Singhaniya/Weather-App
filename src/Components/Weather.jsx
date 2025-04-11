import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
//import drizzle_icon from '../assets/drizzle.png'
//import rain_icon from '../assets/rain.png'
//import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'




const Weather = () => {

  console.log(import.meta.env.VITE_APP_ID)
  const [city ,setCity]=useState("london")
  const [data,setData]=useState({})
  const [loading,setLoding]=useState(true)
  console.log(data)
  const search = async (city) => {
    setLoding(true)
    try {
      console.log("searching...");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      // console.log(data);
      setData(data)
      setLoding(false)
    } catch (error) {
      console.log("Failed to fetch weather data:", error);
    }
  };
  
  useEffect(()=>{
    search(city)
  },[])
  return (
  <>
     {
    loading?<div>loading............</div>: <div className='weather'>
    <div className="search-bar">
      <input onChange={(e)=>setCity(e.target.value)} type="next" placeholder='Search'/>
      <img onClick={()=>search(city)} src={search_icon} alt=""/>
    </div>
    <img src={clear_icon} alt="" className='weather-icon'/>
    <p className='temperature'>{data.main.temp}°C</p>
    <p className='location'>{data.name}</p>
    <div className='weather-data'>
      <div className='col'>
          <img src={humidity_icon}alt=""/>
          <div>
            <p> {data.main.humidity}%</p>
            <span>humidity</span>
          </div> 
      </div>
      <div className='col'>
          <img src={wind_icon}alt=""/>
          <div>
            <p>{data.wind.speed}</p>
            <span>Wind Speed</span>
          </div> 
      </div>
    </div>     
  </div>
   }
  
  </>)
}


export default Weather
