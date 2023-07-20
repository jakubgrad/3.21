import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([
  {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      name: newName,
      number: newNumber,
    }

    if(notes.find(note => note.name === newName)) {
      console.log("Name already in database!")
      const note = notes.find(note => note.name === newName)
      const id = note.id
      noteService
        .update(id, noteObject).then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          const error_message = "400 (Bad request). " + error.response.data.error
          setErrorMessage(
            error_message
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        })

    } else {
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewName('')
      })
      .catch(error => {
        const error_message = "400 (Bad request). " + error.response.data.error
        setErrorMessage(
          error_message
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
        
      

    }
  
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

   const updateNumbdddder = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, number: 2 }
  
      noteService
        .update(id, changedNote).then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }

    const deleteById = id => {
      noteService
        .deleteById(id).then(returnedNote => {
          console.log("Delete note of id ${id}??", returnedNote);
          setNotes(notes.filter(note => note.id != id))
        })
    }

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />
      <ul>
        <ul>
          {notes.map(note => 
            <Note
              key={note.id}
              note={note}
              deleteById={() => deleteById(note.id)}
            />
          )}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input placeholder="Name" value={newName} onChange={handleNameChange} />
        <input placeholder="Number" value={newNumber} onChange={handleNumberChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
