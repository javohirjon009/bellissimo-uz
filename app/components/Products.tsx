"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { products } from "../data/products";
import type { Product, CartItem } from "../types";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Edit2 } from "lucide-react";

// --- Dinamik Importlar ---
const DynamicProductModal = dynamic(() => import("../components/ProductModal"), {
  ssr: false,
});

// --- Kichik Komponentlar ---

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          quality={95}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
        />
        {/* {product.badge && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">{product.badge}</div>
        )} */}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate transition-colors">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4 flex-grow h-12">{product.description}</p>
        <div className="flex items-center justify-end mt-2">
          <span className="text-lg font-bold text-gray-900 bg-gray-100  transition-all px-4 py-0.5 rounded-full">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

const CategorySection = React.forwardRef<HTMLDivElement, { category: string; products: Product[]; onProductClick: (product: Product) => void }>(
  ({ category, products, onProductClick }, ref) => {
    if (products.length === 0) return null;

    return (
      <section ref={ref} id={category.toLowerCase()} className="mb-16 scroll-mt-28">
        <h2 className="text-3xl text-gray-900 mb-8">{category}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
          ))}
        </div>
      </section>
    );
  }
);
CategorySection.displayName = 'CategorySection';

// --- Asosiy Komponent ---
export default function BellissimoApp() {
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");
  const [selectedCategory, setSelectedCategory] = useState("Kombo");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const categories = ["Kombo", "Pitsa", "Gazaklar", "Ichimliklar", "Salatlar", "Desertlar", "Souslar"];

  const observers = {
    Kombo: useIntersectionObserver({ threshold: 0.2 }),
    Pitsa: useIntersectionObserver({ threshold: 0.2 }),
    Gazaklar: useIntersectionObserver({ threshold: 0.2 }),
    Ichimliklar: useIntersectionObserver({ threshold: 0.2 }),
    Salatlar: useIntersectionObserver({ threshold: 0.2 }),
    Desertlar: useIntersectionObserver({ threshold: 0.2 }),
    Souslar: useIntersectionObserver({ threshold: 0.2 }),
  };

  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem("bellissimo-cart");
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (error) { console.error("Savatni o'qishda xatolik:", error); }
    }
  }, []);

  useEffect(() => {
    const activeObserver = Object.entries(observers).find(([, observer]) => observer.isIntersecting);
    if (activeObserver) {
      setSelectedCategory(activeObserver[0]);
    }
  }, [observers]);

  const handleCategoryClick = (category: string) => {
    document.getElementById(category.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAddToCart = (item: CartItem) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    if (isClient) {
      localStorage.setItem("bellissimo-cart", JSON.stringify(updatedCart));
    }
  };
  
  const getTotalCartItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4">
        {/* O'ZGARTIRILDI: max-w-[1200px] */}
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab("delivery")}
              className={`py-2 px-6 sm:px-12 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'delivery' ? 'bg-white shadow' : 'text-gray-600'}`}
            >
              Yetkazib berish
            </button>
            <button
              onClick={() => setActiveTab("pickup")}
              className={`py-2 px-6 sm:px-12 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'pickup' ? 'bg-white shadow' : 'text-gray-600'}`}
            >
              Olib ketish
            </button>
          </div>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder={activeTab === "delivery" ? "Yetkazib berish manzilini tanlang" : "Olib ketish manzilini tanlang"}
              value={deliveryAddress}
              onClick={() => setShowAddressModal(true)}
              readOnly
              className="w-full p-3 pl-4 pr-12 border-2 border-yellow-300 bg-yellow-50 rounded-lg text-sm cursor-pointer outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Edit2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200">
        {/* O'ZGARTIRILDI: max-w-[1200px] */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-3">
          <div className="flex gap-2.5 overflow-x-auto flex-1 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`py-1.5 px-4 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${selectedCategory === category ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            onClick={() => router.push("/cart")}
            className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-red-700 transition-colors shrink-0"
          >
            Savatcha | {isClient ? getTotalCartItems() : 0}
          </button>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {categories.map(category => (
            <CategorySection
                key={category}
                ref={observers[category as keyof typeof observers].ref}
                category={category}
                products={products.filter(p => p.category === category)}
                onProductClick={(product) => setSelectedProduct(product)}
            />
        ))}
      </main>

      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddressModal(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">{activeTab === "delivery" ? "Manzilni tanlang" : "Olib ketish joyini tanlang"}</h3>
            <div className="flex flex-col gap-2">
              {["Toshkent, Chilonzor tumani", "Toshkent, Yunusobod tumani", "Toshkent, Shayxontohur tumani"].map(address => (
                <button
                  key={address}
                  onClick={() => { setDeliveryAddress(address); setShowAddressModal(false); }}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {address}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <DynamicProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}