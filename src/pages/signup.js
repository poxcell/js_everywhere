import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useMutation, useApolloClient,gql} from '@apollo/client'

import UserForm from '../components/UserForm'


const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!){
    signUp(email: $email, username: $username, password: $password)
  }
`

const SignUp = props => {
    // Apollo client
  const client = useApolloClient()
  // Mutation Hook

  // mutation hook
  const [signUp,{loading,error}] = useMutation(SIGNUP_USER,{
    onCompleted: data => {
      // store the token
      localStorage.setItem('token', data.signUp)
      // update the local cache
      client.writeData({data:{isLoggedIn: true}})
      // redirect the user to the homepage
      props.history.push('/')
    }
  })

  // change page title
  useEffect(() => {
    document.title = 'Sign up - Notedly'
  })

  return (
    <React.Fragment>
      <UserForm action={signUp} formType='signup'/>
      {/* if the data is loading, display a loading message */}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display an error message */}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  )
}

export default SignUp