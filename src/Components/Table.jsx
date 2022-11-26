import "../css/Table.css";

function Table({ children, th3, th4, th5, th6 }) {
    return (
        <table>
            <thead className="itemHeadTable">
                <tr>
                    <th></th>
                    <th></th>
                    <th>{th3}</th>
                    <th>{th4}</th>
                    <th>{th5}</th>
                    <th>{th6}</th>
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
}
export { Table };
