export default interface Product{
    id: number
    name: string
    price: number
    category: number
    image: string
}

export interface CreateProductSchema{
    name: string
    price: number
    category: number
    image: string
}