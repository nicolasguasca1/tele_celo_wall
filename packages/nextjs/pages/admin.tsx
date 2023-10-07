import type { NextPage } from "next";
import { BalanceComunity } from "~~/components/BalanceComunity";
import { MetaHeader } from "~~/components/MetaHeader";
import { CardAdmin } from "~~/components/card-admin";

const Admin: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Admin"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="" data-theme="">
        <BalanceComunity />
        <div className="flex justify-center content-around flex-wrap">
          <CardAdmin cardId={"1234"} title={"Ascensor"} />
          <CardAdmin cardId={"8907"} title={"Piscinal"} />
          <CardAdmin cardId={"tgbh"} title={"Gym"} />
        </div>
      </div>
    </>
  );
};

export default Admin;
