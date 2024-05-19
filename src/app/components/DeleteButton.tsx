"use client"

import { useRouter } from 'next/navigation';

import React from 'react'

type DeleteButtonProps = {
    id: string;
};

const DeleteButton = ({ id }: DeleteButtonProps) => {
    const router = useRouter();
    const handleDelete = async () => {

        const API_URL = process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;

        await fetch(`https://${API_URL}/api/${id}`, { method: "DELETE", })

        router.push("/");
        router.refresh();
    }
  return (
    <button className='bg-red-500 hover:bg-red-600 rounded-md py-2 px-5 text-white' onClick={handleDelete}>削除</button>
  )
}

export default DeleteButton