import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback((token, id, username) => {
        setToken(token);
        setUserId(id);
        setUsername(username);
        localStorage.setItem(
            storageName,
            JSON.stringify({ userId: id, token: token, username: username})
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUsername(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId, data.username);
        }
        setReady(true);
    }, [login]);

    return { login, logout, token, userId, ready, username};
};