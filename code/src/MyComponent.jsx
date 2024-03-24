

function MyComponent(props){
    const item=props.item;   
    
    return(
        <>
        <div style={{height:"132px"}}  >
            <img className="component-image" src="./src/assets/paint.jpg" alt=""></img>
            <h1>Name: {item.name}</h1>
        </div>
       
        </>
    )

}
export default MyComponent