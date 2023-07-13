import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput!){
        createUser(user: $user){
            email
            username  
        }
    }
`

export const useSignUp = (callback: any) => {
    return useMutation(CREATE_USER, {
        onCompleted: (res: any) => {
            if(res.createUser) {
                callback(res.createUser)
            }
        },
        onError: (err: any) => {
            console.log(err)
        }
    })
}