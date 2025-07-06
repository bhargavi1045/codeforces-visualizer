'use client';
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type Contest = {
  contestName: string;
  ratingUpdateTimeSeconds: number;
  newRating: number;
};

type Props = {
  ratingData: Contest[];
};

function formatDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
}

export default function RatingGraph({ ratingData }: Props) {
  const data = ratingData.map((d) => ({
    name: d.contestName,
    date: formatDate(d.ratingUpdateTimeSeconds),
    rating: d.newRating,
  }));

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Rating Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="rating" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
