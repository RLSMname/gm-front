
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
function Info(){
    let {state}=useLocation();
    const id = state.id;

    const [item,setItem]=useState({});


    useEffect(()=>{
        fetch(`http://localhost:5000/games/${id}`, {
              method: "GET",
              headers: {
              "Content-type": "application/json; charset=UTF-8"
                       }
            }).then((response)=>
               {return response.json()}).then(
                (data)=>setItem(data)
            )
                },[]);

    const description=item.description;
    const name=item.name;
    const developer=item.developer;
    const price=item.price;
    return(
        <div className="info">
           <div className="center-information">
           <h1>{name}</h1>
           <h2>
            Developer:{developer} 
            </h2>
           <h2>
            Name:{name}
            </h2>
            <h2>
            Price:{price}
            </h2>
           <h2>Description:{description}</h2>
           </div>
        </div>
    );
}
export default Info