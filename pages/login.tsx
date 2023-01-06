import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Layout from "../components/layout";
import { newPredictionState } from "../lib/store";
import { LOGIN_STATUS } from "../lib/typeDef";

const PredictionPage = () => {
  const [predictionData, setPredictionData] =
    useRecoilState(newPredictionState);

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center flex-1 font-noto_kr">
        <div>
          <div className="font-bold mb-5 text-center">
            <p>승부 예측을 위한 닉네임과 비밀번호를 입력해주세요</p>
            <p>닉네임은 중첩해서 사용할 수 없습니다</p>
            <p>내가 한 예측 결과를 확인하려면 로그인해주세요</p>
            <p>
              새롭게 예측을 진행하고 싶으면 &apos;신규 예측&apos;을 클릭해주세요
            </p>
            <p>승부예측은 2023년 1월 7일 13시까지 가능합니다</p>
          </div>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className="border p-2"
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <input
              className="border border-black rounded p-2"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="flex gap-3">
              <Link href={"/"} className="flex-1">
                <button
                  className="p-2 bg-slate-200 rounded hover:bg-slate-300 w-full"
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    const result = await fetch("/api/login", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        nickname: nickname,
                        password: password,
                      }),
                    });

                    if (result.status === 200) {
                      //console log response body
                      const body = await result.json();
                      if (body.message === LOGIN_STATUS.SUCCESS) {
                        alert("로그인 성공!");
                        router.push("/prediction/result");
                        setPredictionData(body.data);
                      } else if (body.message === LOGIN_STATUS.PWD_ERROR) {
                        alert("비밀번호가 틀렸습니다");
                      } else if (body.message === LOGIN_STATUS.NO_USER) {
                        alert("존재하지 않는 닉네임입니다");
                      }
                    } else {
                      alert("로그인 실패!");
                    }
                  }}
                >
                  로그인
                </button>
              </Link>

              <Link href={"/prediction"} className="flex-1">
                <button
                  className="p-2 bg-slate-200 rounded hover:bg-slate-300 w-full"
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    const result = await fetch("/api/login", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        nickname: nickname,
                        password: password,
                      }),
                    });

                    const checkMsg = await result.json();
                    if (
                      checkMsg.message === LOGIN_STATUS.SUCCESS ||
                      checkMsg.message === LOGIN_STATUS.PWD_ERROR
                    ) {
                      alert("이미 존재하는 닉네임입니다");
                    } else {
                      router.push("/prediction");
                      setPredictionData({
                        ...predictionData,
                        nickname: nickname,
                        password: password,
                      });
                    }
                  }}
                >
                  신규 예측
                </button>
              </Link>
            </div>
          </form>
        </div>
        <p className="text-red-700 mt-5 font-bold font-noto_kr">
          (주의! 닉네임과 비밀번호는 암호화하지 않으니 평소에 사용하는 비번을
          사용하지 않길 바랍니다)
        </p>
      </div>
    </Layout>
  );
};

export default PredictionPage;
