import TableHead from './TableHead.jsx';
import TableBody from './TableBody.jsx';
import Filter from './Filter.jsx';
import { useState, useRef } from "react";
import SortForm from './SortForm.jsx';

const Table = (props) => {
  const [dataTable, setDataTable] = useState(props.data);
  const n = Math.ceil(dataTable.length / props.amountRows);
  const [activePage, setActivePage] = useState("1");
  const updateDataTable = (value) => setDataTable(value);
  const [selectedOption, setSelectedOption] = useState({'1' : "Нет", '2' : "Нет", '3' : "Нет"})
  const [selectedCheckbox, setSelectedCheckbox] = useState({'1' : "asc", '2' : "asc", '3' : "asc"})
  const formFilterRef = useRef(null);
  const formSortRef = useRef(null);

  const changeActive = (event) => {
    setActivePage(event.target.innerHTML);
  }
  
  const arr = Array.from({ length: n }, (v, i) => i + 1);
  const pages = arr.map((item, index) =>
    <span
    className={(Number(activePage) - 1 === index) ? 'selected' : ''} key={ index }
    onClick={ changeActive }>
      { item }
    </span>
  )
  
  const handleResetForms = () => {
    setSelectedOption(prev => {
      const newObj = Object.entries({...prev}).map(([index, val]) => [index, "Нет"])
      console.log(Object.fromEntries(newObj))
      return Object.fromEntries(newObj)
    })
    updateDataTable(props.data)
    formSortRef.current.reset();
    formFilterRef.current.reset();
  }

  return(
    <>
      <div className='inputArea'>
        <div>
          <h4>Фильтры</h4>
          <Filter filtering={ updateDataTable } data={ dataTable }
          fullData={ props.data } setActivePage={ setActivePage } amountRows={ props.amountRows }
          resetTable={ handleResetForms } ref={ formFilterRef }/>
        </div>
        <div>
          <h4>Сортировка</h4>
          <SortForm setSelectedOption={ setSelectedOption }
          selectedOption={ selectedOption } handleResetForms={ handleResetForms }
          ref={ formSortRef } dataTable={ dataTable } setDataTable={ setDataTable } 
          selectedCheckbox={ selectedCheckbox } setSelectedCheckbox={setSelectedCheckbox} />
        </div>
      </div>
      <table>
        <TableHead head={ Object.keys(props.data[0]) } />
        <TableBody body={ dataTable }
        amountRows={ (props.havePag) ? props.amountRows : props.data.length }
        numPage={ activePage }/>
      </table>
      { props.havePag ? pages : null }
    </>
  )
}
export default Table;