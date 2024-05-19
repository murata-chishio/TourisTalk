"use client";
import { supabase } from "@/utils/supabase";
import { useState } from "react";

export default function SignUp(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConf, setPasswordConf] = useState("")

  const onSubmit = async(e: any) => {
    e.preventDefault();
    try{
      const { error:signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (signUpError) {
        throw signUpError;
      }
    alert('登録完了メールを確認してください');
    }catch(error){
      alert('エラーが発生しました');
    }
  };

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
      <main className="space-y-4">
        <div>
        <form onSubmit={onSubmit}>
        <div className="block mb-2 text-sm font-medium text-gray-900">
          <label >メールアドレス</label>
          <input type="email"
            required value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">パスワード</label>
          <input type="password"
            required value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">パスワード（確認）</label>
          <input type="password"
            required value={passwordConf}
            onChange={e => setPasswordConf(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">サインアップ</button>
        </div>
      </form>
        </div>
      </main>
    </div>
  </div>
    </>
  )
}

