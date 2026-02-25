import Row from '../Row';
import './Table.scss';

const Table = ({updateTableData, tableData}) => {
    const grandTotal = Array.isArray(tableData) ? tableData.reduce((acc, curr) => acc + curr?.value, 0) : [];

    return (
        <table className='tableBorder'>
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                    <th>Input</th>
                    <th>Allocation %</th>
                    <th>Allocation Val</th>
                    <th>Variance %</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(tableData) && tableData.map(row => (
                    <Row
                        key={row?.id}
                        row={row}
                        level={0}
                        updateTableData={updateTableData}
                    />
                ))}
                <tr>
                    <td><b>Grand Total</b></td>
                    <td><b>{grandTotal}</b></td>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;