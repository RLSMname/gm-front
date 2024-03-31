import { useState } from "react";
import {useForm} from "react-hook-form"
function FormElement(props){
      let itemList=props.itemList;
      const setList=props.setList;
      const {register,handleSubmit,formState: { errors },reset} = useForm();
      const [data,setData]=useState("");
      const onSubmit=(data) => {       
        setData(data);
        console.log(itemList);
        
        fetch("http://localhost:5000/add", {
          method: "POST",
          body: JSON.stringify({
          id: 0,
          name: data.name,
          developer:data.developer,
          price: data.price,
          description:"New item"
          }),
          headers: {
          "Content-type": "application/json; charset=UTF-8"
                   }
        });
    }
      
      return(
        <>
        <form id="style-form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text"placeholder="Name" {...register("name", {required: true,})}></input>
            <input type="text"placeholder="Developer" {...register("developer", {required: true,
  })}></input>
            <input type="number"placeholder="Price" {...register("price", {required: true,
  })}></input>
            <button type="submit" >Submit</button>
        </form>
        </>
      )


}

export default FormElement