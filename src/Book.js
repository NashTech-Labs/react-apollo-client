import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query
const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;
const Books = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h2>Books List</h2>
        <ul>
          {data.books.map((book, index) => (
            <li key={index}>
              {book.title} by {book.author}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default Books