import './Table.css';

export default function Table({ data }) {
    return (
        <div id='table-container'>
            <table>
                {Object.entries(data).map(pair => (
                    <tr>
                        <th>{pair[0]}</th>
                        <td>{pair[1]}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}