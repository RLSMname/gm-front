import { useState } from "react";
import {useForm} from "react-hook-form"
function FormElement(props){
      let itemList=props.itemList;
      const setList=props.setList;
      const {register,handleSubmit,formState: { errors },reset} = useForm();
      let counter=4;
      const [data,setData]=useState("");
      const onSubmit=(data,e) => {       
        counter=counter+1;
        setData(data);
        console.log(itemList);
        const newList=[...itemList,{...data,id:{counter},description:""}];
        console.log(newList);
        setList(newList);
        e.target[0].value = ''; // for name
        e.target[1].value = ''; 
        e.target[2].value='';
        
    
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