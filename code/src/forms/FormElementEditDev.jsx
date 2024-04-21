import { useState } from "react";
import {useForm} from "react-hook-form"
function FormElementEditDev(props){
      const item=props.item;
      const onEdit=props.onEdit;
      const {register,handleSubmit,formState: { errors },reset} = useForm();

      const [dataSubmitted,setData]=useState("");
      const onSubmit=(data,e) => {
        console.log("reached here");
        setData(data);
        onEdit({ ...item, ...data });
        reset(); // Reset the form
      
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

export default FormElementEditDev