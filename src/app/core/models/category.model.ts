export default interface Category{
    id: number
    name: String
    image: String
}

export type CategoryCreate = Omit<Category, 'id'>;
export type CategoryUpdate = Partial<Category>;