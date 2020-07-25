import React, {Fragment, useContext, useEffect} from 'react'
import { Form } from '../components/Form';
import { Notes } from '../components/Notes';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { Loader } from '../components/Loader';
import { AlertContext } from '../context/alert/alertContext';

export const Home = () => {
  const {loading, notes, fetchNotes, removeNote} = useContext(FirebaseContext)
  const alert = useContext(AlertContext)

  const removeItem = (id) => {
    removeNote(id).then(() => alert.show('Note deleted', 'danger'))
  }

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Form/>
      <hr />

      {
        loading
          ? <Loader/>
          : <Notes notes={notes} onRemove={removeItem} />
      }
    </Fragment>
  )
}