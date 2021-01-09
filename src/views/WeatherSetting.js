import React,{ useState } from 'react';
import styled from '@emotion/styled';
import { availableLocations } from '../utils/helpers';
import { ReactComponent as CogIcon } from '../images/weather-icons/images/cog.svg';

const WeatherSettingWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};  
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 15px;
`;

const StyledSelect = styled.select`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.textColor};
  outline: none;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  padding: 7px 10px;
  margin-bottom: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-shadow: none;
  outline: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: 0.3px;
    line-height: 1;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 35px;
    width: 80px;
    border-radius: 5px;
    font-size: 14px;
    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }
    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`;

const Back = styled.button`
  && {
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.textColor};
  }
`;

const Save = styled.button`
  && {
    color: white;
    background-color: #40a9f3;
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

const WeatherSetting = ({handleClickSetting, handleClickBack, setCurrentCity, cityName}) => {
        const [locationName, setLocationName] = useState(cityName); 

        const handleLocationChange = (e) => { 
            setLocationName(e.target.value);
        };

        const handleSave = () => {
            setCurrentCity(locationName);
            handleClickBack();
            localStorage.setItem("locationName", locationName);
        };

    return (
        <WeatherSettingWrapper>
            <Title>Setting</Title>
            <Cog onClick = {handleClickSetting}/>
            <StyledLabel htmlFor="location">Location</StyledLabel>
            <StyledSelect id = 'location' name = 'location' onChange = { handleLocationChange } value = { locationName } >
                {availableLocations.map((location) => (
                    <option value = { location.cityName } key = {location.cityName}> 
                        {location.cityName}
                    </option>
                ))}
            </StyledSelect>
            <ButtonGroup>
                <Back onClick = {handleClickBack}>Back</Back>
                <Save onClick = {handleSave}>Save</Save>
            </ButtonGroup>
        </WeatherSettingWrapper>
    );
};

export default WeatherSetting;