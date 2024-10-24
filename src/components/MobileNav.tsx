import { BASE_URL } from '@/utilityComponents/Const';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import {IoMdClose} from "react-icons/io";

interface propsType{
    input: string;
    setInput: Dispatch<SetStateAction<string>>
    handleSubmit: (e: React.FormEvent) => void;
}
const MobileNav = ({input,setInput,handleSubmit}:propsType) => {
    const [isOpen,setIsOpen]= useState(false);
    const [genres,setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const searchParams = useSearchParams();
    const params = useParams();
    useEffect(()=>{
        axios.get(`${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`)
        .then(({data})=>{
            setGenres((data.genres));
        })
        .catch(err=>console.log(err));
    },[])

    useEffect(()=>{
        if(searchParams.get("genre")){
            setSelectedGenre(searchParams.get("genre")!)
            return;
        }
        setSelectedGenre(params.id?.toString());
    },[searchParams.get("genre"), params.id]);
    return (
        <>
            <form className='md:hidden flex justify-between w-[100%]' onSubmit={handleSubmit}></form>
            <div onClick={()=>setIsOpen(true)}>
                <AiOutlineMenu size ={30} />
            </div>
            <div className='space-x-4'>
                <input className='bg-secondary px-4 py-2 outline-none placeholder:text-textColor text-[14px] w-[180px]' type="text" />
            </div>
        </>
    );
};

export default MobileNav;