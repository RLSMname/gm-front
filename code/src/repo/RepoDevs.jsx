import { Link } from "react-router-dom";
import MyComponent from "../MyComponent";

import Popup from "reactjs-popup";
import FormElementEditDev from "../forms/FormElementEditDev";

function RepoDevs(props){
    const stateList=props.itemList;
    const setList=props.setList;
    
    const numElem = props.numElem
    const setNumELem = props.setNumELem


    function handleDelete(index){
     
        let id=stateList[index].id;
        fetch("http://localhost:5000/delete-dev", {
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
                    setNumELem(numElem-1)
                    
                }

            }
        );


    }


    function handleEdit(index,updatedItem){
        const updatedList=[...stateList];
        updatedList[index]=updatedItem;
        fetch("http://localhost:5000/update-dev", {
          method: "PATCH",
          body: JSON.stringify({
          id: updatedItem.id,
          name: updatedItem.name,
         
          }),
          headers: {
          "Content-type": "application/json; charset=UTF-8"
                   }
        }).then(response => {
            if (response.status == 400) {
              throw new Error("Dev data is not correct");
            }
            return response.json();
          })
          .then(data => {
            
            setList(data);
           
          })
          .catch(error => {
            console.error("Error:", error.message);
            window.alert(error.message);
          });
    }

    
    return(
         <div className="body-container" >           
                {
                
                stateList.map((element,index)=>
                      <div key={index} className="component-container">
                        <MyComponent  item={element}></MyComponent>
                        <span className="span-button">
                           
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
                                Name:{element.producer}
                                <br></br>
                               
                                </p>

                                <FormElementEditDev item={element} onEdit={updatedItem=>handleEdit(index,updatedItem)} >
                                </FormElementEditDev>

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

export default RepoDevs