import { useParams, useSearchParams } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
        
    },[])
    return (
        <div>
            
        </div>
    );
};

export default MobileNav;