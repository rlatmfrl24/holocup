import Link from "next/link";
import Layout from "../components/layout";

const PredictionPage = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center flex-1 font-noto_kr">
        <div>
          <div className="font-bold mb-5 text-center">
            <p>승부 예측을 위한 닉네임과 비밀번호를 입력해주세요</p>
            <p>닉네임은 중첩해서 사용할 수 없습니다</p>
            <p>승부예측은 2023년 1월 7일 13시까지 가능합니다</p>
          </div>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e: any) => {
              e.preventDefault();
              console.log(e.target[0].value);
              console.log(e.target[1].value);
            }}
          >
            <input className="border p-2" type="text" placeholder="닉네임" />
            <input
              className="border border-black rounded p-2"
              type="password"
              placeholder="비밀번호"
            />
            <Link href={"/prediction"}>
              <button
                className="p-2 bg-slate-200 rounded hover:bg-slate-300 w-full"
                type="submit"
              >
                확인
              </button>
            </Link>
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
