const Note = ({ note, toggleImportance, deleteById }) => {

  return (
    <li className='note'>
      {note.content}
      Name: {note.name}
      Number: {note.number} 
      <button onClick={deleteById}>Delete</button>
    </li>
  )
}

export default Note