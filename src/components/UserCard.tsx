'use client';
import React from 'react';

type User = {
  handle: string;
  avatar: string;
  rating?: number;
  maxRating?: number;
  maxRank?: string;
  rank?: string;
  contribution?: number;
  friendOfCount?: number;
  country?: string;
  organization?: string;
};

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md text-center">
      <img
        src={user.avatar}
        alt="User Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4 border"
      />
      <h2 className="text-xl font-bold">{user.handle}</h2>
      <p className="text-gray-600 capitalize">{user.rank}</p>
      <p className="text-blue-600 font-semibold mt-2">Rating: {user.rating}</p>
      {user.maxRating && (
        <p className="text-sm text-gray-500">
          Max: {user.maxRating} ({user.maxRank})
        </p>
      )}
      {user.organization && (
        <p className="text-sm mt-2 text-gray-600">{user.organization}</p>
      )}
      {user.country && (
        <p className="text-sm text-gray-600">{user.country}</p>
      )}
    </div>
  );
}
