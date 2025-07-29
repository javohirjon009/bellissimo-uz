"use client"

import { useState } from "react"
import { PhoneCall, MapPin, ChevronDown } from "lucide-react"
import { GoChevronDown } from "react-icons/go"
import { TbTruckDelivery } from "react-icons/tb"
import { FaBars, FaTimes } from "react-icons/fa"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./Dropdown-menu"
import { usePathname, useRouter } from "next/navigation"

interface Language {
  code: string
  label: string
  flag: string
}

interface HeaderProps {
  selectedCategory?: string
  categories?: string[]
  onCategoryClick?: (category: string) => void
  cartItemsCount?: number
  onCartClick?: () => void
}

const Header = ({
  selectedCategory = "Kombo",
  categories = [],
  onCategoryClick,
  cartItemsCount = 0,
  onCartClick,
}: HeaderProps) => {
  const [selectedCity, setSelectedCity] = useState<string>("Samarqand")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Uz")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isCartPage = pathname === "/cart"
  const isLoginPage = pathname === "/login"

  const handleLoginClick = () => {
    router.push("/login")
  }
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const cities: string[] = ["Samarqand", "Toshkent", "Buxoro", "Andijon", "Namangan", "Farg'ona", "Nukus"]
  const languages: Language[] = [
    { code: "Uz", label: "Uzbek", flag: "/images/uzFlag.svg" },
    { code: "Ru", label: "Russian", flag: "/images/rusFlag.svg" },
  ]

  return (
    <header className="relative bg-white z-50 w-full border-b border-gray-100">
      <div className="max-w-[1200px] m-auto">
        {/* Top Bar - FAQAT Katta ekranlar uchun */}
        {/* O'ZGARTIRILDI: md:flex -> lg:flex */}
        <div className="hidden lg:flex flex-wrap items-center justify-between gap-2 container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex items-center gap-2">
              <PhoneCall className="color" />
              <span className="cursor-pointer text-xl color font-bold">1174</span>
            </div>
            <div className="flex items-center gap-6">
              <a className="text-sm gray" href="#">Biz Haqimizda</a>
              <a className="text-sm gray" href="#">Bo'sh ish o'rinlari</a>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer">
                <Image
                  src={languages.find((lang) => lang.code === selectedLanguage)?.flag || "/images/uzFlag.svg"}
                  alt="lang"
                  width={22}
                  height={22}
                />
                {selectedLanguage}
                <GoChevronDown />
              </div>
            </DropdownMenuTrigger>
            {/* QO'SHILDI: align="end" menyuni o'ng tomonga to'g'rilaydi */}
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setSelectedLanguage(lang.code)}>
                  <div className="flex items-center gap-2">
                    <Image src={lang.flag || "/placeholder.svg"} alt={lang.label} width={22} height={22} />
                    {lang.code}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Chiziq - FAQAT Katta ekranlar uchun */}
        {/* O'ZGARTIRILDI: md:block -> lg:block */}
        <div className="w-full h-[1px] bg-gray-200 hidden lg:block"></div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-7 flex-wrap">
            <Image
              src="/images/logo_new.svg"
              alt="logo"
              width={150}
              height={50}
              className="w-[120px] sm:w-[150px] h-auto cursor-pointer"
              onClick={() => router.push("/")}
            />

            {/* Katta ekranlar uchun shahar va yetkazib berish (FAQAT lg dan boshlab) */}
            {/* O'ZGARTIRILDI: md:flex -> lg:flex */}
            {!isCartPage && !isLoginPage && (
              <>
                <div className="hidden lg:flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center space-x-2 cursor-pointer hover:text-[#047857] transition-colors">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                          <MapPin className="w-5 h-5 color" />
                        </div>
                        <div className="text-left">
                          <div className="text-xs gray">Shahar:</div>
                          <div className="flex items-center color text-base font-semibold">
                            {selectedCity}
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {cities.map((city) => (
                        <DropdownMenuItem key={city} onClick={() => setSelectedCity(city)}>
                          {city}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="hidden lg:flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <TbTruckDelivery className="color w-6 h-6" />
                  </div>
                  <p className="text-[10px] gray cursor-default leading-tight">
                    35 daqiqa ichida tekin yetkazib <br /> beramiz yoki pitsa bepul
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-5">
            {/* Halol va Bellkoin - FAQAT Katta ekranlar uchun */}
            {/* O'ZGARTIRILDI: md:flex -> lg:flex */}
            {!isCartPage && !isLoginPage && (
              <div className="hidden lg:flex items-center gap-5">
                <a href="#"><Image src="/images/halal.webp" alt="halal" width={40} height={40} /></a>
                <div className="w-0.5 h-[52px] bg-gray-200"></div>
                <div className="flex items-center gap-1">
                  <Image src="/images/download.svg" alt="bellkoin" width={32} height={32} />
                  <span className="text-xl font-bold text-gray-800">{cartItemsCount}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleLoginClick}
              className="bg-[#047857] hover:bg-[#056d4e] cursor-pointer text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              Kirish
            </button>
            {/* Gamburger menyu - Mobil va Planshet uchun */}
            <div className="lg:hidden block cursor-pointer" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes className="text-2xl color" /> : <FaBars className="text-2xl color" />}
            </div>
          </div>
        </div>

        {/* Mobil menyu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white w-full px-4 pb-4 border-t border-gray-200">
             <div className="flex flex-col gap-4 pt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center gap-2">
                         <div className="w-10 h-10 bg-green-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                            <MapPin className="w-5 h-5 color" />
                          </div>
                          <div className="text-left">
                            <div className="text-xs gray">Shahar:</div>
                            <div className="flex items-center color text-base font-semibold">{selectedCity}</div>
                          </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </div>
                  </DropdownMenuTrigger>
                  {/* O'ZGARTIRILDI: Kenglikni avtomatik moslashtirish uchun className olib tashlandi */}
                  <DropdownMenuContent>
                    {cities.map((city) => (
                      <DropdownMenuItem key={city} onClick={() => {setSelectedCity(city); toggleMobileMenu();}}>
                        {city}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-4">
                    <a href="#" className="flex items-center gap-2 p-2 rounded-md bg-gray-50 flex-1 justify-center">
                      <Image src="/images/halal.webp" alt="halal" width={30} height={30} />
                      <span className="font-semibold text-gray-700">Halol</span>
                    </a>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-gray-50 flex-1 justify-center">
                      <Image src="/images/download.svg" alt="bellkoin" width={20} height={20} />
                       <span className="text-lg font-bold text-gray-800">{cartItemsCount} Bellkoin</span>
                    </div>
                 </div>

                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center gap-2">
                            <Image
                              src={languages.find((lang) => lang.code === selectedLanguage)?.flag || "/images/uzFlag.svg"}
                              alt="lang"
                              width={22}
                              height={22}
                            />
                            <span className="font-medium">{languages.find((lang) => lang.code === selectedLanguage)?.label}</span>
                        </div>
                        <GoChevronDown className="w-5 h-5 text-gray-500" />
                      </div>
                    </DropdownMenuTrigger>
                    {/* O'ZGARTIRILDI: Kenglikni avtomatik moslashtirish uchun className olib tashlandi */}
                    <DropdownMenuContent>
                      {languages.map((lang) => (
                        <DropdownMenuItem key={lang.code} onClick={() => {setSelectedLanguage(lang.code); toggleMobileMenu();}}>
                          <div className="flex items-center gap-2">
                            <Image src={lang.flag || "/placeholder.svg"} alt={lang.label} width={22} height={22}/>
                            {lang.label}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="border-t border-gray-200 mt-2 pt-2">
                    <a className="block text-sm gray py-2 hover:text-[#047857]" href="#">Biz Haqimizda</a>
                    <a className="block text-sm gray py-2 hover:text-[#047857]" href="#">Bo'sh ish o'rinlari</a>
                </div>
             </div>
          </div>
        )}

        {/* Kategoriyalar paneli */}
        {!isCartPage && !isLoginPage && categories.length > 0 && (
          <div className="relative w-full bg-white border-b border-t border-gray-200 py-3">
            <div className="container mx-auto px-4 flex items-center justify-between flex-nowrap gap-3">
              <div className="flex gap-2 overflow-x-auto flex-1 no-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategoryClick && onCategoryClick(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? "bg-[#dc3545] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button
                onClick={onCartClick}
                className="bg-[#dc3545] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors hover:bg-[#c82333]"
              >
                Savatcha | {cartItemsCount}
              </button>
            </div>
          </div>
        )}
     </div>
    </header>
  )
}

export default Header