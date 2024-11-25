import UserService, { CreateUserPayload } from "../../services/user"

const queries ={
    getUserToken: async (_:any, payload:{email:string, password: string}) =>{
        const token = await UserService.getUserToken({
            email: payload.email,
            password: payload.password
        })
        return token
    },
    // getLoggedInUser: async(_:any,payload:{})=>{
       
    //     const user = {}
        
    //     return user
    // }


    getUsers :async() =>{
    const data = await UserService.getUsers()
    return data
  }

}

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
      const res = await UserService.createUser(payload);
      return res.id;
    },
  };

export const resolvers = {queries, mutations} 