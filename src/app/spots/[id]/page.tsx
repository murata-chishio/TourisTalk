import DeleteButton from '@/app/components/DeleteButton';
import EditButton from '@/app/components/EditButton';
import Image from 'next/image'
import React from 'react'

const Spot = async ({params}: {params: { id: string } }) => {

  const API_URL = process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
  const res = await fetch(`https://${API_URL}/api/${params.id}/`, { next: {
    revalidate: 10,
  }, });

  const detailSpot = await res.json();

  return (
    <div className='max-w-3xl mx-auto p-5'>
        <Image 
            src={detailSpot.image}
            alt=''
            width={1280}
            height={300}
            />
        <h1 className='text-4xl text-center mb-10 mt-10'>{detailSpot.title}</h1>
        <div className='text-lg leading-relaxed text-justify'>
            <p>{detailSpot.content}</p>
        </div>
        <p className='flex justify-end'>
          <small>{detailSpot.location}</small>
        </p>
        <div className='flex justify-end'>
          <EditButton id={detailSpot.id}/>
          <DeleteButton id={detailSpot.id} />
        </div>
    </div>
  )
}

export default Spot