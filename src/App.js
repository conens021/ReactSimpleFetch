import { useEffect, useState } from 'react';
import './App.css';

import Loading from './Loading';
import AddMovie from './add-movie/AddGallery';
import GalleryList from './GalleryList';

function App() {

  const [galleries, setGalleries] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [responseError, setResponseError] = useState(null)

  useEffect(() => {
    console.log(responseError)
  }, [responseError])

  useEffect(() => {
    fetchGalleriesHandler();
  }, [])


  async function fetchGalleriesHandler() {
    setLoading(true)
    setResponseError(null)
    try {
      const response = await fetch("http://localhost:5297/galleries", { method: "GET" })
      console.log(response)
      if (response.status >= 400) throw new Error(`Something went wrong..`)
      const data = await response.json();
      console.log(data)
      setGalleries(data);
      setLoading(false)
    } catch (error) {
      console.log("error")
      setLoading(false)
      setResponseError("Something went wrong, while loading movies from database...")
    }
  }

  const galleryFormSubmitted = async (gallery) => {

    try {
      const response = await fetch("http://localhost:5297/gallery", {
        mode: 'cors',
        crossDomain: true,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gallery),
      })

      if (response.status === 200) {
        const data = await response.json()
        console.log(data)
        setGalleries((prev) => [
          data,...prev
        ])
      } else {
        throw new Error(`Something went wrong:${response.status - response.statusText}`)
      }
    } catch (error) {

    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
        <section className='fetch-movies'>
          <button onClick={fetchGalleriesHandler}>Fetch Galleries</button>
        </section>
        {isLoading && <Loading />}
        {!isLoading && galleries.length == 0 && !responseError && <div style={{ fontSize: '1.2em', color: 'white' }}>No galleries found</div>}
        {!isLoading && < GalleryList galleryList={galleries} />}
        {!isLoading && responseError && <div style={{ color: "red" }}>{responseError}</div>}
      </header>
      <main>
        <AddMovie addGallery={galleryFormSubmitted} />
      </main>
    </div>
  );
}

export default App;
