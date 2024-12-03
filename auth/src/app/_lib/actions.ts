"use server"

import { redirect } from "next/navigation"
import { createSession, getSessionByToken, getUserById, getUserByLogin, insertUser, updateSessionExpires, updateUserAttempts } from "./model"
import bcrypt from 'bcrypt'
import { nanoid } from "nanoid"
import { cookies } from "next/headers"
import { IUser } from "./types"

interface IState{
    message:string
}

export const handleSignup = async (prevState:IState,form:FormData) => {
    const name = form.get("name") as string
    const surname = form.get("surname") as string
    const login = form.get("login") as string
    let password = form.get("password") as string

    if(!name.trim() || !surname.trim() || !login.trim() || !password.trim()){
        return {message:"Please fill all the fields"}
    }

    if(password.length < 6){
        return {message:"Password is too short!!!"}
    }

    const found = getUserByLogin(login)
    if(found){
        return {message:"Login is busy!"}
    }

    password = await bcrypt.hash(password,10)

    const result = insertUser({login, password, name, surname})
    if(result.changes){
        return redirect("/profile")
    }else{
        return {message:"Internal server error!"}
    }
}




export const handleLogin = async (state:IState, form:FormData) => {
    const login = form.get("login") as string
    const password = form.get("password") as string
    const found = getUserByLogin(login) 
    if(!found) {
        return {message:"Login is wrong"}
    }


    const currentTime = Date.now()

    if (found.attempts >= 3) {
        if (currentTime - found.checkTime < 20000) {
            const remainingTime = Math.ceil((20000 - (currentTime - found.checkTime)) / 1000);
            return { message: `Account is locked. Try again in ${remainingTime} seconds.` };
        } else {
            updateUserAttempts(found.id, 0, 0);
        }
    }
    const result = await bcrypt.compare(password, found.password);
    if (!result) {
        const newAttempts = found.attempts + 1;
        if (newAttempts >= 3) {
            updateUserAttempts(found.id, newAttempts, currentTime);
            return { message: "Account is locked. Try again in 20 seconds." };
        }
        updateUserAttempts(found.id, newAttempts, found.checkTime);
        return { message: `Wrong password. You have ${3 - newAttempts} attempts left.` };
    }

    updateUserAttempts(found.id, 0, 0);

    const token = nanoid()
    createSession(found.id, token);
    (await cookies()).set("token", token)
    
    return redirect("/profile")
}








export const verifyUser = async (): Promise<{message:string, user:IUser | null}> => {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return {message:"unauthorized", user:null}; 
    }

    const session = getSessionByToken(token);

    if (!session || session.expires < Date.now()) {
        return {message:"Token expired", user:null}
    }

    const newExpires = Date.now() + 5000; 
    updateSessionExpires(token, newExpires);

    const user =  getUserById(session.user_id);
    if(!user) {
        return {message:"user not found", user:null}

    }
    return {message:"authorized", user}
};