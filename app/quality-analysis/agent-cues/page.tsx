import React from 'react';
import Chip from './chip';
import StatsCard from './statsCard';
import Card from '../coaching/card';
import Cards from '../coaching/cards';
import Chips from './chips1';
import Trends from '../trends/page';
import Table from '../table/page';
import Tables from './table1';
import Table2 from './table2';

const page = () => {
  return (
    <main>
        <h2 className='font-bold text-3xl mt-5 mb-5'>HI Sakshi, Welcome Back</h2>
        <Chip />   
        <StatsCard />
        <Card />
        <Cards />
        <h2 className='font-bold text-3xl mt-10 mb-5'>My Relative Ranking </h2>
         <h3 className='font-bold text-2xl mt-5 mb-5'>You are among the top 3 percentile</h3>
         <Chips />
         <Trends />
        <h2 className='font-bold text-2xl mt-10'>Training History</h2>
        <Table />
        <h2 className='font-bold text-2xl mt-10  mb-10'>SOPs compliance score(Optional)</h2>
        <Tables />
        <h2 className='font-bold text-2xl mt-10  mb-10'>Actionable SOPs & reference calls</h2>
        <Table2 />
    </main>
  )
}

export default page
