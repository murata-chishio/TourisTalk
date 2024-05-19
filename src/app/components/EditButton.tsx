"use client"
import Link from 'next/link';
import React from 'react'

type EditButtonProps = {
    id: string;
};

const EditButton = ({ id }: EditButtonProps) => {
  return (
    <Link href={`${id}/edit`} className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:opacity-75 text-center'>編集</Link>
  )
}

export default EditButton