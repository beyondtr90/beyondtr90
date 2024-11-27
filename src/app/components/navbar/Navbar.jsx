"use client";
import React from "react";
import { useRouter } from "next/navigation";
import NavbarStyle from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const router = useRouter();

  return (
    <nav className={NavbarStyle.nav}>
      <div className={NavbarStyle.topBar}>
        <div className={NavbarStyle.logo}>
          <Image
            src={"/images/beyond-logo.png"}
            width={"200"}
            height={"200"}
          ></Image>
        </div>
        <Link href="/notifications" className={NavbarStyle.notification}>
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/sf-regular-filled/48/appointment-reminders.png"
            alt="appointment-reminders"
          />
        </Link>
      </div>

      <div className={NavbarStyle.navigationButtons}>
        <button onClick={() => router.back()} className={NavbarStyle.navButton}>
          <img src="https://img.icons8.com/ios-filled/50/back.png" alt="back" />
        </button>
        <button
          onClick={() => router.forward()}
          className={NavbarStyle.navButton}
        >
          <img
            src="https://img.icons8.com/ios-filled/50/forward.png"
            alt="forward"
          />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
