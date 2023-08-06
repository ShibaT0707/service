"use client";
import { Button_link } from '@/ui/button/button';
import { Input_L, Label } from '@/ui/createAccount/formItem';
import { useState } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Login() {
  const [formData, setFormData] = useState({ mail: "", password: "" });

  const router = useRouter();

  const data = {
    mail: formData.mail,
    password: formData.password,
  };

  const sendFormData = async () => {
    try {
      const response = await fetch("http://localhost:3000/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        // リクエストが成功した場合の処理
        console.log("送信おk サーバーからのリスポンス：", responseData.token);
        cookies.set("token", responseData.token, { expires: 7, path: "/" });
        router.push("/comm/register");
      } else {
        // リクエストが失敗した場合の処理
        console.error("データの送信に失敗しました");
      }
    } catch (error) {
      // エラーハンドリング
      console.error("通信エラー:", error);
    }
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
    sendFormData();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto mt-6 flex w-60 flex-col items-center">
        <div className="mb-6 w-full">
          <Label>電話番号</Label>
          <Input_L
            type="tel"
            name="tel"
            value={formData.mail}
            onChange={(e: { target: { value: any } }) =>
              setFormData({ ...formData, mail: e.target.value })
            }
            key="tel-input"
            placeholder="電話番号"
          />
        </div>

        <div className="mb-6 w-full">
          <Label>パスワード</Label>
          <div>
          <Input_L
              type="password"
              value={formData.password}
              name="password"
              onChange={(e: { target: { value: any } }) =>
                setFormData({ ...formData, password: e.target.value })
              }
              key="password-input"
              placeholder="パスワード"
            />
          </div>
        </div>
        <Button_link href="/comm/comm_home">ログイン</Button_link>
      </form>
    </>
  );
}
