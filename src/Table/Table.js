import React from 'react';

export default props => (
    <table className="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
            { props.data.map(item =>(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            ))}
        </tbody>
    </table>
)