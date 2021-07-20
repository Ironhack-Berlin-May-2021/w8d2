import './App.css';
import { useState, useEffect } from 'react';


const useLocalStorage = (key, defaultValue = '') => {
  const [state, setState] = useState(() => window.localStorage.getItem(key) || defaultValue);

  useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [state])
  return [state, setState]
}

const App = () => {

  const getInitialState = () => {
    console.log('get initial state');
    return window.localStorage.getItem('name') || ''
  }

  const [name, setName] = useLocalStorage('name');

  // use lazy intializer
  // const [name, setName] = useState(() => window.localStorage.getItem('name') || '');

  // useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  const [count, setCount] = useState(0);

  // const [countries, setCountries] = useState([]);

  const handleChange = e => setName(e.target.value);

  // useEffect(() => {
  //   console.log('use effect');
  //   fetch('https://restcountries.eu/rest/v2/')
  //     .then(response => response.json())
  //     .then(data => setCountries(data))
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        {name ? <strong>Hello {name}</strong> : 'Please type your name'}
        <input type="text" onChange={handleChange} />
        {count}
        <button onClick={() => setCount(state => state + 1)}>Click me 👇</button>
        {/* {countries.map(country => (
          <h5 key={country.alpha3Code}>{country.name}</h5>
        ))} */}
      </header>
    </div>
  );
}

export default App;
