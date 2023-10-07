import { useRouter } from "next/router";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface CardAdmin {
  cardId: string;
  title: string;
}

export const CardAdmin = ({ cardId, title }: CardAdmin) => {
  const router = useRouter();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo("YourContract");
  const { data } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "resultVote",
    args: [cardId],
  });

  return (
    <div
      className="card w-96 bg-base-100 shadow-xl m-5"
      onClick={() => router.push(`/blockexplorer/address/${deployedContractData.address}?idDerrama=${cardId}`)}
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit, in pulvinar luctus class habitant primis massa,
          nascetur gravida faucibus hendrerit ornare volutpat.
        </p>

        <div>El resultado es: {data?.toString()}</div>
      </div>
    </div>
  );
};
