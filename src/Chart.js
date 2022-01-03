import { PieChart } from 'react-minimal-pie-chart'

function Chart() {
  const data = [
    { title: 'One', value: 30, color: 'red'},
    { title: 'Two', value: 30, color: 'blue'},
    { title: 'Three', value: 30, color: 'green'},
  ];
  return (
    <PieChart 
      data={data}
      label={({ dataEntry }) => dataEntry.value}
      animate
    />
  )  
}

export default Chart;
