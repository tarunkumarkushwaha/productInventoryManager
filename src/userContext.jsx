import { Context } from './myContext';
import React from 'react'
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchData, createData, patchData, deleteData } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const Usercontext = ({ children }) => {
    const [signIn, setsignIn] = useState(false)
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [dark, setdark] = useState(false)
    const [Products, setProducts] = useState()
    const [formData, setformData] = useState()
    const [completedorderData, setcompletedorderData] = useState()
    const queryClient = useQueryClient();

    const createdata = useMutation({
        mutationFn: createData,
        onSuccess: () => {
            queryClient.invalidateQueries(['events']);
        },
    });

    const patchdata = useMutation({
        mutationFn: patchData,
        onSuccess: () => {
            queryClient.invalidateQueries(['events']);
        },
    });

    const deletedata = useMutation({
        mutationFn: deleteData,
        onSuccess: () => {
            queryClient.invalidateQueries(['events']);
        },
    });

    const themeChange = () => {
        dark ? localStorage.setItem('Theme', JSON.stringify(false)) : localStorage.setItem('Theme', JSON.stringify(true));
        setdark(prevtheme => !prevtheme)
    }

    const signUpClick = () => {
        console.log("signed in via mutations")
    }

    const { data: events } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchData,
    });


    useEffect(() => {
        if (events) {
            setformData(events.newOrders);
            setProducts(events.Products.products)
            setcompletedorderData(events.completedOrders)
        }
    }, [events]);

    useEffect(() => {
        const item1 = localStorage.getItem('Name');
        const item2 = localStorage.getItem('Password');
        const item3 = localStorage.getItem('login');
        const THEME = localStorage.getItem('Theme');
        if (item1) {
            setName(JSON.parse(item1));
        }
        if (item2) {
            setPwd(JSON.parse(item2));
        }
        if (item3) {
            setsignIn(JSON.parse(item3));
        }
        if (THEME) {
            setdark(JSON.parse(THEME));
        }
    }, []);
    return (
        <Context.Provider value={{
            name, setName, pwd, signUpClick, Products,
            setPwd, signIn, setsignIn, completedorderData
            , themeChange, dark, formData, setformData
            , createdata, patchdata, deletedata
        }}>
            {children}

        </Context.Provider>
    )
}

export default Usercontext