import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [quotes, setQuotes] = useState([])

  // const addQuote = () => {
  //   setQuotes(prev => [
  //     ...prev,
  //     { id: crypto.randomUUID(), title: 'New quote', content: 'Hello world' },
  //   ])
  // }

  useEffect(() => {
    axios
      .get('/api/quotes')
      .then((response) => {
        setQuotes(response.data)
      })
      .catch((error) => {
        console.error('Error fetching quotes:', error)
      })
  }, []) // run once on mount

  return (
    <>
      <h1>hii</h1>
      {/* <button onClick={addQuote}>Add quote</button> */}
      <p>QUOTES: {quotes.length}</p>
      {quotes.map((quote) => (
        <div key={quote.id}>
          <h3>{quote.title}</h3>
          <p>{quote.content}</p>
        </div>
      ))}
    </>
  )
}

export default App
