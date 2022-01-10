import React from "react";
import "./styles.css";
import moment from "moment";
import { Button } from "semantic-ui-react";

function Weather({ weatherData, setCity }) {
  let textInput = React.createRef();

  function handleClick() {
    setCity(textInput.current.value);
  }

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="searchbar">
        <div className="ui input">
          <input type="text" placeholder="Search City" ref={textInput}></input>
        </div>
        <button className="ui icon button" onClick={handleClick}>
          <i className="search icon"></i>
        </button>
      </div>
      <div className="main">
        <div className="top">
          <p className="header">{weatherData.name}</p>
          <Button
            className="button"
            inverted
            color="blue"
            circular
            icon="refresh"
            onClick={refresh}
          />
        </div>
        <div className="flex">
          <p className="day">
            {moment().format("dddd")}, <span>{moment().format("LL")}</span>
          </p>
          <p className="description">{weatherData.weather[0].main}</p>
        </div>

        <div className="flex">
          <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>
          <p className="temp">Humidity: {weatherData.main.humidity} %</p>
        </div>

        <div className="flex">
          <p className="sunrise-sunset">
            Sunrise:{" "}
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
              "en-IN"
            )}
          </p>
          <p className="sunrise-sunset">
            Sunset:{" "}
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
              "en-IN"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
