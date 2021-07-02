import './App.css';
import React, { useState } from 'react';
import {FaSearch} from 'react-icons/fa';
const api = {
  key: "95f3c49930ece51748d1d714133169a5",
  base: "https://api.openweathermap.org/data/2.5/",
  img: "http://openweathermap.org/img/wn"
}
function App() {

  const dateBuilder = (d) => {
    let months = ["Januari","Febuari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    let days = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"]

    let day = days[d.getDay()-1];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    return `${day}, ${date} ${month} ${year} ${strTime}`
  }


  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [mainWeather, setMainWeather] = useState('');

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        setWeather(result);
        setQuery('');
        setMainWeather(result.weather[0].main);
      });
    }
  }
  return (
    <div className={
      (mainWeather !== '')? ('App-'+mainWeather): 'App'
    }>
      
      <div className="container">
        <div className="boxContainer3">
        <h1>Simple Weather App with React</h1>
        </div>
        <div className="boxContainer">
          <table className="elementsContainer">
            <tbody><tr>
                <td>
                  <input type="text" placeholder="Search City Name" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} className="search" />
                </td>
                <td>
                <FaSearch />
                </td>
              </tr>
            </tbody></table>
        </div>
        { (typeof weather.main != "undefined") ? (
        <div className="boxContainer2">
          <div className="flex2">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          {/* <img src={`https://www.countryflags.io/${weather.sys.country}/flat/64.png`} alt=""/> */}
          </div>

          <div className="dt">{dateBuilder(new Date(weather.dt*1000+(weather.timezone*1000)))}</div>
          <div className="flex">
            <img src={`${api.img}/${weather.weather[0].icon}@2x.png`} alt="" className="icon" />
            <div className="temp">{Math.floor(weather.main.temp-273.15)}°C</div>
          </div>
          <div className="description">{weather.weather[0].description}</div>
          <div className="humidity">Humidity: {Math.round(weather.main.humidity)}%</div>
          <div className="wind">Wind: {weather.wind.speed} Km/Hour</div>
        </div>
        ) : ('')}
      </div>
    </div>
  );
}

export default App;
