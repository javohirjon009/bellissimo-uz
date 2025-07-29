export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  badge?: string
  image: string
  category: string
  sizes?: ProductSize[]
  ingredients?: Ingredient[]
  crustTypes?: CrustType[]
}

export interface ProductSize {
  id: string
  name: string
  priceModifier: number
}

export interface Ingredient {
  id: string
  name: string
  price: number
  image: string
}

export interface CrustType {
  id: string
  name: string
  priceModifier: number
}

export interface CartItem {
  id: string
  productId: number
  product: Product
  quantity: number
  selectedSize?: string
  selectedCrust?: string
  selectedIngredients: string[]
  totalPrice: number
}
