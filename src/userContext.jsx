import { Context } from './myContext';
import React from 'react'
import { useEffect, useState } from "react";

const Usercontext = ({ children }) => {
    const [signIn, setsignIn] = useState(false)
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");

    useEffect(() => {
        const item1 = localStorage.getItem('Name');
        const item2 = localStorage.getItem('Password');
        const item3 = localStorage.getItem('login');
        if (item1) {
            setName(JSON.parse(item1));
        }
        if (item2) {
            setPwd(JSON.parse(item2));
        }
        if (item3) {
            setsignIn(JSON.parse(item3));
        }
    }, []);
    return (
        <Context.Provider value={{
            name, setName, pwd,
            setPwd, signIn, setsignIn
        }}>
            {children}

        </Context.Provider>
    )
}

export default Usercontext