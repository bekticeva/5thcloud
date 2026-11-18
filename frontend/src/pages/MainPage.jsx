import { useState, useEffect } from 'react'
import Folder from '../components/Folder.jsx'
import { useSearchParams } from 'react-router-dom'

function MainPage() {
  const [items, setItems] = useState([]) //lists everything in the main folder
  const [searchParams] = useSearchParams();
  const folder = searchParams.get("path") || "";

  console.log(items)

  useEffect(() => {
    fetch(`/api/list?path=${encodeURIComponent(folder)}`)
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
  }, [folder])

  return (
    <div>
      <h1>5thCloud</h1>

        <Folder name={folder || ""} items={items}/>




{/*       <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        }}
      >
        {items.map((item) => (
          <PhotoContainer key={item.name} item={item} folder={folder} />
        ))}
      </div> */}
    </div>
  )
}

export default MainPage