import React from 'react'

import {useQuery, gql} from '@apollo/client'
import Button from '../components/Button'

import NoteFeed from '../components/NoteFeed'

const GET_NOTES = gql`
query noteFeed($cursor: String){
  noteFeed(cursor: $cursor){
    cursor
    hasNextPage
    notes{
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
}
`

const Home = () => {
  // query hook
  const {data, loading, error, fetchMore} = useQuery(GET_NOTES)

  // if loading display a loading message
  if(loading) return <p>Loading...</p>
  // display if there is and eeror fetching the data
  if(error) return <p> Error!</p> 
  return (
    <React.Fragment>
      <NoteFeed notes = {data.noteFeed.notes}/>
      {/* Only display the load more button if hasNextPage is ture */}
      {data.noteFeed.hasNextPage && (
        // on click perform a query, passing the current cursor as a variable 
        <Button
          onClick={() => 
            fetchMore({
              variables:{
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult,{fetchMoreResult}) =>{
                return{
                  noteFeed:{
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    // combine the new results and the old
                    notes:[
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                }
              }
            })
          }
        > Load More</Button>
      )}
    </React.Fragment>
  )
}

export default Home