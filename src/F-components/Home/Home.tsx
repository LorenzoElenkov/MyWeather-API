import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import searchIcon from '../../images/search.png';
import homeImage from '../../images/homeImage.png';

import lateAfternoon from '../../images/thunderSummer.jpg';

import minTemp from '../../images/minTemp.png'; 
import maxTemp from '../../images/maxTemp.png';

import sunny from '../../images/sunny.png';
import clear from '../../images/clear.png';
import dayCloud from '../../images/dayCloud.png';
import nightCloud from '../../images/nightCloud.png';
import overcast from '../../images/overcast.png';
import dayFog from '../../images/dayFog.png';
import nightFog from '../../images/nightFog.png';
import rain from '../../images/rain.png';
import snow from '../../images/snow.png';
import thunder from '../../images/thunder.png';

import windSpeed from '../../images/windspeed.png';
import cloudDensity from '../../images/cloudPerc.png';
import eye from '../../images/eye.png';
import ruler from '../../images/ruler.png';
import slash from '../../images/slash.png';
import chanceRain from '../../images/chancerain.png';
import humidity from '../../images/humid.png';
import pressure from '../../images/pressure.png';

import n from '../../images/n.png';
import nnw from '../../images/nnw.png';
import nw from '../../images/nw.png';
import wnw from '../../images/wnw.png';
import w from '../../images/w.png';
import wsw from '../../images/wsw.png';
import sw from '../../images/sw.png';
import s from '../../images/s.png';
import se from '../../images/se.png';
import sse from '../../images/sse.png';
import ese from '../../images/ese.png';
import e from '../../images/e.png';
import ne from '../../images/ne.png';
import nne from '../../images/nne.png';


const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
const weatherIcons = [
  {
    code: [1000],
    dayIcon: sunny,
    nightIcon: clear
  },
  {
    code: [1003, 1006],
    dayIcon: dayCloud,
    nightIcon: nightCloud
  },
  {
    code: [1009],
    dayIcon: overcast,
    nightIcon: overcast
  },
  {
    code: [1030, 1135, 1147],
    dayIcon: dayFog,
    nightIcon: nightFog
  },
  {
    code: [1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1240, 1243, 1249, 1252, 1273, 1276],
    dayIcon: rain,
    nightIcon: rain
  },
  {
    code: [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264, 1279, 1282],
    dayIcon: snow,
    nightIcon: snow
  },
  {
    code: [1087],
    dayIcon: thunder,
    nightIcon: thunder
  },
];

const windDirIcons = [
  ['N', n],
  ['NNW', nnw],
  ['NW', nw],
  ['WNW', wnw],
  ['W', w],
  ['WSW', wsw],
  ['SW', sw],
  ['SSW', sw],
  ['S', s],
  ['SSE', sse],
  ['SE', se],
  ['ESE', ese],
  ['E', e],
  ['ENE', ne],
  ['NE', ne],
  ['NNE', nne], 
];

