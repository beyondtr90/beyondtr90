"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LogoutButton = () => {
    const router = useRouter();
    const URL = process.env.NEXT_PUBLIC_BASE_URL;

    async function handleLogout(event) {
        event.preventDefault();
    
        try {
            const response = await fetch(`${URL}/api/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data.message);
            router.push("/login");
            window.location.reload();
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    
    return (
        <Link href="#" onClick={handleLogout} className="logout-button">
            Oturumu Kapat
            <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/forward--v1.png"
                alt="forward--v1"
            />
        </Link>
    );
};

export default LogoutButton;
