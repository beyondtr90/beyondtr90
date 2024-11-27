"use client";
import React, { useState, useEffect } from 'react';

function Copier({ invitationCode }) {
  const textToCopy = `https://beyondtr90.vercel.app/register?code=${invitationCode}`;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch(err => {
        console.error('Kopyalama işlemi başarısız:', err);
      });
  };

  return (
    <div id="invitation-code" onClick={handleCopy} style={{ cursor: 'pointer' }}>
      <span onClick={handleCopy}>Referans Linki: {textToCopy}</span>
      <div className="copybtn">Kopyalamak için tıkla</div>
      {isCopied && (
        <div className="modal">
          <p>Metin kopyalandı!</p>
        </div>
      )}
      <style jsx>{`
        .modal {
          position: fixed;
          top: 50vh;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          z-index: 1000;
        }
        .copybtn{
            font-size: large;
            color: #5a6706;
        }
      `}</style>
    </div>
  );
}

export default Copier;
