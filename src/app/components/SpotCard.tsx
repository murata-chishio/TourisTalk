import { Spot } from '@/types'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type SpotCardProps = {
    spot: Spot;
}

const SpotCard = ({ spot }: SpotCardProps) => {
  return (
        <article className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row max-w-6xl' key={spot.id}>
        <Link href={`spots/${spot.id}`} className="hover:opacity-75"> 
            <Image 
            src={spot.image}
            alt=''
            width={1280}
            height={300}
            />
        </Link>
        <div className="flex flex-col justify-between p-4 leading-normal">
                <Link href={`spots/${spot.id}`} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">{spot.title}</Link>
                <Link href={`spots/${spot.id}`} className="mb-3 font-normal text-gray-700 dark:text-gray-400">{spot.content.length > 70 ? spot.content.substring(0, 70) + "...": spot.content}</Link>
                <p>
                    <small>{spot.location}</small>
                </p>
                <Link href={`spots/${spot.id}`} className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:opacity-75 text-center'>{spot.title}の詳細</Link>
        </div>
    </article>
  )
}

export default SpotCard