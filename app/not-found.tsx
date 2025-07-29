"use client"

import { useRouter } from "next/navigation"
import Header from "./components/Header"
import Image from "next/image"

export default function NotFound() {
  const router = useRouter()

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <>
      <Header />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding:"30px 0",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      
      {/* 404 with Pizza */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
              <Image src="/images/images-removebg-preview.png" alt="404" width={100} height={60} className="w-[160px] h-auto" />

       
              <Image src="/images/pizza404.webp" alt="pizza" width={100} height={60} className="w-[100px] h-auto" />
        

              <Image src="/images/images-removebg-preview.png" alt="404" width={100} height={60} className="w-[160px] h-auto" />
        
      </div>

      {/* Error Messages */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          maxWidth: "500px",
        }}
      >
        <p
          style={{
            fontSize: "17px",
            marginBottom: "10px",
          }}
        >
          Aftidan, siz mavjud bo'lmagan sahifaga kirdingiz :)
        </p>
        <p
          style={{
            fontSize: "16px",
          }}
        >
          Keling, biz bu yerdan chiqishga yordam beramiz.
        </p>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={handleGoHome}
        style={{
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "25px",
          padding: "10px 80px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.3s ease",
        //   boxShadow: "0 4px 15px rgba(44, 62, 80, 0.2)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#2f3031ff"
          e.currentTarget.style.transform = "translateY(-2px)"
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(44, 62, 80, 0.3)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "black"
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(44, 62, 80, 0.2)"
        }}
      >
        Bosh menyuga qaytish
      </button>

      <style jsx>{`
        @media (max-width: 768px) {
          .error-404 {
            font-size: 80px !important;
          }
          .pizza-icon {
            width: 70px !important;
            height: 70px !important;
          }
          .pizza-base {
            width: 60px !important;
            height: 60px !important;
          }
          p {
            font-size: 16px !important;
          }
          button {
            padding: 12px 30px !important;
            font-size: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .error-404 {
            font-size: 60px !important;
          }
          .pizza-icon {
            width: 50px !important;
            height: 50px !important;
          }
          .pizza-base {
            width: 45px !important;
            height: 45px !important;
          }
        }
      `}</style>
    </div>
    </>
  )
}
