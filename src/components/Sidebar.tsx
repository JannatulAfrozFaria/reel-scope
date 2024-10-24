"use client";
import { BASE_URL } from '@/utilityComponents/Const';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Igenre {
    id: string;
    name: string;
}

const Sidebar = () => {
    const [genres, setGenres] = useState<Igenre[]>([]); // Adding type for genres
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const params = useParams();
    const searchParams = useSearchParams();

    // Fetch genres from API
    useEffect(() => {
        axios.get(`${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`)
            .then(({ data }) => {
                setGenres(data.genres);
                console.log(data.genres);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (searchParams.get("genre")) {
            setSelectedGenre(searchParams.get("genre")?.toString()!);
            return;
        }
        setSelectedGenre(params.id.toString());
    }, [params.id])

    // useEffect(() => {
    //     const genreFromParams = searchParams.get("genre") || params.id?.toString();

    //     if (genreFromParams) {
    //         setSelectedGenre(genreFromParams);
    //     } else {
    //         setSelectedGenre(""); 
    //     }
    // }, [searchParams, params.id]); 

    return (
        <div className='bg-primary px-10 max-h-[calc(100vh-77px)] pb-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary hidden sm:block'>
            <div className='flex flex-col gap-4 pt-4'>
                <p className='sidebarTitle' >Discover</p>
                <Link href={"/discover/popular"}>
                    <p className={`sidebarLink ${selectedGenre === "popular" ? "sidebarActive" : ""}`}>Popular</p>
                </Link>
                <Link href={"/discover/now_playing"}>
                    <p className={`sidebarLink ${selectedGenre === "now_playing" ? "sidebarActive" : ""}`}>Now Playing</p>
                </Link>
                <Link href={"/discover/top_rated"}>
                    <p className={`sidebarLink ${selectedGenre === "top_rated" ? "sidebarActive" : ""}`}>Top Rated</p>
                </Link>
                <Link href={"/discover/upcoming"}>
                    <p className={`sidebarLink ${selectedGenre === "upcoming" ? "sidebarActive" : ""}`}>Upcoming</p>
                </Link>
            </div>
            <div className='flex flex-col gap-4 pt-4'>
                <p className="sidebarTitle">Genres</p>
                {genres.map((genre: Igenre) => <Link key={genre.id} href={`/genre/${genre.id}?genre=${genre.name.toLowerCase()}`} >
                    <p className={`sidebarLink${genre.name.toLowerCase() === selectedGenre ? "sidebarActive" : ""}`}>{genre.name} </p>
                </Link>)}
            </div>
        </div>
    );
};

export default Sidebar;
