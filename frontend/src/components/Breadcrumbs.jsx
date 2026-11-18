import { Link } from "react-router-dom";

export default function Breadcrumbs({folder}){
    const path = folder ? folder.split("/") : [];
    return(
        <div>
            <nav>
                <Link to="/">root</Link>
                {path.map((part, i) => {
                    const newPath = path.slice(0,i+1).join("/");
                    return(
                        <span key={newPath}>
                            {"/"}
                            <Link to={`/?path=${encodeURIComponent(newPath)}`}>{part}</Link>
                        </span>
                    )
                })}
            </nav>
        </div>
    )
}