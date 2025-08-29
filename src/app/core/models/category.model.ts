export default interface Category{
    id: number
    name: string
    image: string
}

export type CategoryCreate = Omit<Category, 'id'>;
export type CategoryUpdate = Partial<Category>;