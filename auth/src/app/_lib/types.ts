export interface IUser{
    id:number
    name:string
    surname:string;
    login:string
    password:string
    attempts: number
    checkTime: number
    
}
export type InputUser = Omit<IUser, 'id' | 'attempts' | 'checkTime'>



export interface ISession {
    id: string;
    user_id: number;
    expires: number;
}