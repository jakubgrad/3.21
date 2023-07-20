const Entry = ({ entry, toggleImportance, deleteById }) => {

  return (
    <li className='note'>
      {entry.content}
      Name: {entry.name}
      Number: {entry.number} 
      <button onClick={deleteById}>Delete</button>
    </li>
  )
}

export default Entry