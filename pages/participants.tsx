import { motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";

const ParticipantsPage = () => {
  const ParticipantsBox: NextPage<{
    groupCode: string;
    groupEntry: string[];
  }> = ({ groupCode, groupEntry }) => {
    return (
      <div className="bg-white rounded shadow p-3 flex flex-col">
        <span className="font-bold text-3xl font-poppins">{groupCode}</span>
        <div className="flex flex-1 items-center gap-3">
          {groupEntry.map((entry) => {
            return (
              <EntryAvatar
                key={entry}
                src={`/images/entry/${entry}.png`}
                alt="avatar"
                entryName={entry}
              />
            );
          })}
          <div></div>
        </div>
      </div>
    );
  };

  const EntryAvatar: NextPage<{
    src: string;
    alt: string;
    entryName: string;
  }> = ({ src, alt, entryName }) => {
    return (
      <Link href={`/entry/${entryName}`}>
        <motion.div className="hover:outline rounded">
          <Image src={src} alt={alt} width={120} height={120} />
        </motion.div>
      </Link>
    );
  };

  const group_a = [
    "natsuiro_matsuri",
    "nekomata_okayu",
    "shirakami_fubuki",
    "tokoyami_towa",
    "houshou_marine",
    "momosuzu_nene",
    "sakamata_chloe",
    "kazama_iroha",
    "watson_amelia",
    "ouro_kronii",
    "anya_melfissa",
    "moona_hoshinova",
  ];

  const group_b = [
    "roboco",
    "sakura_miko",
    "hosimachi_suisei",
    "akai_haato",
    "yozora_mel",
    "nakiri_ayame",
    "tsunomaki_watame",
    "himemori_luna",
    "yukihana_ramy",
    "gawr_gura",
    "kobo_kanaeru",
    "kaela_kovalskia",
  ];

  const group_c = [
    "tokino_sora",
    "aki_rosenthal",
    "ookami_mio",
    "yuzuki_choco",
    "oozora_subaru",
    "usada_pekora",
    "shirogane_noel",
    "takane_rui",
    "hakui_koyori",
    "kureiji_ollie",
    "pavolia_reine",
    "vestia_zeta",
  ];

  return (
    <Layout>
      <div className="grid grid-rows-3 gap-3 flex-1 p-3 bg-slate-100">
        <ParticipantsBox groupCode="Group A" groupEntry={group_a} />
        <ParticipantsBox groupCode="Group B" groupEntry={group_b} />
        <ParticipantsBox groupCode="Group C" groupEntry={group_c} />
      </div>
    </Layout>
  );
};

export default ParticipantsPage;
