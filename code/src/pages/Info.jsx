
import { useLocation } from "react-router-dom";
function Info(){
    let {state}=useLocation();
    const item=state.item;
    const description=item.description;
    const name=item.name;
    const developer=item.developer;
    const price=item.price;
    return(
        <div className="info">
           <div className="center-information">
           <h1>{name}</h1>
           <h2>
            developer:{developer} 
            </h2>
           <h2>
            Name:{name}
            </h2>
            <h2>
            Price:{price}
            </h2>
           <h2>Description</h2>
           </div>
           <img  className="image-info"  src="./src/assets/paint.jpg" alt=""></img>
        </div>
    );
}
export default Info