export default interface User{
    id: number
    name: String
    username: String
    email: String
    role: number
}

export type UserCreate = Omit<User, 'id'>;
export type UserUpdate = Partial<User>;