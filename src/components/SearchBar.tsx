'use client';
import {useState} from 'react';

type Props={
    onSearch:(handle:string)=>void;
}

export default function SearchBar({onSearch}:Props){
    const[input,setInput]=useState('');
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        if(input.trim()){
            onSearch(input.trim());
        }
    };
return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-10">
      <input
        type="text"
        placeholder="Enter Codeforces handle"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-l-md w-72"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
