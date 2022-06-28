import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me($id: ID!) {
        me(_id: $id) {
            username
            email
            savedBooks {
                title
                description
                bookId
                image
                link
                authors
            }
        }
    }
`;