import { useState } from "react"
import Repo from "../repo/Repo";
import Popup from "reactjs-popup"
import FormElement from "../forms/FormElement";
import { Link } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { useEffect} from "react";
function Home(props){
    const list=props.itemList;
    const setList=props.setList;
    const [on,setOn]=useState(true);
    const numElem = props.numElem
    const setNumElem = props.setNumELem

    function LoadMoreButton() {

        //return list.length < numElem ? <button onClick={handleLoadMore}>More</button> : null
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
                  return response.json() //mod
                }).then(data=>
                    {
                        const newList = data["slice"];
                        const newNumElem = data["all"];
                        if(newList !== null) {
                            setList(newList);

                            setOn(true);
                        }
                        else setOn(false);
                        setNumELem(newNumElem); 
                    }
             );
        }



        const [isServerOnline, setIsServerOnline] = useState(false);
        const [socket, setSocket] = useState(null);

        useEffect(() => {
            const socketIo = io('http://localhost:3000');
            
            socketIo.connect()
    
            socketIo.on("connect", () => {
              console.log("Socket connected");
              setSocket(socketIo);
            });
    
            return () => {
              socketIo.disconnect();
            };
          }, []);


          useEffect(() => {
            const checkServerStatus = () => {
              fetch('http://localhost:5000/health-check', {
                method: "GET",
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
              })
              .then((response) => {
                console.log("Health Check Response Status:", response.status);
                console.log("Health Check Response Status Text:", response.statusText);
          
                if (!response.ok) {
                  console.log("Server is offline or returned an error");
                  setIsServerOnline(false);
                } else {
                  console.log("Server is online");
                  setIsServerOnline(true);
                }
              })
              .catch((error) => {
                console.error("Error connecting to the server:", error);
                setIsServerOnline(false);
              });
            };
          
            checkServerStatus();
          
            const interval = 10000; 
            const intervalId = setInterval(checkServerStatus, interval);
          
            return () => clearInterval(intervalId);
          }, []);
          
      
          useEffect(() => {
            if (socket) {
              const handleNewRandom = (event) => {
                const newItem = event;
                setList([...list, newItem]);
                setNumElem(numElem + 1);
                console.log(newItem);
              };
    
              socket.on("newItem", handleNewRandom);
          
              
              return () => {
                socket.off("newItem", handleNewRandom);
              };
            }
          },);

    return (
        <>
        {!isServerOnline ? <h1>Server dead lmao</h1> :
        <>
        <h1>Number of elements: {list.length} from {numElem}</h1>
        <Popup 
                trigger= {<button className="add-button"> Add </button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='pop-up-content'>
                        
                                Add an item!
                                <FormElement itemList={list} setList={setList} numElem = {numElem} setNumELem = {setNumElem} >
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
         <Repo itemList={list} setList={setList} numElem = {numElem} setNumELem = {setNumElem}>
         </Repo>
         <LoadMoreButton></LoadMoreButton>
        </>
}
</>
    )  
}

export default Home
