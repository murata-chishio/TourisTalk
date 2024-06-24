"use client"
import { supabase } from "@/utils/supabase";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const Header = () => {
    const [currentUser, setcurrentUser] = useState('');

    // 現在ログインしているユーザーを取得する処理
    const getCurrentUser = async () => {
    // ログインのセッションを取得する処理
    const { data } = await supabase.auth.getSession()
    // セッションがあるときだけ現在ログインしているユーザーを取得する
    if (data.session !== null) {
      // supabaseに用意されている現在ログインしているユーザーを取得する関数
      const { data: { user } } = await supabase.auth.getUser()
      // currentUserにユーザーのメールアドレスを格納
      
      if (user) {
        setcurrentUser(user.email || '');
    }

    }
  }
  useEffect(()=>{
    getCurrentUser()
  },[])

  const doLogout = async () => {
    const router = useRouter();
    // supabaseに用意されているログアウトの関数
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    // ログアウトを反映させるためにリロードさせる
    router.refresh();
  }

  return (
    <header className='py-5 px-10 border-b flex justify-between item-center bg-slate-900'>
        <div className='flex '>
            <h1 className='text-2xl font-extrabold text-slate-50'>
                <Link href="/">Tourism</Link></h1>
            <nav className='text-sm font-medium px-3 py-3 rounded-md text-slate-200'>
                <Link href="/">
                    ホーム
                </Link>
            </nav>
            <nav className='text-sm font-medium px-3 py-3 rounded-md text-slate-200'>
                <Link href="/spots/new">
                    新規登録
                </Link>
            </nav>
        </div>

        <div>
        { currentUser ? (
            <div className='flex justify-end text-slate-200'>
                <div className='transform translate-y-3'>{ currentUser } でログインしています。</div>
            <nav className='text-sm font-medium bg-red-400 px-3 py-3 rounded-md mx-2'>
            <Link href="/logout" onClick={()=>{
              doLogout();
            }}>
                ログアウト
            </Link>
            </nav>
            </div>
        ):(
        <div className='flex justify-end text-slate-200'>
            <nav className='text-sm font-medium bg-blue-400 px-3 py-3 rounded-md mx-2'>
                <Link href="/login">
                    ログイン
                </Link>
            </nav>
        
            <nav className='text-sm font-medium bg-green-500 px-3 py-3 rounded-md'>
                <Link href="/register">
                    ユーザー登録
                </Link>
            </nav>
        </div>
        )}
        </div>

    </header>
  )
}

export default Header