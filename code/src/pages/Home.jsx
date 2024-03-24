import { useState } from "react"
import Repo from "../repo/Repo";
import Popup from "reactjs-popup"
import FormElement from "../forms/FormElement";
function Home(props){
    const [list,setList]=useState(props.itemList);
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
         <Repo itemList={list} setList={setList} >
        </Repo>
        </>
    )  
}

export default Home
