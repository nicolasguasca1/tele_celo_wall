import type { NextPage } from "next";
import { ActionsUser } from "~~/components/ActionUser";
import { BalanceContent } from "~~/components/BalanceContent";
import { MetaHeader } from "~~/components/MetaHeader";
import { Card } from "~~/components/card";
import { useWalletIsConnect } from "~~/hooks/scaffold-eth/useWalletIsConnect";

const ExampleUI: NextPage = () => {
  useWalletIsConnect();

  return (
    <>
      <MetaHeader title="User" description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="" data-theme="">
        <BalanceContent isAdmin={false} />
        <ActionsUser />
        <div className="flex justify-center content-around flex-wrap">
          <Card cardId={"1234"} title={"Lift"} />
          <Card cardId={"8907"} title={"Pool"} />
          <Card cardId={"tgbh"} title={"Gym"} />
        </div>
      </div>
    </>
  );
};

export default ExampleUI;
