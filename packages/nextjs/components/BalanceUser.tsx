import { Balance } from "./scaffold-eth";
import { useAccount } from "wagmi";

export const BalanceUser = () => {
  const { address } = useAccount();

  return (
    <div className="flex gap-1 items-center">
      <span className="font-bold text-sm">Mi Balance</span>
      <Balance address={address} className="px-0 h-1.5 min-h-[0.375rem]" />
    </div>
  );
};
