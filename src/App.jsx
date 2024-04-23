import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import './App.css'
const data = [{name: 'GW1', 'GW Score': 72, 'Top 10k Average': 66.65, 'Overall Average': 57},
{name: 'GW2', 'GW Score': 67, 'Top 10k Average': 53.34, 'Overall Average': 57}, {name: 'GW3', 'GW Score': 60, 'Top 10k Average': 48.97, 'Overall Average': 48},
{name: 'GW4', 'GW Score': 79, 'Top 10k Average': 59.74, 'Overall Average': 62}, {name: 'GW5', 'GW Score': 80, 'Top 10k Average': 71.24, 'Overall Average': 62},
{name: 'GW6', 'GW Score': 37, 'Top 10k Average': 43.42, 'Overall Average': 45},
{name: 'GW7', 'GW Score': 0, 'Top 10k Average': 0, 'Overall Average': 0},
{name: 'GW8', 'GW Score': 61, 'Top 10k Average': 52.77, 'Overall Average': 50},
{name: 'GW9', 'GW Score': 91, 'Top 10k Average': 76.93, 'Overall Average': 68},
{name: 'GW10', 'GW Score': 70, 'Top 10k Average': 69.38, 'Overall Average': 58},
{name: 'GW11', 'GW Score': 53, 'Top 10k Average': 46.9, 'Overall Average': 46},
{name: 'GW12', 'GW Score': 51, 'Top 10k Average': 47.61, 'Overall Average': 39},
{name: 'GW13', 'GW Score': 46, 'Top 10k Average': 57.15, 'Overall Average': 51},
{name: 'GW14', 'GW Score': 59, 'Top 10k Average': 63.33, 'Overall Average': 59},
{name: 'GW15', 'GW Score': 63, 'Top 10k Average': 52.27, 'Overall Average': 53},
{name: 'GW16', 'GW Score': 37, 'Top 10k Average': 47.25, 'Overall Average': 43},
{name: 'GW17', 'GW Score': 99, 'Top 10k Average': 86.69, 'Overall Average': 72},
{name: 'GW18', 'GW Score': 52, 'Top 10k Average': 54.91, 'Overall Average': 48},
{name: 'GW19', 'GW Score': 58, 'Top 10k Average': 58.92, 'Overall Average': 49}];

function App() {
  
  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="GW Score" stroke
      ="#8884d8"/>
      <Line type="monotone" dataKey="Top 10k Average" stroke="#213547"/>
      <Line type="monotone" dataKey="Overall Average" stroke="red"/>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="name" />
      <YAxis/>
      <Tooltip />
    </LineChart>
  )
}

export default App
