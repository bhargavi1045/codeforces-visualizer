'use client'
import {useState} from 'react';
import SearchBar from '@/components/SearchBar';
import UserCard from '@/components/UserCard';
import RatingGraph from '@/components/RatingGraph';


type User={
    handle:string;
    avatar:string;
    rating?:number;
    maxRating?:number;
    maxRank?:string;
    rank?:string;
    contribution?:number;
    friendOfCount?:number;
    country?:string;
    organization?:string;
};

type Contest = {
  contestName: string;
  ratingUpdateTimeSeconds: number;
  newRating: number;
};

export default function HomePage(){
    const[userData,setUserData]=useState<User|null>(null);
    const[error,setError]=useState<string>('');
    const [ratingData, setRatingData] = useState<Contest[] | null>(null);
    
    const fetchRatingData=async(handle:string)=>{
        try{
            setError('');
            setRatingData(null);
            const res=await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
            const data=await res.json();

            if(data.status=='OK'){
                setRatingData(data.result);
            }
            else{
                setError('Failed to fetch rating data');
            }
        }
        catch{
            setError('Failed to fetch rating data');
        }
    }

    const fetchUserData=async(handle:string)=>{
        try{
            setError('');
            setUserData(null);
            const res=await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
            const data=await res.json();

            if(data.status=='OK'){
                setUserData(data.result[0]);
                fetchRatingData(handle);
            }
            else{
                setError('User not found');
            }
        }
        catch{
            setError('Failed to fetch user data');
        }
    }
    return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Codeforces Visualizer</h1>

      <SearchBar onSearch={fetchUserData} />

      {error && (
        <p className="text-red-500 text-center mt-4 text-sm">
          {error}
        </p>
      )}

      {userData && <UserCard user={userData}/>}
      {ratingData && ratingData.length >0 && <RatingGraph ratingData={ratingData}/>}
    </main>
  );
};



