import React from 'react';

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


const statsCard = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-10">
      <StatsCard title="Total Calls" value="250" />
      <StatsCard title="Calls Evaluated" value="150" />
      <StatsCard title="Current Score" value="80%" />
      <StatsCard title="Target Score" value="90%" />
      <StatsCard title="Streak" value="7" />
    </div>
  )
}

export default statsCard
