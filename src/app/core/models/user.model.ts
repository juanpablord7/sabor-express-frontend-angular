export default interface User{
    id: number
    name: string
    username: string
    email: string
    role: number
}

export type UserCreate = Omit<User, 'id'>;
export type UserUpdate = Partial<User>;