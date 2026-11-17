export default function PhotoContainer({ item, folder }) {
  const fullPath = folder ? `${folder}/${item.name}` : item.name;

  return (
    <>
      <div style={{ border: "1px solid #888", borderRadius: 8, padding: 12 }}>
        <div style={{ fontSize: 32 }}>{item.type === "dir" ? "📁" : "🖼️"}</div>
        <div>{item.name}</div>

        {item.type === "file" && (
          <a href={`/api/download?path=${encodeURIComponent(fullPath)}`} download>
            Download
          </a>
        )}
      </div>
    </>
  );
}
