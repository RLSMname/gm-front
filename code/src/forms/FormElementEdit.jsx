import { useState } from "react";
import {useForm} from "react-hook-form"
function FormElementEdit(props){
      const item=props.item;
      const onEdit=props.onEdit;
      const {register,handleSubmit,formState: { errors },reset} = useForm(
        {
            defaultValues: {
                name: item.name,
                developer: item.developer,
                price: item.price,
                description: item.description
            }
        }
      );

      const [dataSubmitted,setData]=useState("");
      const onSubmit=(data,e) => {
        console.log("reached here");
        setData(data);
        onEdit({ ...item, ...data });
        reset(); // Reset the form
        e.target[0].value = '';
        e.target[1].value = '';
        e.target[2].value = '';
        e.target[3].value = '';
    }
      
      return(
        <>
        <form id="style-form" onSubmit={handleSubmit(onSubmit)}>
            <input   type="text"placeholder="Name" {...register("name", {required: true,})}></input>
            <div></div>
            <input  type="text" placeholder="Developer" {...register("developer",  {required: true,})}></input>
            <div></div>
            <input  type="number"placeholder="Price"{...register("price", {required: true,} )}></input>
            <div></div>
            <input  type="description"placeholder="Description" {...register("description", {required: true,} )}></input>
            <div></div>
            <button type="submit" >Submit</button>
        </form>
        </>
      )


}

export default FormElementEdit