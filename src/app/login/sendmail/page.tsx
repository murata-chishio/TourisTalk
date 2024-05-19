"use client"
import Head from "next/head";
import { supabase } from "@/utils/supabase";
import { useState } from "react";

export default function Sendemail(){

  const [email, setEmail] = useState("");

  const onSubmit = async(e: any) => {
    e.preventDefault();
    try{
      const { error:sendEmailError } =await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://tourism-murata-chishios-projects.vercel.app/passwordReset/',
      });
      if (sendEmailError) {
        throw sendEmailError;
      }
      alert('パスワード設定メールを確認してください');
    }catch(error){
      alert('エラーが発生しました');
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <main>
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
        <form onSubmit={onSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">登録メールアドレス</label>
          <input type="email"
            required value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <button  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">メールを送信</button>
        </div>
      </form>
        </div>
      </main>
      <footer>
      </footer>
    </div>
    </>
  )
}

