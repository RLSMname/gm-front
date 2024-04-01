import { Link } from "react-router-dom";
import MyComponent from "../MyComponent";
import Popup from "reactjs-popup";
import FormElementEdit from "../forms/FormElementEdit";

function Repo(props){
    const stateList=props.itemList;
    const setList=props.setList;


    const numElem = props.numElem
    const setNumELem = props.setNumELem

    function handleDelete(index){

        let id=stateList[index].id;
        fetch("http://localhost:5000/delete", {
            method: "DELETE",
            body: JSON.stringify({
            id: stateList[index].id,
                    }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((resp)=>
            {
                if (resp.ok) {
                    
                    setList(prevList => prevList.filter((element, _) => element.id !==id));
                    
                }

            }
        );

        setNumELem(numElem-1)

    }


    function handleEdit(index,updatedItem){
        const updatedList=[...stateList];
        updatedList[index]=updatedItem;
        setList(updatedList);
        fetch("http://localhost:5000/update", {
          method: "PATCH",
          body: JSON.stringify({
          id: updatedItem.id,
          name: updatedItem.name,
          developer:updatedItem.developer,
          price: updatedItem.price,
          description:updatedItem.description
          }),
          headers: {
          "Content-type": "application/json; charset=UTF-8"
                   }
        });
    }

    
    return(
         <div className="body-container" >           
                {stateList.map((element,index)=>
                      <div key={index} className="component-container">
                        <MyComponent  item={element}></MyComponent>
                        <span className="span-button">
                            <Link to={{pathname: `/${element.id}`}} state={{ id: element.id  }}><button >View</button></Link>
                            <button onClick={()=>handleDelete(index)}>Delete</button>
                            
                            <Popup 
                            trigger= {<button className="add-button"> Edit </button>} 
                            modal nested>
                            {
                                close => (
                                <div className='modal'>
                                <div className='pop-up-content'>
                                    
                                <h1>Edit {element.name}! </h1>
                                
                                <p>
                                developer:{element.developer}
                                <br></br>
                                Price:{element.price}
                                <br></br>
                                Description:{element.description}
                                </p>

                                <FormElementEdit item={element} onEdit={updatedItem=>handleEdit(index,updatedItem)} >
                                </FormElementEdit>

                            </div>
                            <div>
                                
                                <button  onClick=
                                    {() => close()}>
                                        Close modal
                                </button>
                            
                            </div>
                        </div>
                    )
                }
            </Popup>
                        </span>
                    </div>
                    )
                }
          </div>)
}

export default Repo