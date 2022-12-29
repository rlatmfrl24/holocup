import Head from "next/head";
import Layout from "../components/layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-1 relative m-3">
        <Image
          className="bg-slate-400"
          src={`/images/mai_n.png`}
          alt="hololive"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </Layout>
  );
}
