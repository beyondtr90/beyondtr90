"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Image from "next/image";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/manager", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, action: "login" }),
    });

    if (response.ok) {
      router.push("/finance/manage/dashboard");
    } else {
      setError("Unauthorized access");
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.logoWr}>
            <Image
              src={"/images/beyond-logo.png"}
              width={"200"}
              height={"200"}
            ></Image>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWr}>
              <input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Page;
