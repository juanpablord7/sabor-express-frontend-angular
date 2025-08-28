export default interface Product{
    id: number
    name: string
    price: number
    category: number
    image: string
}

export type ProductCreate = Omit<Product, 'id'>;
export type ProductUpdate = Partial<Product>;