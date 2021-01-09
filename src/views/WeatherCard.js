
import React, { useState,useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import WeatherIcon from '../components/WeatherIcon';
import {ReactComponent as DayCloudyIcon} from '../images/weather-icons/images/day-cloudy.svg';
import {ReactComponent as RainIcon} from '../images/weather-icons/images/rain.svg';
import {ReactComponent as AirFlowIcon} from '../images/weather-icons/images/airFlow.svg';
import {ReactComponent as RefreshIcon} from '../images/weather-icons/images/refresh.svg';
import {ReactComponent as LoadingIcon} from '../images/weather-icons/images/loading.svg';
import { ReactComponent as CogIcon } from '../images/weather-icons/images/cog.svg';



const WeatherCardWrapper = styled.div`
  position:relative;
  min-width:360px;   
  box-shadow:${props=> props.theme.boxShadow};
  background-color:${props=> props.theme.foregroundColor};
  box-size: border-box;
  padding:30px 15px;
`;

const Location = styled.div`
  color: ${props => props.theme.titleColor};
  font-size:28px;
  margin-bottom:20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${props=> props.theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: ${props=> props.theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${props=> props.theme.textColor};
  margin-bottom: 20px;

  svg{
    width:25px;
    height:auto;
    margin-right:30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${props=> props.theme.textColor};
  svg {
    width:25px;
    height:auto;
    margin-right:30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${props=> props.theme.textColor};
  svg {
    margin-left:10px;
    width:15px;
    height:15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration :${({isLoading}) => (isLoading ? "1.5s" : "0s")};
  }
  @keyframes rotate{
    from {
      transform: rotate(360deg);
    }
    to{
      transform: rotate(0edg);
    }
  }
`;

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px; 
  width: 15px;
  height: 15px;
  cursor: pointer;
`

const ThemeSwitch = styled.button`
  && {
    margin-top: 50px;
    color: ${({ theme }) => theme.temperatureColor};
    border-color: ${({ theme }) => theme.temperatureColor};
    background-color:${({ theme }) => theme.backgroundColor};
    outline:none;
  }
`;


const WeatherCard = ({weatherElement, fetchData, click, handleClickSetting, cityName}) => {
  
  //判斷白天夜晚
  var Today = new Date();
  let hour = Today.getHours();
  let time = "night";
  hour > 6 && hour < 18 ? time = "day" :  time = "night";
    
    return(
        <WeatherCardWrapper >
          <Cog onClick = {handleClickSetting}/>
          <Location color= "dark">{cityName} {hour+"點 "}</Location>
          <Description>{weatherElement.description} {''} {weatherElement.comfortability}</Description>
          <CurrentWeather>
            <Temperature>
            {weatherElement.temperature} <Celsius>.C</Celsius>
            </Temperature>
            <WeatherIcon weatherCode = {weatherElement.weatherCode} moment = {time} />
          </CurrentWeather>
          <AirFlow>
            <AirFlowIcon/> {weatherElement.windSpeed} m/h
          </AirFlow>
          <Rain> 
            <RainIcon /> {weatherElement.rainPossibility} %
          </Rain>
          <Refresh onClick ={()=>{fetchData();}} isLoading = {weatherElement.isLoading}> 
            {new Intl.DateTimeFormat('zh-TW',{
              hour:'numeric',
              minute:'numeric'
            }).format(new Date(weatherElement.observationTime))}
            {' '}  
            {weatherElement.isLoading ?<LoadingIcon /> : <RefreshIcon />}
          </Refresh>
          <ThemeSwitch  onClick = {click} style = {{marginTop:'20px'}}> Theme Switch </ThemeSwitch>
        </WeatherCardWrapper>
    );
}

export default WeatherCard ;
