import { useState, useEffect } from 'react'
import PhotoContainer from './components/PhotoContainer.jsx'

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/api/list')
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [])

  return (
    <div>
      <h1>5thCloud</h1>
      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        }}
      >
        {items.map((item) => (
          <PhotoContainer key={item.name} item={item} folder="" />
        ))}
      </div>
    </div>
  )
}

export default App