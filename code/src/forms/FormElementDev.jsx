import { useEffect, useState } from "react";
import {useForm} from "react-hook-form"
function FormElementDev(props){
      let itemList=props.itemList;
      const setList=props.setList;
      
      
      const numElem = props.numElem
      const setNumELem = props.setNumELem


      const {register,handleSubmit,formState: { errors },reset} = useForm();      
      const [data,setData]=useState("");
      const onSubmit=(data,e) => {       
        setData(data);
        fetch("http://localhost:5000/add-dev", {
          method: "POST",
          body: JSON.stringify({
          name: data.name,
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
          setNumELem(numElem + 1);
        })
        .catch(error => {
          console.error("Error:", error.message);
          window.alert(error.message);
        });
        
        e.target[0].value = ''; // for name

    }
      
      return(
        <>
        <form id="style-form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text"placeholder="Name" {...register("name", {required: true,})}></input>
            <button type="submit" >Submit</button>
        </form>
        </>
      )


}

export default FormElementDev