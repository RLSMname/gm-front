import { useState } from "react"
import Popup from "reactjs-popup"
import FormElementDev from "../forms/FormElementDev"
import { useEffect} from "react"
import { Socket, io } from "socket.io-client";
import RepoDevs from "../repo/RepoDevs"


function Home(props){

    const [isServerOnline, setIsServerOnline] = useState(true);
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
      
        const interval = 60000; // Define the interval (in milliseconds)
        const intervalId = setInterval(checkServerStatus, interval);
      
        return () => clearInterval(intervalId);
      }, []);
      
  

    const list=props.itemList;
    const setList=props.setList;
    
    const numElem = props.numElem
    const setNumELem = props.setNumELem


    
    
    return (
        <>
        {!isServerOnline ? <h1>Server down at the moment</h1> :
        <>

        <h1>Number of items: {numElem}</h1>
        <Popup 
                trigger= {<button className="add-button"> Click to open modal </button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='pop-up-content'>

                                Add an item!
                                <FormElementDev itemList={list} setList={setList} numElem={numElem} setNumELem={setNumELem}/>
                                

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
         <RepoDevs itemList={list} setList={setList} numElem={numElem}  setNumELem={setNumELem}>
        </RepoDevs>
        </>
            }</>
    )  
}

export default Home
