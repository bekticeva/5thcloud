import { Link } from "react-router-dom";

export default function PhotoContainer({ item, folder }) {
  const fullPath = folder ? `${folder}/${item.name}` : item.name;

  return (
    <div style={{ padding: 4 }}>
      {item.type === "dir" ? (
        <Link to={`/?path=${encodeURIComponent(fullPath)}`}>
          <div style={{ fontSize: 32 }}>📁</div>
          <div>{item.name}</div>
        </Link>
      ) : (
        <>
          <div style={{ fontSize: 32 }}>🖼️</div>
          <div>{item.name}</div>
          <a href={`/api/download?path=${encodeURIComponent(fullPath)}`} download>
            Download
          </a>
        </>
      )}
    </div>
  );
}