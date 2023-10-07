import { useState } from "react";
import { useAccount } from "wagmi";
import { InputBase, IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";

export const Pay = () => {
  const { address } = useAccount();

  const [txValue, setTxValue] = useState<string | bigint>("");
  const [derrama, setDerrama] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "payDerrama",
    args: [derrama, address, BigInt(txValue)],
  });

  const sendPay = () => {
    writeAsync();
    setDerrama("");
    setTxValue("");
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl m-5">
      <div className="card-body">
        <h2 className="card-title">Pay</h2>
        <div className="mt-2">
          <IntegerInput
            value={txValue}
            onChange={updatedTxValue => {
              setTxValue(updatedTxValue);
            }}
            placeholder="value (wei)"
          />
        </div>
        <div className="mt-2">
          <InputBase name="derrama" placeholder="Derrama" value={derrama} onChange={value => setDerrama(value)} />
        </div>
        <div className="w-full mt-4">
          <button className="w-full btn btn-primary" onClick={sendPay} disabled={isLoading}>
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};