const Home = () => {
  
  const [searchClicked, setSearchClicked] = useState(false);
  const [fetchedCity, setFetchedCity] = useState<IFetchCityCurrent>({});
  const [weatherDay, setWeatherDay] = useState(0);
  const searchedCity = useRef('');
  
  const [ipLocation, setIpLocation] = useState<TIPLocation>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const hoursArray = [];

  let dateNow: TTimestamp = new Date();
  let timeNow: TTimeNow = dateNow.getHours();

  const onSearchSubmit= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      searchedCity.current = inputRef.current.value;
      inputRef.current.value = '';
      inputRef.current.blur();
    };
    fetchCity();
  };

  const populateIcon: any = (i: number) => {
    for (let k = 0; k < weatherIcons.length; k++) {
      let found = false;
      for (const [key, value] of Object.entries(weatherIcons[k])) {
        if (key === 'code') {
          for (let j = 0; j < value.length; j++) {
            if (value[j] === fetchedCity.forecast?.forecastday[weatherDay].hour[i].condition.code) {
              found = true;
            }
          }
        }
        if (found && key === 'dayIcon' && fetchedCity.forecast?.forecastday[weatherDay].hour[i].is_day === 1) {
          return value;
        } else if (found && key === 'nightIcon' && fetchedCity.forecast?.forecastday[weatherDay].hour[i].is_day === 0) {
          return value;
        }
      }
    }
  };

  
  const fetchIPLoc = async () => {
    const response = await fetch("http://ip-api.com/json/");
    if (response.ok) {
      const res = await response.json();
      setIpLocation([res.city, res.country]);
    } else {
      console.log(response);
    }
  }

  useEffect(() => {
    fetchIPLoc();
  },[]);

  const fetchCity = async () => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f6a9fa4fab904ca9a25100752222604&q=${searchedCity.current}&days=3`);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      setFetchedCity(result);
      setSearchClicked(true);
    } else {
      console.log(response);
    }
  };


  const onPrevDayHandler = () => {
    if (weatherDay !== 0) {
      setWeatherDay(weatherDay - 1);
    }
  };
  const onNextDayHandler = () => {
    if (weatherDay !== 2) {
      setWeatherDay(weatherDay + 1);
    }
  };


  if (searchClicked) {
    for (let i = 0; i < 24; i++) {
      if (i === 0) {
        hoursArray.push(
          <div key={i} className={i === timeNow && weatherDay === 0 ? `0${i} today` : `0${i}`}>
            {i === timeNow && weatherDay === 0 ? <span className='hour'>NOW</span> : <span className='hour'>12 <span>AM</span></span>}
            <img className='hourIcon' alt='' src={populateIcon(i)}/>
            <span className='temp'>{Math.round(fetchedCity.forecast?.forecastday[weatherDay].hour[i].temp_c)}<span>&#8451;</span></span>
          </div>
        );
      } else if (i < 10) {
        hoursArray.push(
          <div key={i} className={i === timeNow && weatherDay === 0 ? `0${i} today` : `0${i}`}>
            {i === timeNow && weatherDay === 0 ? <span className='hour'>NOW</span> : <span className='hour'>0{i} <span>AM</span></span>}
            <img className='hourIcon' alt='' src={populateIcon(i)}/>
            <span className='temp'>{Math.round(fetchedCity.forecast?.forecastday[weatherDay].hour[i].temp_c)}<span>&#8451;</span></span>
          </div>
        );
      } else if (i >= 10 && i < 12) {
        hoursArray.push(
          <div key={i} className={i === timeNow && weatherDay === 0 ? `${i} today` : `${i}`}>
            {i === timeNow && weatherDay === 0 ? <span className='hour'>NOW</span> : <span className='hour'>{i} <span>AM</span></span>}
            <img className='hourIcon' alt='' src={populateIcon(i)}/>
            <span className='temp'>{Math.round(fetchedCity.forecast?.forecastday[weatherDay].hour[i].temp_c)}<span>&#8451;</span></span>
          </div>
        );
      } else if (i === 12) {
        hoursArray.push(
          <div key={i} className={i === timeNow && weatherDay === 0 ? `${i} today` : `${i}`}>
            {i === timeNow && weatherDay === 0 ? <span className='hour'>NOW</span> : <span className='hour'>{i} <span>PM</span></span>}
            <img className='hourIcon' alt='' src={populateIcon(i)}/>
            <span className='temp'>{Math.round(fetchedCity.forecast?.forecastday[weatherDay].hour[i].temp_c)}<span>&#8451;</span></span>
          </div>
        );
      } else if (i > 12 && i < 22) {
        hoursArray.push(
          <div key={i} className={i === timeNow && weatherDay === 0 ? `${i} today` : `${i}`}>
            {i === timeNow && weatherDay === 0 ? <span className='hour'>NOW</span> : <span className='hour'>0{i-12} <span>PM</span></span>}
            <img className='hourIcon' alt='' src={populateIcon(i)}/>
            <span className='temp'>{Math.round(fetchedCity.forecast?.forecastday[weatherDay].hour[i].temp_c)}<span>&#8451;</span></span>
          </div>
        );
      } else if (i >= 22) {
        hoursArray.push(
          <div key={i} className={i === timeNow && weatherDay === 0 ? `${i} today` : `${i}`}>
            {i === timeNow && weatherDay === 0 ? <span className='hour'>NOW</span> : <span className='hour'>{i-12} <span>PM</span></span>}
            <img className='hourIcon' alt='' src={populateIcon(i)}/>
            <span className='temp'>{Math.round(fetchedCity.forecast?.forecastday[weatherDay].hour[i].temp_c)}<span>&#8451;</span></span>
          </div>
        );
      }
    };
  };

  let windDir;

  if (searchClicked) {
    for (let i = 0; i < windDirIcons.length; i++) {
      if (windDirIcons[i][0] === fetchedCity.current?.wind_dir) {
        windDir = windDirIcons[i][1];
      }
    }
  }


  return (
    <StyledContainer clicked={searchClicked}>
      <StyledHome clicked={searchClicked}>
        <img src={homeImage} alt='' className='homeImage'/>
        <span className='title'>Welcome</span>
        <span className='subtitle'>MyWeather helps you find about the current weather at your place</span>
        <form className='searchBar' onSubmit={onSearchSubmit}>
          <input type='text' placeholder='City' ref={inputRef}/>
        </form>
        <span className='currentLoc'>{ipLocation ? `You are currently located in ${ipLocation[0]}, ${ipLocation[1].toUpperCase()}` : 'Unable to find your location'}</span>
      </StyledHome>
      <StyledSearch clicked={searchClicked} day={weatherDay}>
        <img src={lateAfternoon} alt='' className='searchImage'/>
        <span className='searchCityName'>{searchedCity.current}</span>
        {Object.keys(fetchedCity).length !== 0 && <span className='searchCityTempFeelsLike'>Feels like <span>{Math.round(fetchedCity.current?.feelslike_c)}</span><span>&#8451;</span></span>}
        <span className='searchCityTemp'>{Math.round(fetchedCity.current?.temp_c)}<span>&#8451;</span></span>
        <span className='searchCityDesc'>{fetchedCity.current?.condition.text}</span>
        <div className='searchResultContainer'>
          <div className='searchDayContainer'>
            <button onClick={onPrevDayHandler}>{'<'}</button>
            <span>{weatherDay === 0 ? 'Today' : weatherDay > 0 && weekday[dateNow.getDay() - 1 + weatherDay]}</span>
            <button onClick={onNextDayHandler}>{'>'}</button>
          </div>
          <div className='searchDayHours'>
            {hoursArray}
            <div/>
          </div>
          <div className='searchOverview'>
            <div className='minTemp'>
              <span className='title'>Minimum &#8451;</span>
              <span className='data'>{fetchedCity.forecast?.forecastday[0].day.mintemp_c}<span>&#8451;</span></span>
              <img src={minTemp} alt=''/>
            </div>
            <div className='maxTemp'>
              <span className='title'>Maximum &#8451;</span>
              <span className='data'>{fetchedCity.forecast?.forecastday[0].day.maxtemp_c}<span>&#8451;</span></span>
              <img src={maxTemp} alt=''/>
            </div>
            <div className='windSpeed'>
              <span className='title'>Wind speed</span>
              <span className='data'>{fetchedCity.current?.wind_kph}<span>km/h</span></span>
              <img src={windSpeed} alt=''/>
            </div>
            <div className='windDir'>
              <span className='title'>Wind direction</span>
              <span className='data'>{fetchedCity.current?.wind_dir}<span></span></span>
              <img src={windDir} alt=''/>
            </div>
            <div className='visibility'>
              <span className='title'>Visibility</span>
              <span className='data'>{fetchedCity.current?.vis_km}<span>km</span></span>
              <img src={eye} alt=''/>
              <img src={ruler} alt=''/>
            </div>
            <div className='cloudness'>
              <span className='title'>Cloud density</span>
              <span className='data'>{fetchedCity.current?.cloud}<span>%</span></span>
              <img src={cloudDensity} alt=''/>
            </div>
            <div className='dayTime'>
              <span className='title'>Daytime</span>
              <span className='data'>{fetchedCity.current?.is_day ? 'Day' : 'Night'}</span>
              <img src={sunny} alt=''/>
              <img src={clear} alt=''/>
              <img src={slash} alt=''/>
            </div>
            <div className='precmm'>
              <span className='title'>Chance of rain</span>
              <span className='data'>{Math.round(fetchedCity.forecast?.forecastday[0].day.daily_chance_of_rain)}<span>%</span></span>
              <img src={chanceRain} alt=''/>
            </div>
            <div className='humidity'>
              <span className='title'>Humidity</span>
              <span className='data'>{fetchedCity.current?.humidity}<span>%</span></span>
              <img src={humidity} alt=''/>
            </div>
            <div className='pressure'>
              <span className='title'>Pressure</span>
              <span className='data'>{fetchedCity.current?.pressure_mb}<span>mb</span></span>
              <img src={pressure} alt=''/>
            </div>
          </div>
        </div>
      </StyledSearch>
    </StyledContainer>
  )
}

export default Home;

type TTimestamp = Date | any;
type TTimeNow = number | any;
type TIPLocation = string[] | null;

interface IStyledHome {
  clicked: boolean;
  day?: number;
}

interface IFetchCityCurrent {
  [results: string]: any;
}


const StyledContainer = styled.div<IStyledHome>`
  height: calc(92.5vh - 1px);
  overflow: hidden;
  width: 100%;
  grid-column: 1/4;
  position: relative;
