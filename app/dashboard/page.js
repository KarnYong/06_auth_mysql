"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // load the logged-in user from the API
  useEffect(() => {
    fetch("/api/me")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  // ask the server to delete the cookie, then go to the login page
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="auth-box">
      <h1>Dashboard</h1>
      <p>Welcome, {user.fullname}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
