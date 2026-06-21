import logo from './images/logo.svg';
import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';

function App() {
  return (
    <div className = "App">
      <h3>Самые большик животные</h3>
      <Chart data={ buildings }/>
      <Table data = {buildings} amountRows = "15" pagination = {true}/>
    </div>
  )
}

export default App;