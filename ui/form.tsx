'use client';
//新規登録のフォーム

import styled from 'styled-components';
import { Button_link } from './button/button';
import {
  InputWrap,
  Input_L,
  Input_M,
  Input_S,
  Label,
} from './createAccount/formItem';
import { useState } from 'react';
import { useRouter } from "next/navigation";
export default function Form() {
  const [formData, setFormData] = useState({ name1: '', name2: '', year: '', month: '', day: '', tel: '', address: '', password: '', password2: '' })

  const router = useRouter();

  const data = {
    Name: formData.name1 + formData.name2,
    Birthday: `${formData.year}-${formData.month}-${formData.day}T00:00:00Z`,
    Mail: formData.tel,
    Address: formData.address,
    Pass: formData.password,
  };

  const sendFormData = async () => {
    try {
      const response = await fetch('http://localhost:3000/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.json();
        // リクエストが成功した場合の処理
        console.log('送信おk サーバーからのリスポンス：', responseData);
        router.push('/');
      } else {
        // リクエストが失敗した場合の処理
        console.error('データの送信に失敗しました');
      }
    } catch (error) {
      // エラーハンドリング
      console.error('通信エラー:', error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
    sendFormData();
  };
  return (
    <>
      <form className="mx-auto mt-6 flex w-60 flex-col items-center">
        <div className="mb-6 w-full">
          <Label>氏名</Label>
          <InputWrap>
            <Input_M type="name" name="性" placeholder="性" />
            <Input_M type="name" name="名" placeholder="名" />
          </InputWrap>
        </div>
        <div className="mb-6 w-full">
          <Label>生年月日</Label>
          <InputWrap>
            <Input_S type="number" name="year" placeholder="2023" />
            <Input_S type="number" name="mounth" placeholder="06" />
            <Input_S type="number" name="date" placeholder="01" />
          </InputWrap>
        </div>

        <div className="mb-6 w-full">
          <Label>電話番号</Label>
          <Input_L type="tel" name="tel" placeholder="電話番号" />
        </div>

        <div className="mb-6 w-full">
          <Label>住所</Label>
          <Input_L type="text" name="text" placeholder="都道府県" />
        </div>

        <div className="mb-6 w-full">
          <Label>パスワード</Label>
          <div>
            <Input_L type="password" name="password" placeholder="パスワード" />
          </div>
        </div>
        <div className="mb-6 w-full">
          <Label>パスワード確認用</Label>
          <div>
            <Input_L
              type="password"
              name="password"
              placeholder="パスワード確認"
            />
          </div>
        </div>
        {/* <Button type="submit">本人認証へ進む</Button> */}
        <Button_link href="/create_account/diagnosis">
          本人認証へ進む
        </Button_link>
      </form>
    </>
  );
}
