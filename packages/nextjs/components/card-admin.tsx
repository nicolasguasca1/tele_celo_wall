import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface CardAdmin {
  cardId: string;
  title: string;
}

export const CardAdmin = ({ cardId, title }: CardAdmin) => {
  const { data } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "resultVote",
    args: [cardId],
  });

  return (
    <div className="card w-96 bg-neutral text-neutral-content m-5">
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
