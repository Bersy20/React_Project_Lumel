import { useState } from "react";
import Row from "./Row";

const RowContainer = ({
    row,
    updateTableData,
    level
}) => {

    return (
        <Row
            row={row}
            level={level}
            updateTableData={updateTableData}
        />
    )
}

export default RowContainer;