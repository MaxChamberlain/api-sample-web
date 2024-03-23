import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'

function App() {
  const [apiResponse, setApiResponse] = useState(null)
  const [apiHeaders, setApiHeaders] = useState(null)
  const [apiUrl, setApiUrl] = useState('https://jsonplaceholder.typicode.com/users/1')

  async function fetchData() {
    try{
      const response = await fetch(apiUrl)
      const data = await response.json()
      setApiResponse(data)
      setApiHeaders(response.headers)
    } catch (error) {
      console.error('Error fetching data', error)
      setApiResponse(error)
      setApiHeaders(null)
    }
  }

  useEffect(() => {
    console.log('App component mounted')
    fetchData()
  }, [])

  return (
    <>
      <Header />
      <label htmlFor='api-url'>API URL</label>
      <form className='api-url-input' onSubmit={(formSubmittedEvent) => {
        formSubmittedEvent.preventDefault()
        fetchData()
      }}>
        <input
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder='Enter API URL'
          type='text'
        />
      <button onClick={fetchData}>Fetch Data</button>
    </form>
      <div style={{
        width: '100%',
        textAlign: 'center',
        marginTop: '1rem'
      }}>
        Try changing the url that we request 👆
      </div>
      <div className='container'>
        <h2>API Response Data (Body)</h2>
       {apiResponse && <pre>{JSON.stringify(apiResponse, null, 2)}</pre>}
        <h2>API Response Headers</h2>
        {apiHeaders && <pre>{JSON.stringify([...apiHeaders], null, 2)}</pre>}
      </div>
    </>
  )
}
export default App