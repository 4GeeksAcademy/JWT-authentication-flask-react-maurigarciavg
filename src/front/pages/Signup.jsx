import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        };

        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", opts);

            if (resp.status === 200) {
                alert("¡Usuario creado con éxito! 🎉");
                navigate("/login");
            } else {
                const errorData = await resp.json();
                console.log("Error detallado del servidor:", errorData);
                alert("Error: " + (errorData.msg || "Fallo en el registro"));
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};