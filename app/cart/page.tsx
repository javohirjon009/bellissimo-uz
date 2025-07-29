"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { CartItem, Product } from "../types"
import { products } from "../data/products"
import Header from "../components/Header"

// --- YORDAMCHI ELEMENTLAR VA HOOK'LAR ---

const LOCAL_STORAGE_KEY = "bellissimo-cart"

const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    if (typeof window === "undefined") return
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return size
}

const formatPrice = (price: number) => price.toLocaleString("uz-UZ") + " so'm"

// --- KICHIK KOMPONENTLAR ---

const EmptyCart = ({ onGoToHome }: { onGoToHome: () => void }) => (
  <div style={{ textAlign: "center", padding: "80px 20px", backgroundColor: "#fff", borderRadius: "16px" }}>
    <h2 style={{ fontSize: "24px", color: "#666", marginBottom: "20px" }}>Savatcha bo&apos;sh</h2>
    <button onClick={onGoToHome} style={{ backgroundColor: "#e02c36", color: "white", border: "none", borderRadius: "25px", padding: "15px 30px", fontSize: "16px", fontWeight: 600, cursor: "pointer" }}>
      Buyurtma berish
    </button>
  </div>
)

const CartItemView = ({ item, onUpdate, onRemove, isMobile }: { item: CartItem, onUpdate: (id: string, q: number) => void, onRemove: (id: string) => void, isMobile: boolean }) => {
  const baseStyle = {
    container: { backgroundColor: "white", borderRadius: "15px", padding: "20px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
    image: { width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" as const },
    details: { flex: 1, minWidth: "100px" }, // Minimal kenglikni kamaytirdim
    controls: { display: "flex", alignItems: "center", gap: "15px" }
  }

  const mobileStyle = {
    container: { flexDirection: 'column' as const, alignItems: 'stretch' },
    image: { alignSelf: 'center' },
    details: { textAlign: 'center' as const, marginTop: '10px' },
    // YECHIM: Elementlar sig'maganda qatorga bo'linishi uchun 'wrap' qo'shildi
    controls: { justifyContent: 'space-between', marginTop: '15px', flexWrap: 'wrap' as const, gap: '10px' }
  }

  return (
    <div style={{ ...baseStyle.container, ...(isMobile && mobileStyle.container) }}>
      <img src={item.product.image || "/placeholder.svg"} alt={item.product.name} style={{ ...baseStyle.image, ...(isMobile && mobileStyle.image) }} />
      <div style={{ ...baseStyle.details, ...(isMobile && mobileStyle.details) }}>
        {/* YECHIM: Uzun nomlar sig'ishi uchun wordBreak qo'shildi */}
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "5px", wordBreak: 'break-word' }}>{item.product.name}</h3>
        <div style={{ fontSize: "14px", color: "#666" }}>
          {item.selectedSize && item.product.sizes?.find((s) => s.id === item.selectedSize)?.name}
          {item.selectedCrust && `, ${item.product.crustTypes?.find((c) => c.id === item.selectedCrust)?.name}`}
        </div>
      </div>
      <div style={{ ...baseStyle.controls, ...(isMobile && mobileStyle.controls) }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#f1f1f1", borderRadius: "20px", padding: "4px" }}>
          <button onClick={() => onUpdate(item.id, item.quantity - 1)} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "none", backgroundColor: "white", cursor: "pointer", fontSize: "20px" }}>−</button>
          <span style={{ fontSize: "18px", fontWeight: 500, minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
          <button onClick={() => onUpdate(item.id, item.quantity + 1)} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "none", backgroundColor: "white", cursor: "pointer", fontSize: "20px" }}>+</button>
        </div>
        {/* YECHIM: Mobil qurilmada minWidth olib tashlandi */}
        <div style={{ fontSize: "18px", fontWeight: "bold", minWidth: isMobile ? "auto" : "100px", textAlign: "right" }}>
          {formatPrice(item.totalPrice * item.quantity)}
        </div>
      </div>
    </div>
  )
}

const RecommendedItemView = ({ product, onAdd }: { product: Product, onAdd: (p: Product) => void }) => (
   <div onClick={() => onAdd(product)} style={{ backgroundColor: "white", borderRadius: "15px", padding: "20px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", cursor: "pointer", transition: "transform 0.2s", }}>
      <img src={product.image || "/placeholder.svg"} alt={product.name} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px" }}/>
      <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "5px", wordBreak: 'break-word' }}>{product.name}</div>
      <div style={{ fontSize: "14px", fontWeight: "bold" }}>{formatPrice(product.price)}</div>
    </div>
)

