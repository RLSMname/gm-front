import { useState } from "react"
import Repo from "../repo/Repo";
import Popup from "reactjs-popup"
import FormElement from "../forms/FormElement";
import { Link } from "react-router-dom";
function Home(props){
    const list=props.itemList;
    const setList=props.setList;
    const [on,setOn]=useState(true);

    function LoadMoreButton() {
        return <button onClick={handleLoadMore}>More</button>
    }

    function handleSort(ascending){
        fetch(`http://localhost:5000/sort?sortValue=${ascending}`, {
            method: "GET",
            headers: {
            "Content-type": "application/json; charset=UTF-8"
                     }
          }).then((response)=> response.json()).
                  then(
                      (data)=>{
                                  setList(data);
                              }
             
                      )
        }


        function handleLoadMore(){
       
            fetch(
                  "http://localhost:5000/pages",{
                    method: "GET",
                    headers: {
                    "Content-type": "application/json; charset=UTF-8"
                             }
                  }
                ).then((response)=>{
                  return response.json()
                }).then(data=>{if(Array.isArray(data))
                  setList(data);
                  else setOn(false); 
                }
             );
        }
    return (
        <>
        <Popup 
                trigger= {<button className="add-button"> Add </button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='pop-up-content'>
                        
                                Add an item!
                                <FormElement itemList={list} setList={setList}>
                                </FormElement>

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
            <br></br>
            <button onClick={() => handleSort(1)}>Order by price ascending</button>
            <button onClick={() => handleSort(-1)}>Order by price descending</button>
            <div>
                <Link to={{pathname: `/games/piechart`}} state={{ itemList: list  }}><button >View Piechart</button></Link>
            </div>
         <Repo itemList={list} setList={setList} >
         </Repo>
         <LoadMoreButton></LoadMoreButton>
        </>
    )  
}

export default Home
