"use client"

import { useState, useEffect } from "react"
import type { Product, CartItem } from "../types" 
import Image from "next/image"
import { X, Plus } from "lucide-react"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (item: CartItem) => void
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  
  const [selectedSize, setSelectedSize] = useState<string>("Kichkina") 
  const [selectedCrust, setSelectedCrust] = useState<string>("Qalin") 
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1) 

  useEffect(() => {
    if (product && isOpen) {
      setSelectedSize(product.sizes?.[0]?.name || "Kichkina")
      setSelectedCrust(product.crustTypes?.[0]?.name || "Qalin")
      setSelectedIngredients([])
      setQuantity(1)
    }
  }, [product, isOpen])

  if (!isOpen || !product) return null

  const calculateTotalPrice = () => {
    let total = product.price
    selectedIngredients.forEach((ingredientId) => {
        const ingredient = product.ingredients!.find((i) => i.id === ingredientId)
        if (ingredient) total += ingredient.price
    })
    return total * quantity
  }

  const handleIngredientToggle = (ingredientId: string) => {
    if (selectedIngredients.length >= 15 && !selectedIngredients.includes(ingredientId)) {
      return 
    }
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId) ? prev.filter((id) => id !== ingredientId) : [...prev, ingredientId],
    )
  }

  const handleAddToCart = () => {
    const uniqueId = `${product.id}-${selectedSize}-${selectedCrust}-${selectedIngredients.sort().join(",")}`
    
    const cartItem: CartItem = {
      id: uniqueId,
      productId: product.id,
      product: product,
      quantity,
      selectedSize,
      selectedCrust,
      selectedIngredients,
      totalPrice: calculateTotalPrice(),
    }
    onAddToCart(cartItem)
    onClose()
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("de-DE") + " so'm" 
  }

  // --- RENDER ---
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] grid grid-cols-1 lg:grid-cols-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
     
        <div className="relative p-6 sm:p-8 flex flex-col items-center text-center lg:text-left lg:items-start order-2 lg:order-1">
          <div className="relative w-full max-w-xs sm:max-w-sm mx-auto mb-4">
             <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-auto"
            />
        
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-500 mt-2 mb-4">{product.description}</p>
          
          <div className="text-sm text-gray-600 space-y-1 mb-6 w-full">
              <p><span className="font-medium">Tanlangan bort:</span> {selectedCrust || 'Mavjud emas'}</p>
              <p><span className="font-medium">Masalliqlar:</span> {selectedIngredients.length > 0 ? `${selectedIngredients.length} ta tanlangan` : 'Tanlanmagan'}</p>
          </div>

          <p className="mt-auto text-4xl font-extrabold text-gray-900">{formatPrice(calculateTotalPrice())}</p>
        </div>

      
        <div className="relative p-6 sm:p-8 flex flex-col space-y-6 overflow-y-auto order-1 lg:order-2">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Pitsa Kattaligi */}
            <div className="space-y-3">
                <h3 className="font-bold text-lg text-gray-800">Pitsa kattaligi</h3>
                <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-full">
                    {product.sizes?.map((size) => (
                        <button key={size.id} onClick={() => setSelectedSize(size.name)} className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-colors ${selectedSize === size.name ? 'bg-white shadow' : 'text-gray-500 hover:bg-gray-200'}`}>
                            {size.name}
                        </button>
                    ))}
                </div>
            </div>

          
            <div className="flex items-center gap-2">
                {product.crustTypes?.map((crust) => (
                    <button key={crust.id} onClick={() => setSelectedCrust(crust.name)} className={`w-full p-1 rounded-full text-sm font-medium transition-all duration-200 border-2 ${selectedCrust === crust.name ? (crust.name === "Bort qo'shish" ? 'bg-yellow-100 border-yellow-400 text-yellow-800' : 'bg-gray-200 border-gray-400') : 'border-transparent bg-gray-100 text-gray-500 hover:border-gray-300'}`}>
                        <div className="flex items-center justify-center gap-2 py-1.5 px-3">
                           {crust.name === "Bort qo'shish" && <span className="text-yellow-500">✓</span>}
                           {crust.name}
                        </div>
                    </button>
                ))}
            </div>

            
            <div className="flex-grow space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-800">Masalliqlarni tanlang</h3>
                    <div className="bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                        {selectedIngredients.length} / 15
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.ingredients?.map((ing) => {
                        const isSelected = selectedIngredients.includes(ing.id);
                        return (
                            <div key={ing.id} onClick={() => handleIngredientToggle(ing.id)} className={`relative p-3 bg-white rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-green-500' : 'border-gray-100 hover:border-gray-300'}`}>
                                <button className={`absolute top-2 left-2 w-6 h-6 flex items-center justify-center rounded-md transition-colors ${isSelected ? 'bg-green-500' : 'bg-gray-100'}`}>
                                    <Plus className={`w-4 h-4 transition-transform duration-200 ${isSelected ? 'text-white rotate-45' : 'text-gray-500'}`} />
                                </button>
                                <Image src={ing.image} alt={ing.name} width={80} height={80} className="w-16 h-16 mx-auto mt-2 mb-2 object-contain" />
                                <p className="text-center text-xs font-semibold text-gray-700 leading-tight">{ing.name}</p>
                                <p className="text-center text-xs text-gray-500 mt-1">{formatPrice(ing.price)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            
           
            <button 
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-full hover:bg-green-700 transition-colors shadow-lg shadow-green-500/20 active:scale-[0.98]">
                Savatga qo&apos;shish
            </button>
        </div>
      </div>
    </div>
  )
}