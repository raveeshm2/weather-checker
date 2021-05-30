import './App.css';
import {useState} from 'react';
import Table from './Table/Table';

const serverName = 'http://localhost:4000';

function App() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function onClickHandler(e){
    e.preventDefault();
    setLoading(true);
    setWeather(null);
    fetch(`${serverName}/weather/${cityName}`)
    .then(res => res.json())
    .then(({message}) => {
      setLoading(false);
      if(!message.coord){
        setError('Error retrieving city details');
        return;
      }
      setWeather({
      'City Name': cityName,
      Latitude: message.coord.lat,
      Longitude: message.coord.lon,
      Description: message.weather[0].description,
      'Current Temperature': message.main.temp,
      'Feels Like': message.main.feels_like,
      'Min Temperature': message.main.temp_min,
      'Max Temperature': message.main.temp_max,
      Humidity: message.main.humidity
    });
    setError(null);
  }).catch(e => {
    setLoading(false);
    setError('Error calling API');
  });
  }

  function onChangeHandler(e){
    setCityName(e.target.value);
  }

  return (
    <>
    <h1>Weather App</h1>
    <div className='container'>
      <form>
        <input type='text' value={cityName} onChange={onChangeHandler} />
        <button onClick={onClickHandler}>Submit</button>
      </form>
    </div>
    {loading && <p style={{textAlign: 'center'}}>Loading....</p>}
    {weather && <Table data={weather}/>}
    {error && <h3 style={{textAlign: 'center'}}>{error}</h3>}
    </>
  )
}

export default App;