`;

const StyledSearch = styled.div<IStyledHome>`
  position: absolute;
  top: 0;
  left: ${props => props.clicked ? '0' : '-110vw'};
  transition: left 0.5s ease-in-out;
  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: 12% repeat(4, 22%);
  width: 100vw;
  height: 100%;

  .searchImage {
    grid-column: 1/4;
    grid-row: 1/1;
    width: 100%;
  }

  .searchCityName {
    margin-top: 10px;
    grid-column: 1/4;
    grid-row: 1/1;
    align-self: center;
    font-size: 2rem;
    font-family: 'Secondary';
    padding-right: 10px;
    justify-self: end;
    background: linear-gradient(to bottom, white 30%, transparent);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  .searchCityTemp {
    grid-column: 1/4;
    grid-row: 2/2;
    font-size: 5rem;
    font-family: Verdana;
    padding-left: 10px;
    color: white;
    span {
      font-size: 1.5rem;
      vertical-align: top;
    }
  }

  .searchCityTempFeelsLike {
    grid-column: 1/4;
    grid-row: 1/1;
    font-size: 0.7rem;
    font-family: Verdana;
    padding-left: 15px;
    align-self: end;
    color: white;

    span:nth-child(1) {
      font-size: 1rem;
    }
    span:nth-child(2) {
      font-size: 0.6rem;
      vertical-align: top;
    }
  }

  .searchCityDesc {
    grid-column: 1/4;
    padding-left: 15px;
    grid-row: 2/2;
    font-size: 1rem;
    margin-top: 70px;
    align-self: center;
    font-family: 'Secondary';
    color: white;
  }

  .searchResultContainer {
    background: linear-gradient(to bottom, transparent, white 25%);
    grid-column: 1/4;
    grid-row: 3/6;
    display: grid;
    grid-template-columns: 20px 1fr 20px;
    grid-template-rows: 15% 5% 25% 45% 10%;
    .searchDayContainer {
      grid-column: 1/4;
      grid-row: 2/2;
      justify-self: center;
      font-family: 'Secondary';
      font-size: 1rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
      button {
        background: none;
        border: none;
        height: max-content;
        width: 30%;
        font-size: 1rem;
        font-family: 'Main';
      }
      button:nth-child(1) {
        opacity: ${props => props.day === 0 ? '0' : '1'};
      }
      button:nth-child(3) {
        opacity: ${props => props.day === 2 ? '0' : '1'};
      }
    }
    .searchDayHours {
      grid-column: 1/4;
      grid-row: 3/3;
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 2px 4px;
      border-radius: 15px;
      font-family: 'Secondary';
      display: grid;
      grid-template-columns: repeat(auto-fill, 22%);
      grid-auto-flow: column;
      grid-auto-columns: 22%;
      width: 100%;
      overflow: auto;
      -ms-overflow-style: none;
      scrollbar-width: none;
      & > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 3px 0;
      }

      & > div > img {
        width: 45%;
        height: 50%;
      }

      & > div:nth-child(2n) {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
      }

      & > div:last-child {
        width: 20px;
      }

      & > div > span {
        font-family: Verdana;
      }

      & > div > span > span {
        font-family: 'Secondary';
      }

      & > div > span:nth-child(3) > span {
        vertical-align: top;
        font-size: 0.4rem;
      }

      & > div.today {
        background: rgba(255, 145, 0, 0.3);
        border-radius: 10px;
      }
    }

    .searchDayHours::-webkit-scrollbar {
      display: none;
    }

    .searchOverview::-webkit-scrollbar {
      display: none;
    }

    .searchOverview {
      grid-row: 4/6;
      grid-column: 2/3;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      width: 100%;
      overflow: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      padding-bottom: 5px;
      & > div {
        height: 11vh;
        border: 2px solid rgba(0, 0, 0, 0.05);
        border-radius: 15px;
        padding: 5px 10px;
        font-family: 'Secondary';
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 1fr 1fr;
        column-gap: 5px;
      }
      & > div > img {
        grid-column: 1/1;
        grid-row: 1/3;
        width: 100%;
        align-self: center;
      }

      & > .visibility > img {
        align-self: start;
      }

      & > div > img:nth-child(4) {
        align-self: end;
      }

      & > div > .title {
        grid-column: 2/2;
        grid-row: 1/3;
        justify-self: center;
        font-size: 0.6rem;
      }

      & > div > .data {
        grid-column: 2/2;
        grid-row: 1/3;
        justify-self: center;
        align-self: center;
        font-size: 1.5rem;
        font-family: Verdana;
      }

      & > div > .data > span {
        font-size: 0.6rem;
      }

      & > .dayTime > img:nth-child(3) {
        align-self: start;
        width: 75%;
      }
      & > .dayTime > img:nth-child(4) {
        align-self: end;
        width: 75%;
        justify-self: end;
      }
      & > .dayTime > img:nth-child(5) {
        align-self: center;
      }
    }

  }
