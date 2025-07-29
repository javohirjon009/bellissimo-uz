"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"


type LoginStep = "phone" | "verification" | "name"

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [smsCode, setSmsCode] = useState("")
  const [userName, setUserName] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Countdown timer for SMS resend
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [countdown])

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Limit to 9 digits (after +998)
    const limitedDigits = digits.slice(0, 9)

    // Format as (__) ___ __ __
    let formatted = limitedDigits
    if (limitedDigits.length >= 2) {
      formatted = `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2)}`
    }
    if (limitedDigits.length >= 5) {
      formatted = `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 5)} ${limitedDigits.slice(5)}`
    }
    if (limitedDigits.length >= 7) {
      formatted = `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 5)} ${limitedDigits.slice(5, 7)} ${limitedDigits.slice(7)}`
    }

    return formatted
  }

  const handlePhoneSubmit = async () => {
    if (phoneNumber.replace(/\D/g, "").length !== 9) {
      alert("Iltimos, to'liq telefon raqamini kiriting")
      return
    }

    setIsLoading(true)

  
    try {
     
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStep("verification")
      setCountdown(60) // Start 60 second countdown
    } catch (error) {
      alert("SMS yuborishda xatolik yuz berdi")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeSubmit = async () => {
    if (smsCode.length !== 4) {
      alert("4 raqamli kodni kiriting")
      return
    }

    setIsLoading(true)

    try {
   
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStep("name")
    } catch (error) {
      alert("Kod noto'g'ri")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNameSubmit = async () => {
    if (userName.trim().length < 2) {
      alert("Iltimos, ismingizni kiriting")
      return
    }

    setIsLoading(true)

    try {

      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/")
    } catch (error) {
      alert("Ro'yxatdan o'tishda xatolik")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePhone = () => {
    setStep("phone")
    setSmsCode("")
    setUserName("")
    setCountdown(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const resendCode = async () => {
    if (countdown > 0) return

    setIsLoading(true)
    try {
      // Resend SMS code
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCountdown(60)
    } catch (error) {
      alert("SMS qayta yuborishda xatolik")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh"}}>
      <Header cartItemsCount={0} />

      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "40px 20px" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
            Raqamingizni kiriting
          </h1>

          {step === "phone" && (
            <>
              <div style={{ marginBottom: "30px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "12px",
                    padding: "15px 20px",
                    fontSize: "18px",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ color: "#666", marginRight: "10px" }}>+998</span>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                    placeholder="(__) ___ __ __"
                    style={{
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      fontSize: "18px",
                      flex: 1,
                      color: "#333",
                    }}
                    maxLength={15}
                  />
                </div>

                {/* Cloudflare-style verification */}
              </div>

              <button
                onClick={handlePhoneSubmit}
                disabled={isLoading || phoneNumber.replace(/\D/g, "").length !== 9}
                style={{
                  width: "100%",
                  backgroundColor: phoneNumber.replace(/\D/g, "").length === 9 ? "#28a745" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  padding: "15px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: phoneNumber.replace(/\D/g, "").length === 9 ? "pointer" : "not-allowed",
                  transition: "background-color 0.2s",
                }}
              >
                {isLoading ? "Yuborilmoqda..." : "Kodni qabul qilish"}
              </button>
            </>
          )}

          {step === "verification" && (
            <>
              <div style={{ marginBottom: "20px" }}>
                <p style={{ color: "#666", marginBottom: "10px", lineHeight: "1.5" }}>
                  Kabinetga kirish uchun biz kodni ko&apos;rsatilgan telefon raqamga SMS yuboramiz:
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold", fontSize: "16px" }}>+998{phoneNumber.replace(/\D/g, "")}</span>
                  <button
                    onClick={handleChangePhone}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#007bff",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "14px",
                    }}
                  >
                    O&apos;zgartirish
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", textAlign: "left", marginBottom: "10px", fontWeight: "500" }}>
                  Ism
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "16px",
                    marginBottom: "20px",
                    outline: "none",
                  }}
                  placeholder="Ismingizni kiriting"
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>{formatTime(countdown)}</div>
                  <div style={{ color: "#666", fontSize: "14px" }}>SMS kodni kiriting</div>
                </div>

                <input
                  type="text"
                  value={smsCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                    setSmsCode(value)
                  }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "18px",
                    textAlign: "center",
                    letterSpacing: "8px",
                    outline: "none",
                  }}
                  placeholder="____"
                  maxLength={4}
                />
              </div>

              {countdown === 0 && (
                <button
                  onClick={resendCode}
                  disabled={isLoading}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007bff",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}
                >
                  Kodni qayta yuborish
                </button>
              )}

              <button
                onClick={handleCodeSubmit}
                disabled={isLoading || smsCode.length !== 4 || userName.trim().length < 2}
                style={{
                  width: "100%",
                  backgroundColor: smsCode.length === 4 && userName.trim().length >= 2 ? "#28a745" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  padding: "15px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: smsCode.length === 4 && userName.trim().length >= 2 ? "pointer" : "not-allowed",
                  transition: "background-color 0.2s",
                }}
              >
                {isLoading ? "Tekshirilmoqda..." : "Kirish"}
              </button>
            </>
          )}
        </div>
      </div>

    
    </div>
  )
}
