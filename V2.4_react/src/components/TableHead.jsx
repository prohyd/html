import TableRow from './TableRow.jsx';

const TableHead = (props) => {
  return (
    <thead>
      <tr>
        <TableRow row={ props.head } isHead="1"/>
      </tr>
    </thead>
  )
}

export default TableHead;