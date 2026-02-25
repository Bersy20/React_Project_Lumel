import { useState } from "react";
import "./Row.scss";

const Row = ({ row, updateTableData, level }) => {
  const [input, setInput] = useState("");

  const toNumber = (val) => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  };

  const calculateVariance = (current, initial) => {
    if (!initial) return "0%";
    return (((current - initial) / initial) * 100).toFixed(2) + "%";
  };

  const updateChildValues = (node, updatedValue) => {
    if (!node.children || node.children.length === 0) return;

    const total = node.children.reduce((sum, c) => sum + c.value, 0);
    if (!total) return;

    node.children.forEach(child => {
      const share = child.value / total;
      child.value = +(share * updatedValue).toFixed(2);
      updateChildValues(child, child.value);
    });
  };

  const rebuildTree = (list, targetId, action) => {
    return list.map(item => {
      if (item.id === targetId) {
        const copy = structuredClone(item);
        action(copy);
        return copy;
      }

      if (item.children) {
        const children = rebuildTree(item.children, targetId, action);
        const sum = children.reduce((s, c) => s + c.value, 0);

        return {
          ...item,
          children,
          value: +sum.toFixed(2)
        };
      }

      return item;
    });
  };

  const onPercentApply = () => {
    const percent = toNumber(input);

    updateTableData(prev =>
      rebuildTree(prev, row.id, node => {
        node.value = +(node.value * (1 + percent / 100)).toFixed(2);
        if (node.children) updateChildValues(node, node.value);
      })
    );
  };

  const onValueApply = () => {
    const value = toNumber(input);

    updateTableData(prev =>
      rebuildTree(prev, row.id, node => {
        node.value = value;
        if (node.children) updateChildValues(node, value);
      })
    );
  };

  return (
    <>
      <tr className="data-row">
        <td style={{ paddingLeft: level * 20 }}>
          {row.label}
        </td>

        <td>{row.value.toFixed(2)}</td>

        <td>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </td>

        <td>
          <button onClick={onPercentApply}>%</button>
        </td>

        <td>
          <button onClick={onValueApply}>Val</button>
        </td>

        <td>
          {calculateVariance(row.value, row.originalValue)}
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
    </>
  );
};

export default Row;