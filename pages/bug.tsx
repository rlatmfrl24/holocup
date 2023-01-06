import Layout from "../components/layout";

const BugPage = () => {
  return (
    <Layout>
      <div className="flex-1 flex flex-col justify-center items-center font-noto_kr font-bold text-2xl">
        버그 제보는
        <span className="my-6 text-4xl">397love@gmail.com</span>
        최대한 빨리 반영하겠습니다.
      </div>
    </Layout>
  );
};

export default BugPage;
