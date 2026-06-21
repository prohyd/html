import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useState, useRef } from "react";
import Filter from "./Filter";

const Table = (props) =>{

    const [activePage,setActivePage] = useState("1");

    const [dataTable, setDataTable] = useState(props.data)
    const [selectedOption, setSelectedOption] = useState({'1' : "Нет", '2' : "Нет", '3' : "Нет"})
    const updateDataTable = value => setDataTable(value);
    const formFilterRef = useRef(null);

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const n = Math.ceil(dataTable.length / props.amountRows);

    const arr = Array.from({length: n}, (v,i) => i + 1);

    const pages = arr.map((item,index) =>
        <span key = {index} className = {item == activePage ? "selected": ""} onClick={changeActive}> {item}</span>  
    );
    const handleResetForms = () => {
        setSelectedOption(prev => {
          const newObj = Object.entries({...prev}).map(([index, val]) => [index, "Нет"])
          console.log(Object.fromEntries(newObj))
          return Object.fromEntries(newObj)
        })
        updateDataTable(props.data)
        formFilterRef.current.reset();
      }


    return(
        <>
            <h4>Фильтры</h4>
            <Filter filtering={ updateDataTable } data={ dataTable }
            fullData={ props.data } setActivePage={ setActivePage } amountRows={ props.amountRows }
            resetTable={ handleResetForms } ref={ formFilterRef }/>

            <table>
                <TableHead head = {Object.keys(props.data[0])}/>
                <TableBody body = {dataTable} amountRows = {props.pagination ? props.amountRows: props.data.length} numPage = {activePage}/>
            </table>

            {props.pagination && <div>{pages}</div>}
        </>
    )
}

export default Table