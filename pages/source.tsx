import Layout from "../components/layout";

const Source = () => {
  const sources = [
    "https://arca.live/b/holopro/66889030?target=all&keyword=%EC%A0%95%EC%9B%94&p=1",
    "https://arca.live/b/holopro/65474900?target=all&keyword=%EC%A0%95%EC%9B%94%EC%BB%B5&p=1",
    "https://arca.live/b/holopro/65472810?target=all&keyword=%EC%A0%95%EC%9B%94%EC%BB%B5&p=1",
    "https://gall.dcinside.com/mgallery/board/view/?id=kizunaai&no=7086344&search_pos=-7065637&s_type=search_subject_memo&s_keyword=.EC.A0.95.EC.9B.94&page=1",
    "https://gall.dcinside.com/mgallery/board/view/?id=kizunaai&no=3892799",
    "https://hololive.wiki/wiki/Hololive_New_Year_Cup",
    "https://www.reddit.com/r/Hololive/comments/kvlh2f/new_years_cup_2021_match_results_standings_mario/",
    "https://docs.google.com/spreadsheets/d/1XH1hPKc-RczTbDCilbQ3C4HJCySwHDN8W7o0T0KZsZA/edit#gid=224210193",
    "https://youtu.be/0gjhIxtAHHE",
  ];

  return (
    <Layout>
      <div className="flex flex-1 flex-col font-noto_kr p-3">
        <h1 className="text-4xl font-bold mb-3">데이터 출처</h1>
        <p>
          해당 데이터 소스는 오로지 데이터 활용 용도로만 사용되었으며, 제작자와
          어떠한 방식으로도 무관한 커뮤니티 및 사이트입니다.
        </p>
        <p>
          해당 데이터 소스는 원작자의 동의를 받아 활용하였으며, 이후 별도의
          문의가 있을시 관련 데이터 삭제 후 대체 데이터로 충원할 것입니다.
        </p>
        <p>
          해당 데이터 소스는 어떠한 방식으로도 영리적인 목적을 추구하지 않으며
          오로지 학습 용도로 활용되었습니다.
        </p>
        <p>
          해당 사이트로 인하여 저작권 피해를 받거나 어려움이 있으실시
          &apos;397love@gmail.com&apos;로 연락주시면 도와드리겠습니다.
        </p>

        <div className="mt-5 flex flex-col">
          {sources.map((source, index) => (
            <a
              key={index}
              href={source}
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              {source}
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Source;
