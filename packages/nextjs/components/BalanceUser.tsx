import { Balance, FaucetButton } from "./scaffold-eth";
import { useAccount } from "wagmi";

export const BalanceUser = () => {
  const { address } = useAccount();

  return (
    <div className="stat">
      <div className="stat-title">Account balance</div>
      <div className="stat-value">
        <Balance address={address} />
      </div>
      <FaucetButton />
    </div>
  );
};
