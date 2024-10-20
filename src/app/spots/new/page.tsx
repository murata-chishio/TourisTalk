"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface createForm {
    id: string;
    title: string;
    location: string;
    content: string;
    image: string;
}

const CreateSpot = () => {
    const router = useRouter();
    const {register, handleSubmit} = useForm<createForm>();

    const onSubmit = async(data: createForm) => {
        
            const API_URL = process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
            await fetch(`https://${API_URL}/api/create`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            router.push("/");
            router.refresh();
    }

  return (
    <div className='min-h-screen py-8 px-4 md:px-12'>
        <h2 className='text-2xl font-bold mb-4'>新規登録</h2>

        <form className='bg-slate-200 p-6 rounded shadow-lg' onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className='text-gray-700 text-sm fontbold mb-2'>URL</label>
                <input type="text" className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' {...register('id')} />
            </div>
            <div className="mb-4">
                <label className='text-gray-700 text-sm fontbold mb-2'>タイトル</label>
                <input type="text" className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' {...register('title')}/>
            </div>
            <div className="mb-4">
                <label className='text-gray-700 text-sm fontbold mb-2'>場所</label>
                <input type="text" className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' {...register('location')}/>
            </div>
            <div className="mb-4">
                <label className='text-gray-700 text-sm fontbold mb-2'>画像</label> 
                <div className="flex-1 w-full flex flex-col items-center">
                <input type="text" className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' {...register('image')}/>
                </div>
            </div>
            <div>
                
            </div>
            <div className="mb-4">
                <label className='text-gray-700 text-sm fontbold mb-2'>説明</label>
                <textarea className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' {...register('content')}/>
            </div>

            <button type='submit' className='py-2 px-4 border rounded-md bg-green-700 text-white'>登録する</button>
        </form>
    </div>
  )
}

export default CreateSpot