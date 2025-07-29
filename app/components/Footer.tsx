"use client"
import Image from "next/image"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { LiaTelegram } from "react-icons/lia"

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "#262A2C",
      color: "white",
      padding: "40px 20px 20px",
      fontFamily: "Gilroy, sans-serif"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "40px"
      }}>
        {/* Left Column - Logo & Phone */}
        <div style={{ minWidth: "200px" }}>
          <Image
            src="/images/logo-footer-new.webp"
            alt="Bellissimo Pizza"
            width={170}
            height={70}
            style={{ marginBottom: "15px" }}
          />
          <div style={{
            fontSize: "12px",
            fontWeight: "500",
            color: "#FFFFFF80"
          }}>
            RAQAMGA QO&apos;NG&apos;IROQ QILING - 1174
          </div>
        </div>

        {/* Middle Column - Links */}
        <div style={{
          display: "flex",
          gap: "60px"
        }}>
          <div>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}>
              <li><a href="#" style={linkStyle}>Biz haqimizda</a></li>
              <li><a href="#" style={linkStyle}>Ommaviy oferta</a></li>
              <li><a href="#" style={linkStyle}>Maxfiylik siyosati</a></li>
              <li><a href="#" style={linkStyle}>Halol sertifikati</a></li>
              <li><a href="#" style={linkStyle}>Restoranlar</a></li>
            </ul>
          </div>
          
          <div>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}>
              <li><a href="#" style={linkStyle}>Bizning ish o&apos;rinlarimiz</a></li>
              <li><a href="#" style={linkStyle}>Franshiza</a></li>
            </ul>
          </div>
        </div>

        {/* Right Column - Social & Payments */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          minWidth: "200px"
        }}>
          {/* Social Icons */}
          <div>
            <div style={{
              fontSize: "14px",
              color: "#FFFFFF80",
              marginBottom: "12px"
            }}>
              Bizni kuzatib boring
            </div>
            <div style={{
              display: "flex",
              gap: "15px"
            }}>
              <a href="#"><FaFacebook size={24} style={iconStyle} /></a>
              <a href="#"><FaInstagram size={24} style={iconStyle} /></a>
              <a href="#"><LiaTelegram size={24} style={iconStyle} /></a>
            </div>
          </div>

          {/* Payment Methods */}
          <div style={{
            display: "flex",
            gap: "15px",
            alignItems: "center"
          }}>
            <Image 
              src="/images/payme-footer.svg"
              alt="Payme"
              width={80}
              height={30}
            />
            <Image 
              src="/images/click-footer.svg"
              alt="Click"
              width={70}
              height={30}
            />
            <Image 
              src="/images/uzcard-footer.svg"
              alt="Uzcard"
              width={50}
              height={25}
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: "1px solid #34495e",
        paddingTop: "20px",
        textAlign: "center",
        fontSize: "14px",
        color: "#FFFFFF80",
        marginTop: "30px",
        maxWidth: "1200px",
        margin: "30px auto 0"
      }}>
        © 2016–2025 Bellissimo Pizza.
      </div>

      {/* Mobile Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          footer > div {
            flex-direction: column;
            gap: 30px;
          }
          footer > div > div:nth-child(2) {
            flex-direction: column;
            gap: 30px;
          }
        }
      `}</style>
    </footer>
  )
}

// Style objects
const linkStyle = {
  color: "#FFFFFF80",
  textDecoration: "none",
  fontSize: "14px",
  transition: "color 0.2s",
}

const iconStyle = {
  color: "#FFFFFF80",
  transition: "color 0.2s",
}