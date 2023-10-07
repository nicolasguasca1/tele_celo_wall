import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BalanceComunity } from "~~/components/BalanceComunity";
import { BalanceUser } from "~~/components/BalanceUser";
import { MetaHeader } from "~~/components/MetaHeader";
import { Card } from "~~/components/card";
import { Pay } from "~~/components/pay";

const ExampleUI: NextPage = () => {
  const { address } = useAccount();
  return (
    <>
      <MetaHeader title="User" description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="" data-theme="">
        <BalanceComunity />
        <BalanceUser />
        <a className="btn btn-wide" href={`/blockexplorer/address/${address}`}>
          Mis pagos
        </a>
        <div className="flex justify-center content-around flex-wrap">
          <Card cardId={"1234"} title={"Ascensor"} />
          <Card cardId={"8907"} title={"Piscinal"} />
          <Card cardId={"tgbh"} title={"Gym"} />
        </div>
        <Pay />
      </div>
    </>
  );
};

export default ExampleUI;
