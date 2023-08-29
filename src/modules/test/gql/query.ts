import { gql, useLazyQuery, useMutation } from '@apollo/client'

export const GET_RECIPE = gql`
    query Recipe($recipeId: ID!) {
        recipe(id: $recipeId) {
            id
            title
            description
            comments {
            nickname
            content
            date
            }
        }
    }
`

export const CREATE_COMMENT = gql`
    mutation AddNewComment($comment: CommentInput!) {
        addNewComment(comment: $comment)
    }
`

export const COMMENTS_SUBSCRIPTION = gql`
    subscription OnCommentAdded($recipeId: ID!) {
        newComments(recipeId: $recipeId) {
            nickname
            content
            date
        }
    }
`