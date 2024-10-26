import { BASE_IMG_URL } from '@/utilityComponents/Const';
import Link from 'next/link';
import React, { useState } from 'react';
import CardSkeleton from './CardSkeleton';
import Image from 'next/image';

interface propsType{
    img:string;
    id:string;
    title:string;
    releaseDate: string;
}
const Card = ({img, id, title, releaseDate} : propsType) => {
    const [loaded,setLoaded] = useState(false);
    const [error,setError] = useState(false);
    return (
        <div className='group bg-primary h-[450px] md:h-[335px] w-[100%]'>
            {!loaded && !error && <CardSkeleton />}
            {error && <CardSkeleton error />}
            <Link href={`/details/${id}`} 
            className={`${!loaded && error && "hidden"}`} >
                <div className='relative'>
                    <Image  width={90} height={90}
                    className='object-cover h-[450px] md:h-[335px] w-[100%]'
                    src={`${BASE_IMG_URL}${img}`} 
                    alt="movie poster"
                    onLoad={()=>setLoaded(true)}
                    onError={() => setError(true)} />
                    <div className='absolute bg-primary w-[100%] bottom-0 px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100'>
                        {title}
                        <p>{releaseDate} </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card;