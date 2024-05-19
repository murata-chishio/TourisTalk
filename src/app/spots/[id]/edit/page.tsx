"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface editForm {
    title: string;
    location: string;
    content: string;
    image: string;
}

const EditSpot = async ({params}: {params: { id: string } }) => {
    const router = useRouter();
    const {register, handleSubmit} = useForm<editForm>();
    const API_URL = process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;

    const res = await fetch(`https://${API_URL}/api/${params.id}`, { next: {
        revalidate: 10,
      }, });
    
      const editSpot = await res.json();

    const onSubmit = async(data: editForm) => {
        
            await fetch(`https://${API_URL}/api/${params.id}`, { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            router.push(`/`);
            router.refresh();
    }

  return (
    <div className='min-h-screen py-8 px-4 md:px-12'>
        <h2 className='text-2xl font-bold mb-4'>編集</h2>

        <form className='bg-slate-200 p-6 rounded shadow-lg' onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className='text-gray-700 text-sm fontbold mb-2'>タイトル</label>
                <input type="text" defaultValue={editSpot.title} className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' {...register('title')}/>
            </div>
            <div className="mb-4">
                <label className='text-gray-700 text-sm fontbold mb-2'>場所</label>
                <input type="text" defaultValue={editSpot.location} className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' {...register('location')}/>
            </div>
            <div className="mb-4">
                <label className='text-gray-700 text-sm fontbold mb-2'>画像URL</label>
                <input type="text" defaultValue={editSpot.image} className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' {...register('image')}/>
            </div>
            <div className="mb-4">
                <label className='text-gray-700 text-sm fontbold mb-2'>説明</label>
                <textarea defaultValue={editSpot.content} className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' {...register('content')}/>
            </div>

            <button type='submit' className='py-2 px-4 border rounded-md bg-green-700 text-white'>登録する</button>
        </form>
    </div>
  )
}

export default EditSpot