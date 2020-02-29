import React from 'react'

const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        <th>
          <div>
            Firstname
            <button onClick={() => props.toggleListReverse('firstName')}>Sort</button>
          </div>
        </th>
        <th>
          <div>
            Lastname
            <button onClick={() => props.toggleListReverse('lastName')}>Sort</button>
          </div>
        </th>
        <th>
          <div>
            Fullname
            <button onClick={() => props.toggleListReverse('fullName')} >Sort</button>
          </div>
        </th>
        <th>
          <div>
            E-mail
            <button onClick={() => props.toggleListReverse('email')}>Sort</button>
          </div>
        </th>
        <th>
          <div>
            Phone
            <button onClick={() => props.toggleListReverse('phone')}>Sort</button>
          </div>
        </th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  const rows = props.contactData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.firstName}</td>
        <td>{row.lastName}</td>
        <td>{row.fullName}</td>
        <td>{row.email}</td>
        <td>{row.phone}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

const Table = (props) => {
  const { contactData, removeCharacter, toggleListReverse } = props;

  return (
    <table>
      <TableHeader toggleListReverse={toggleListReverse}/>
      <TableBody contactData={contactData} removeCharacter={removeCharacter} />
    </table>
  );
}



export default Table