import { useState } from "react"
import Repo from "../repo/Repo";
import Popup from "reactjs-popup"
import FormElement from "../forms/FormElement";
import { Link } from "react-router-dom";
function Home(props){
    const [list,setList]=useState(props.itemList);

    function handleSort(ascending){
        const sortedList = list.sort(function(a, b){return (a.price - b.price)*ascending});
        setList([...sortedList])
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
        </>
    )  
}

export default Home