const OrderSummary = ({ totalPrice, cartItemCount, promoCode, onPromoCodeChange, isMobile }: { totalPrice: number, cartItemCount: number, promoCode: string, onPromoCodeChange: (val: string) => void, isMobile: boolean }) => (
  <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", position: isMobile ? "static" : "sticky", top: "20px", marginTop: isMobile ? "40px" : "0" }}>
    <div style={{ marginBottom: "25px" }}>
      <div style={{ fontSize: "16px", fontWeight: 500, marginBottom: "10px" }}>Promokodni kiritish</div>
      {/* YECHIM: Mobil qurilmada ustun shakliga o'tish */}
      <div style={{ display: "flex", gap: "10px", flexDirection: isMobile ? 'column' : 'row' }}>
        <input type="text" value={promoCode} onChange={(e) => onPromoCodeChange(e.target.value)} style={{ flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" }} placeholder="Promokod"/>
        <button style={{ backgroundColor: "#f8f9fa", border: "1px solid #ddd", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px" }}>Qo&apos;llash</button>
      </div>
    </div>
    <div style={{ borderTop: "1px solid #e9ecef", paddingTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ fontSize: "14px", color: "#666" }}>Yetkazib berish</span>
        <span style={{ fontSize: "14px", color: "#28a745", fontWeight: 500 }}>Bepul</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "18px", fontWeight: "bold" }}>
        <span>Umumiy narx</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <button disabled={cartItemCount === 0} style={{ width: "100%", backgroundColor: cartItemCount > 0 ? "#28a745" : "#e9ecef", color: cartItemCount > 0 ? "white" : "#6c757d", border: "none", borderRadius: "25px", padding: "15px", fontSize: "16px", fontWeight: 600, cursor: cartItemCount > 0 ? "pointer" : "not-allowed" }}>
        Keyingisi
      </button>
    </div>
  </div>
)


// --- ASOSIY KOMPONENT ---

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const router = useRouter()
  const { width } = useWindowSize()
  const isMobile = width < 992;

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY)
      setCartItems(savedCart ? JSON.parse(savedCart) : [])
    } catch (error) {
      console.error("Savatchani o'qishda xatolik:", error)
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }, [])

  const updateCartInStorage = (cart: CartItem[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart))
  }

  const removeItem = useCallback((itemId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== itemId)
      updateCartInStorage(updated)
      return updated
    })
  }, [])

  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      return
    }
    setCartItems((prev) => {
      const updated = prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      updateCartInStorage(updated)
      return updated
    })
  }, [removeItem])

  const addRecommendedToCart = useCallback((product: Product) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`, productId: product.id, product, quantity: 1,
      selectedSize: "", selectedCrust: "", selectedIngredients: [], totalPrice: product.price,
    }
    setCartItems((prev) => {
      const updated = [...prev, newItem]
      updateCartInStorage(updated)
      return updated
    })
  }, [])
  
  const totalPrice = useMemo(() => cartItems.reduce((total, item) => total + item.totalPrice * item.quantity, 0), [cartItems])

  const recommendedProducts = useMemo(() => {
    const gazaklar = products.filter((p) => p.category === "Gazaklar").slice(0, 4)
    const souslar = products.filter((p) => p.category === "Souslar").slice(0, 1)
    return [...souslar, ...gazaklar]
  }, [])

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Header />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "20px 15px" : "30px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: "40px", alignItems: "start" }}>
          
          <section>
            {cartItems.length === 0 ? (
              <EmptyCart onGoToHome={() => router.push("/")} />
            ) : (
              <>
                {cartItems.map((item) => (
                  <CartItemView key={item.id} item={item} onUpdate={updateQuantity} onRemove={removeItem} isMobile={isMobile} />
                ))}

                <div style={{ marginTop: "40px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "20px" }}>Qo&apos;shishni maslahat beramiz</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" }}>
                  
                    {recommendedProducts.map((product, index) => (
                      <RecommendedItemView key={`${product.id}-${index}`} product={product} onAdd={addRecommendedToCart} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>

          <aside>
            <OrderSummary totalPrice={totalPrice} cartItemCount={cartItems.length} promoCode={promoCode} onPromoCodeChange={setPromoCode} isMobile={isMobile} />
          </aside>
        </div>
      </main>
    </div>
  )
}