`;

const StyledHome = styled.div<IStyledHome>`
  position: absolute;
  top: 0;
  left: ${props => props.clicked ? '110vw' : '0'};
  transition: left 0.5s ease-in-out;
  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: repeat(5, max-content);
  width: 100vw;

  .homeImage {
    margin-top: 30px;
    height: 200px;
    grid-row: 1/1;
    grid-column: 1/4;
    justify-self: center;
  }
  .title {
    margin-top: 20px;
    grid-row: 2/2;
    grid-column: 1/4;
    font-family: 'Secondary';
    font-size: 1.8rem;
    justify-self: center;

  }
  .subtitle {
    grid-row: 3/3;
    grid-column: 1/4;
    padding: 0 30px;
    font-family: 'Secondary';
    font-size: 0.8rem;
    text-align: center;
    color: gray;
  }
  .searchBar {
    margin-top: 30px;
    grid-row: 4/4;
    grid-column: 2/2;
    position: relative;
    justify-self: center;

    &::before {
      content: '';
      position: absolute;
      top: 3px;
      left: 2px;
      width: 30px;
      height: 28px;
      background: url(${searchIcon});
      background-repeat: no-repeat;
      background-size: 60%;
      background-position: 50% 60%;
    }


    input {
      font-size: 1.2rem;
      font-family: 'Secondary';
      padding: 0 0 0 30px;
      outline: none;
      border-radius: 15px;
      border: 1px solid gray;
      padding-top: 5px;
      padding-bottom: 1px;
    }
  }

  .currentLoc {
    grid-row: 5/5;
    grid-column: 2/3;
    font-size: 0.8rem;
    font-family: 'Secondary';
    justify-self: center;
    margin-top: 20px;
  }

`;

