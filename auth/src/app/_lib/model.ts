import db from 'better-sqlite3'
import { InputUser, ISession, IUser } from './types'
const sql = new db('auth.db')

export const getUserByLogin = (login:string):(IUser|null) => {
    const user = sql.prepare("SELECT * FROM users where login = ?").get(login)
    if(user){
        return user as IUser
    }
    return null
}

export const getAllUsers = () => {
    return sql.prepare("SELECT * FROM users").all()
}

export const insertUser = (user:InputUser):db.RunResult => {
    return sql.prepare(`INSERT INTO users(name, surname, login, password)
                        VALUES(@name, @surname, @login, @password)                    
    `).run(user)
}


export const createSession = (user:number, token:string) => {
    return sql.prepare(`
        INSERT INTO session(id, user_id, expires)
        VALUES(?,?,?)
    `).run(token, user, Date.now()+5000)
}




export const getSessionByToken = (token: string): ISession | null => {
    const session = sql.prepare(`
        SELECT * FROM session WHERE id = ?
    `).get(token);
    return session ? (session as ISession) : null; 
};


export const updateSessionExpires = (token: string, newExpires: number) => {
    return sql.prepare(`
        UPDATE session SET expires = ? WHERE id = ?
    `).run(newExpires, token)
}


export const getUserById = (userId: number): IUser | null => {
    const user = sql.prepare(`
        SELECT * FROM users WHERE id = ?
    `).get(userId)
    return user ? (user as IUser) : null
}




export const updateUserAttempts = (userId: number, attempts: number, checkTime: number) => {
    const updateUser = sql.prepare(`
        UPDATE users
        SET attempts = ?, checkTime = ?
        WHERE id = ?
    `);
    updateUser.run(attempts, checkTime, userId);
};




