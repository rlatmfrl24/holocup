import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

const EntryPage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  return <Layout>{name}</Layout>;
};

export default EntryPage;
