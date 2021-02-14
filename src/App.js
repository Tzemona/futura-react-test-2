import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';

//const ALLCATEGORIESURL = 'https://api.chucknorris.io/jokes/categories'
//const RANDOMJOKEBYCATURL = 'https://api.chucknorris.io/jokes/random?categ=' // remember to fill this
const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' // remember to fill this
//const launchErrorAlert = () => setTimeout(() => window.alert('errore!'), 500) 

// classe 'App-logo-spinning' durante il caricamento, altrimenti classe 'App-logo'
const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      alt='interactive-logo'
      className={`App-logo${loading ? '-spinning' : ''}`} 
    />
  )
}

const Joke = ({ value, categories }) => {
  return (
    <div className="Joke">
      <code className="Joke-Value">{value}</code>
       {Array.isArray(categories) && categories.map((categ, index) =>
        <span className="Selected-Cat" key={index}>
          <code>{categ}</code>
        </span>
      )}
    </div>
  )
}

// funcitional component
function App() {
  // qui tutto ciò che serve al componente per essere inizializzato
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchedJoke, setFetchedJoke] = useState({})
  
  // getJokeByKeyword
  // funzione che recupera le barzellette contenenti la parola chiave
  // digitata nel campo di testo
  const getJokeByKeyword = async () => {
    let frJoke = {}
    try {
      setLoading(true)
      let response = await fetch(`${ALLLJOKESBYKEYWORD}${inputText}`)
      let directory = await response.json()
      frJoke = {...directory.result[0]}
    } catch (error) {
    } finally {
      setLoading(false)
      setFetchedJoke(frJoke)
    }
  }
 

  // onInputTextChange
  // handler per l'input di testo
  // qui i lifecycle methods

  const onInputTextChange = (event) => {
    setInputText(event.target.value)
  }
 
  return (
    <div className="App">
      <div className="App-header">
        <Logo
          loading={loading}
        />
        <input
          type="search"
          id="search" name="search"
          placeholder="Enter keyword here"
          value={inputText}
          onChange={onInputTextChange}
        />
        <button
          className="Search-Button"
          onClick={getJokeByKeyword}
        >
          <code>CLICK TO SEARCH!</code>
        </button>
      </div>
      <div className="Content">
        <img
          src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
          className="Chuck-Logo"
          alt="chuck-logo"
        />
        {Object.keys(fetchedJoke).length > 0 && <Joke 
        value ={fetchedJoke.value}
        categories ={fetchedJoke.categories}
        />}
      </div>
      <div className="footer">
      <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: Simona Benigni </code>
      </div>
    </div>
  );

};

export default App;