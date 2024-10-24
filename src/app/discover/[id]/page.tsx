"use client";
import Loading from '@/components/Loading';
import { BASE_URL } from '@/utilityComponents/Const';
import axios from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export interface Imovie{
    id:string;
    poster_path: string;
    title: string;
    release_date: string;
}
const Discover = () => {
    const [title,setTitle] =useState("");
    const [movies,setMovies] =useState([]);
    const [currentPage,setCurrentPage] =useState(1);
    const [totalPage,setTotalPage] =useState(1);
    const [discover,setDiscover] =useState("");
    const mainRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    useEffect(()=>{
        mainRef?.current?.scrollTo({
            top:0,
            left:0,
            behavior: "smooth"
        })
    const id = params.id.toString()
    const page = searchParams.get("page")
    setDiscover(id)
    switch(id){
        case "popular" :
            setTitle("Popular Movies");
            break;
        case "now_playing" :
            setTitle("Now Playing Movies");
            break;
        case "top_rated" :
            setTitle("Top Rated Movies");
            break;
        case "upcoming" :
            setTitle("Upcoming Movies");
            break;
        default:
            setTitle("");
            break;
    }
    axios.get(`${BASE_URL}/movie/${id}`,{
        params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            page
        }
    }).then(response=>{
        console.log("res:" , response);
        setMovies(response.data.results)
        setCurrentPage(response.data.page)
        setTotalPage(response.data.total_page)
    }).catch(error=>console.log(error))
    },[params.id,searchParams.get("page")]);

    const handlePageChange = (button:string) =>{
        let page = ""
        if(button === "prev"){
            page = `page=${currentPage-1}`
        }else{
            page=`page=${currentPage+1}`
        }
        router.push(`/discover/${discover}${page}`);
    }
    
    return (
        <main className="bg-primary max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary relative">
            <h2 className="text-[24px] tracking-[2px]">{title}</h2>
            {movies.length === 0 && <Loading />}
            
        </main>
    );
};

export default Discover;