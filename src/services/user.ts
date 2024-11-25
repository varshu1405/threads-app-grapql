import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from 'node:crypto'
import  JWT  from "jsonwebtoken";

const SECRET = "123456"

export interface CreateUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface GetUserTokenPayload{
    email: string;
    password: string;

}

class UserService {

    private static generateHash(salt: string, password: string){
        const hashedPassword = createHmac('sha256', salt)
        .update(password)
        .digest('hex')
       return hashedPassword
    }

    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload
        const salt = randomBytes(32).toString('hex');
         
          const hashedPassword = UserService.generateHash(salt,password)
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword
            }
        });
    }
   
    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({where:{email}})
    }

    public static async getUserToken(payload: GetUserTokenPayload){

        const {email, password} = payload

        const user = await UserService.getUserByEmail(email);

        if(!user)throw new Error ("User not found")

            const userSalt = user.salt

            const userHashPassword = UserService.generateHash(userSalt, password)

            if(userHashPassword !== user.password){
                throw new Error ('Incorrect Password')
            }

            // if password correct then generate token

            const token = JWT.sign({id: user.id, email : user.email}, SECRET)
            return token
    }   

    public static async getUsers(){
        return prismaClient.user.findMany()
    }

}

export default UserService;