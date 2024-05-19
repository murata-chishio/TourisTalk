import { Spot } from '@/types';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SpotCard from './SpotCard';

type SpotListProps = {
    spots: Spot[];
};

const SpotList = ({ spots }: SpotListProps) => {
  return (
    <>
    <div>
    {spots.map((spot) => (
       <SpotCard spot={spot} key={spot.id}/> 
    ))}
    </div>
    </>
  )
}

export default SpotList