import { useState } from "react";
import Table from "./Table";
import { initialData } from '../tableData'

const TableContainer = () => {
    const [tableData, setTableData] = useState(initialData?.rows || []);

    return (
        <Table
            tableData={tableData}
            updateTableData={setTableData}
        />
    )
}

export default TableContainer;