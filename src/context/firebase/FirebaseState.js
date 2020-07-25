import React from 'react'
import axios from 'axios'
import { FirebaseContext } from "./firebaseContext"
import { useReducer } from "react"
import { firebaseReducer } from './firebasceReducer'
import { SHOW_ALERT, REMOVE_NOTE, ADD_NOTE, FETCH_NOTES } from '../types';

const url = 'https://react-notes-app-a0928.firebaseio.com'

export const FirebaseState = ({children}) => {
  const initialState = {
    notes: [],
    loading: false
  }
  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const showLoader = () => dispatch({type: SHOW_ALERT})

  const addNote = async title => {
    const note = {
      title, date: new Date().toJSON()
    }

    try {
      const res = await axios.post(`${url}/notes.json`, note)

      const payload = {
        ...note,
        id: res.data.name
      }

      dispatch({
        type: ADD_NOTE,
        payload
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  const fetchNotes = async () => {
    showLoader()
    const res = await axios.get(`${url}/notes.json`)

    const payload = !res.data ? [] : Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    })

    dispatch({
      type: FETCH_NOTES,
      payload
    })
  }

  const removeNote = async id => {
    await axios.delete(`${url}/notes/${id}.json`)
    return dispatch({type: REMOVE_NOTE, payload: id})
  }

  return (
    <FirebaseContext.Provider value={{
      showLoader, addNote, removeNote, fetchNotes,
      loading: state.loading,
      notes: state.notes
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}