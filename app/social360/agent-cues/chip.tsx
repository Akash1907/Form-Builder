'use client'
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


interface StatProps {
  title: string;
  value: string;
}

const StatsCard: React.FC<StatProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
};

export default function BasicChips() {
  return (
    <div>
      <Chip label="Needs Improvement" />
    </div>
  );
}