import { PieChart } from '@mui/x-charts/PieChart';
import { useLocation } from "react-router-dom";
function Pie(){
    let {state}=useLocation();
    const stateList= state.itemList

    function determineDictOfPrices(){
        const frequencies = {}; //developer : frequency   
        for (const item of stateList) {
            const developer = item.developer;
            frequencies[developer] = frequencies[developer] ? frequencies[developer] + 1 : 1;
          }
        return frequencies;
    }

    const frequencies = determineDictOfPrices();

    /*
    console.log(frequencies)

    
    
    console.log(Object.keys(frequencies).map((dev, index) => {
        return {id: index, value:frequencies[dev], label:dev}
    }))
*/
    const preparedDict = Object.keys(frequencies).map((dev, index) => {
        return {id: index, value:frequencies[dev], label:dev}
    });

    console.log(preparedDict)
    //console.log([preparedDict])
    return <PieChart
    series={[
      {
        data: preparedDict,
      },
    ]}
    width={1000}
    height={700}
  />

}

export default Pie