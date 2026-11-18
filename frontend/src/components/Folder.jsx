import PhotoContainer from "./PhotoContainer";

export default function Folder({name, items}){
    return(
        <div style={{marginTop: 5}}>
            <div>
                <span>📁{name}</span>
            </div>

            <div>
        {items.map((item) => (
          <PhotoContainer key={item.name} item={item} folder={name} />
        ))}
            </div>
        </div>
    )
}