import { Link } from "react-router-dom";
import MyComponent from "../MyComponent";
import { useState } from "react";
import Popup from "reactjs-popup";
import FormElementEdit from "../forms/FormElementEdit";

function Repo(props){
    const stateList=props.itemList;
    const setList=props.setList;
    function handleDelete(index){
     
        console.log(1);
        console.log("Deleting index:", index);
        console.log("Before:",stateList);
        setList(stateList.filter((_, i) => i !== index)); 
        console.log("After:",stateList);

    }


    function handleEdit(index,updatedItem){
        const updatedList=[...stateList];
        updatedList[index]=updatedItem;
        setList(updatedList);
    }

    
    return(
         <div className="body-container" >           
                {stateList.map((element,index)=>
                      <div key={index} className="component-container">
                        <MyComponent  item={element}></MyComponent>
                        <span className="span-button">
                            <Link to={{pathname: `/${element.id}`}} state={{ item: element  }}><button >View</button></Link>
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