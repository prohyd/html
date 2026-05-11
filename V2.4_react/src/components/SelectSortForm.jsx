import buildings from '../data.js'

const SelectSortForm = (props) => {

    if (!props.selectedOption) {
        console.log('Waiting for data...');
        return <div>Loading...</div>;
    }

    const nameColumns = ["Нет", ...Object.keys(buildings[0])]

    return(
        <select onChange={(e) => props.onSelectChange(props.field, e.target.value)}
        value={props.selectedOption[props.field]}
        disabled={((['2', '3'].includes(props.field)) && (props.selectedOption[props.field - 1] == 'Нет')) && true} >
            { (props.selectedOption[props.field] != "Нет") && <option key={0}>{props.selectedOption[props.field]}</option>}
            { nameColumns.map((item, index) => {
                return ((!Object.values(props.selectedOption).includes(item)) || item == 'Нет') &&
                <option key={index + 1} >{ item }</option>
            })}
        </select>
    )
}

export default SelectSortForm