import { useState, useEffect, useLayoutEffect, useRef } from "react";

export default function FileMenu({ fullPath }) {
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState({ x: false, y: false });
  const ref = useRef(null);
  const menuRef = useRef(null);
  const url = `/api/download?path=${encodeURIComponent(fullPath)}`;

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // after the menu is drawn, check whether it sticks out of the screen
  useLayoutEffect(() => {
    if (!open) {
      setFlip({ x: false, y: false });
      return;
    }
    const r = menuRef.current.getBoundingClientRect();
    setFlip({
      x: r.left < 8,
      y: r.bottom > window.innerHeight - 8,
    });
  }, [open]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin + url);
    setOpen(false);
  };

  const itemStyle = {
    display: "block",
    padding: "8px 12px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen(!open)} aria-label="File options">
        ⋮
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            ...(flip.x ? { left: 0 } : { right: 0 }),
            ...(flip.y ? { bottom: "100%" } : {}),
            zIndex: 10,
            background: "Canvas",
            color: "CanvasText",
            border: "1px solid #888",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <a href={url} download style={itemStyle} onClick={() => setOpen(false)}>
            Download
          </a>
          <div style={itemStyle} onClick={copyLink}>
            Copy link
          </div>
        </div>
      )}
    </div>
  );
}