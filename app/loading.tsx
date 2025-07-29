"use client"
import Image from "next/image"


import { useEffect, useState } from "react"

export default function Loading() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(220, 53, 69, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(40, 167, 69, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      {/* Main Loading Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {/* Animated Pizza Logo */}
        <div
          style={{
            position: "relative",
            marginBottom: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
            <div>
                            <Image src="/images/pizza404.webp" alt="pizza" width={100} height={60} className="w-[100px] h-auto" />
            </div>
        </div>

        {/* Brand Name */}
        <div style={{ marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#dc3545",
              marginBottom: "8px",
              textShadow: "0 2px 4px rgba(220, 53, 69, 0.2)",
            }}
          >
            Bellissimo
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#666",
              fontWeight: "500",
            }}
          >
            Pizza
          </p>
        </div>

        {/* Loading Text */}
        <div
          style={{
            fontSize: "20px",
            color: "#2c3e50",
            fontWeight: "600",
            marginBottom: "30px",
          }}
        >
          Yuklanmoqda{dots}
        </div>

        {/* Loading Bar */}
        <div
          style={{
            width: "100%",
            height: "6px",
            backgroundColor: "#e9ecef",
            borderRadius: "3px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #dc3545, #28a745, #ffc107, #dc3545)",
              backgroundSize: "200% 100%",
              animation: "loading 2s ease-in-out infinite",
              borderRadius: "3px",
            }}
          />
        </div>

        {/* Loading Message */}
        <p
          style={{
            fontSize: "16px",
            color: "#7f8c8d",
            lineHeight: "1.5",
          }}
        >
          Eng mazali pitsalarni tayyorlayapmiz...
        </p>
      </div>

      {/* Floating Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          fontSize: "30px",
          animation: "float 3s ease-in-out infinite",
          opacity: 0.6,
        }}
      >
        🍕
      </div>
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "15%",
          fontSize: "25px",
          animation: "float 3s ease-in-out infinite 1s",
          opacity: 0.6,
        }}
      >
        🧀
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "20%",
          fontSize: "28px",
          animation: "float 3s ease-in-out infinite 2s",
          opacity: 0.6,
        }}
      >
        🍅
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          right: "10%",
          fontSize: "22px",
          animation: "float 3s ease-in-out infinite 0.5s",
          opacity: 0.6,
        }}
      >
        🌶️
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 28px !important;
          }
          .loading-text {
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  )
}
