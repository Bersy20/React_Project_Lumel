
import { useState } from "react";
import './Row.scss'

const safeNumber = (v) => {
    const n = Number(v);
    return isNaN(n) ? 0 : n;
};

const variance = (value, original) =>
    original === 0
        ? "0%"
        : (((value - original) / original) * 100).toFixed(2) + "%";

const distributeToChildren = (node, newValue) => {
    if (!node.children) return;

    const total = node.children.reduce((s, c) => s + c.value, 0);
    if (total === 0) return;

    node.children.forEach(child => {
        const ratio = child.value / total;
        child.value = +(ratio * newValue).toFixed(2);
        distributeToChildren(child, child.value);
    });
};

const updateTree = (nodes, id, updater) =>
    nodes.map(node => {
        if (node.id === id) {
            const copy = structuredClone(node);
            updater(copy);
            return copy;
        }

        if (node.children) {
            const updatedChildren = updateTree(node.children, id, updater);
            const newValue = updatedChildren.reduce((s, c) => s + c.value, 0);

            return {
                ...node,
                children: updatedChildren,
                value: +newValue.toFixed(4)
            };
        }

        return node;
    });


const Row = ({
    row,
    updateTableData,
    level
}) => {
    const [input, setInput] = useState("");

    const handlePercent = () => {
        const percent = safeNumber(input);

        updateTableData(prev =>
            updateTree(prev, row.id, node => {
                node.value = +(node.value * (1 + percent / 100)).toFixed(2);
                if (node.children) distributeToChildren(node, node.value);
            })
        );
    };

    const handleValue = () => {
        const val = safeNumber(input);

        updateTableData(prev =>
            updateTree(prev, row.id, node => {
                node.value = val;
                if (node.children) distributeToChildren(node, node.value);
            })
        );
    };

    return (
        <>
            <tr className="data-row">
                <td>
                    {row.label}
                </td>
                <td>{row.value.toFixed(2)}</td>
                <td>
                    <input
                        type="number"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </td>
                <td>
                    <button onClick={handlePercent}>%</button>
                </td>
                <td>
                    <button onClick={handleValue}>Val</button>
                </td>
                <td>
                    {variance(row.value, row.originalValue)}
                </td>
            </tr>

            {row.children?.map(child => (
                <Row
                    key={child.id}
                    row={child}
                    level={level + 1}
                    updateTableData={updateTableData}
                />
            ))}

        </>);
}

export default Row;