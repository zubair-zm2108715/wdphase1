import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function Barchart(props) {
  return (
    <BarChart width={950} height={400} data={props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        tick={{ fontSize: 18 }} // Adjust the font size of the ticks
        label={{ fontSize: 20 }} // Adjust the font size of the label
        interval={0} // Set the interval between each tick to display all labels
      />
      <YAxis />
      <Bar name="name" dataKey={props.datakey} fill="#8884d8" />
    </BarChart>
  );
}
