import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

import WeatherCard from './views/WeatherCard';
import  useWeatherAPI  from './hook/useWeatherAPI'
import WeatherSetting from './views/WeatherSetting';
import { findLocation} from './utils/helpers';


const theme = {
  light:{
    backgroundColor:'#ededed',
    foregroundColor:'#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor:'#212121',
    temperatureColor:'#757575',
    textColor:'#828282',
  },
  dark:{
    backgroundColor:'#1f2022',
    foregroundColor:'#121416',
    boxShadow:'0 1px 4px 0 rgba(12,12,13,0.2), 0 0 0 1px rgba(0,0,0,0.15)',
    titleColor:'#f9f9f9',
    temperatureColor:'#dddddd',
    textColor:'#cccccc',
  },
};

const Container =  styled.div `
  background-color:${props=> props.theme.backgroundColor};
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;

//不會改變的變數 用全大寫命名
const AUTHORIZATION_KEY = 'CWB-F016ACFA-B57F-40E6-8A62-B8B426D89202';

const  App = () => {
  
  // change the theme
  let [ currentTheme, setCurrentTheme ] = useState('light');
    const click = () => setCurrentTheme(currentTheme === "light" ? currentTheme='dark': currentTheme='light') ;
  
  //切換頁面
  let [currentPage, setCurrentPage] = useState('weatherCard');

  const handleClickSetting = () =>{
    setCurrentPage(currentPage == 'weatherCard' ?   currentPage = 'weatherSetting': currentPage = 'weatherCard');
  };

  const handleClickBack = () => {
    setCurrentPage(currentPage = 'weatherCard');
  };


  const storageCity = localStorage.getItem('locationName') || "臺北市" ; //localStorage 保存瀏覽器暫存資料, getItem 取出，若為null 則default 台北
  let [currentCity,setCurrentCity] = useState(storageCity);
  const currentLocation = findLocation(currentCity);
  const {cityName, locationName} = currentLocation; //解構賦值

  const [weatherElement, fetchData] = useWeatherAPI ({
    locationName: locationName,
    cityName: cityName,
    authorizationKey: AUTHORIZATION_KEY
  });

  return(
    <ThemeProvider theme = {theme[currentTheme]}>
      <Container>
        {/* 判斷頁面 */}
        {currentPage =='weatherCard' && <WeatherCard weatherElement = {weatherElement} fetchData = { fetchData } click = { click } handleClickSetting = {handleClickSetting} cityName = {cityName}  />}
        {currentPage =='weatherSetting' &&　　<WeatherSetting  handleClickSetting = {handleClickSetting} handleClickBack = {handleClickBack} setCurrentCity = {setCurrentCity} cityName = {cityName}/>　}
      </Container>
    </ThemeProvider>
  );
};

export default App;
