import React from 'react';
import Card from './card';
import Cards from './cards'
import ScatterChart from './scatterChart';
import ScatterCharts from './scatterChart1';

const page = () => {
  return (
    <main>
        <h2 className='font-bold text-3xl mt-10'>Training KPIs</h2>
        <Card />
        <Cards />

        <h2 className='font-bold text-3xl mt-10 mb-10'>Performance insights for August'20</h2>
        <ScatterChart />
        <ScatterCharts />
    </main>
  )
}

export default page
