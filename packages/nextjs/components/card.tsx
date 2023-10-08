import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface Card {
  cardId: string;
  title: string;
}

export const Card = ({ cardId, title }: Card) => {
  const { address } = useAccount();

  const { data: yourVote } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getVote",
    args: [address, cardId],
  });

  const [vote, setVote] = useState(yourVote);

  useEffect(() => {
    if (vote) {
      writeAsync();
    }
  }, [vote]);

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "saveVote",
    args: [vote, cardId],
  });

  return (
    <div className="m-5">
      <div className="indicator">
        {!yourVote && <span className="indicator-item badge bg-warning">Required</span>}
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">{title}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, in pulvinar luctus class habitant primis massa,
              nascetur gravida faucibus hendrerit ornare volutpat.
            </p>
            {yourVote && <div>Your vote is: {yourVote === "OK" ? "Vote OK" : "Vote KO"}</div>}

            {!yourVote && (
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setVote(() => "OK");
                  }}
                  disabled={isLoading}
                >
                  Accept
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setVote(() => "KO");
                  }}
                  disabled={isLoading}
                >
                  Deny
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
