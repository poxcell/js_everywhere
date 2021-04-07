import React from 'react'

import {useQuery, gql} from '@apollo/client'

import Note  from '../components/Note'

const GET_NOTE = gql`
  query note($id: ID!){
    note(id: $id){
      id 
      createdAt
      content
      favoriteCount
      author{
        username
        id
        avatar
      }
    }
  }
`

const NotePage = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id

  // query hook, passing the id value as a variable
  const{loading, error, data} = useQuery(GET_NOTE, {variables:{id}})

  // if the data is loading, display a loading message
  if(loading) return <p>Loading...</p>

  // if error fetching data display an error
  if(error) return <p>Error! Note not found</p>

  // if data is succesful, display the data in the UI
  return (
    <Note note={data.note}/>
  )
}

export default NotePage