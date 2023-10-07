import { BalanceComunity } from "./BalanceComunity";
import { BalanceUser } from "./BalanceUser";
import { useAccount } from "wagmi";

type BalanceContentProps = {
  isAdmin: boolean;
};
export const BalanceContent = ({ isAdmin }: BalanceContentProps) => {
  return (
    <div className="flex flex-wrap justify-center m-3">
      <div className="stats bg-primary text-primary-content">
        {!isAdmin && <BalanceUser />}
        <BalanceComunity />
      </div>
    </div>
  );
};
