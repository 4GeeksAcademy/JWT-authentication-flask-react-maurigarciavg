import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate("/login");
        }
    }, [store.token]);

    return (
        <div className="container mt-5">
            <h1>Bienvenido a la zona VIP 😎</h1>
            <p>Si puedes leer esto, es porque tu token es válido.</p>
        </div>
    );
};