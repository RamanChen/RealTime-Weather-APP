import { useState,useEffect, useCallback } from 'react';
//自訂一個hook


//藉由fetch回傳promise的特性，回傳更新的數據，方便後續同步更新
const fetchCurrentWeather = ({ authorizationKey, locationName}) => {
    
    return fetch (`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&locationName=${locationName}
    `)
      .then((response) => response.json())
      .then((data) => {
        const locationData = data.records.location[0];
        const weatherElement = locationData.weatherElement.reduce(
          (neededElements, item) => {
            if (['WDSD','TEMP'].includes(item.elementName)){
              neededElements[item.elementName] = item.elementValue;
            }
            return neededElements;
          },{}
        );
  
        return{
          observationTime:locationData.time.obsTime,
          locationName: locationData.locationName,
          temperature: Math.round(weatherElement.TEMP*10)/10,
          windSpeed: weatherElement.WDSD,
          isLoading: false,
        };
      });
    };
  
  
    const fetchWeatherForecast = ({ authorizationKey, cityName }) =>{
      return fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`
      )
        .then((response) => response.json())
        .then((data) => {
          const locationData = data.records.location[0];
          
          const weatherElements = locationData.weatherElement.reduce(
            (neededElements,item) => {
              if(['Wx','PoP','CI'].includes(item.elementName)){
                neededElements[item.elementName] = item.time[0].parameter;
              }
            return neededElements ; 
            },{}
          );
        
          return {
            description:　weatherElements.Wx.parameterName,
            weatherCode: weatherElements.Wx.parameterValue,
            rainPossibility: weatherElements.PoP.parameterName,
            comfortability: weatherElements.CI.parameterName,
          };
        });
    };
const useWeatherAPI =  ({ locationName, cityName, authorizationKey }) => {
    const [weatherElement, setweatherElement] = useState({
        locationName:'台北市',
        description:'多雲時晴',
        windSpeed:1.1,
        temperature:22.9,
        rainPossibility:48.3,
        observationTime:'2010-12-12 22:10:00',
        comfortability: '舒適至悶熱',
        weatherCode: 0,
        isLoading: true,
      });
    
      const fetchData = useCallback ( async () => {
        setweatherElement((prevState) =>({...prevState, isLoading :true}));  //讀取api前 先將 isLoading設為true 
        const [currentWeather, weatherForecast] = await Promise.all([fetchCurrentWeather({ authorizationKey, locationName}),fetchWeatherForecast({ authorizationKey, cityName}),]);
        setweatherElement({...currentWeather, ...weatherForecast, isLoading: false,}); //讀取api後 將 isLoading設為false   並將更新後的氣象數據利用setweatherElement更新 
      },[authorizationKey, locationName, cityName]);

      useEffect(()=>{
        fetchData();
      },[fetchData]);

      return [weatherElement, fetchData];
};

export default useWeatherAPI;