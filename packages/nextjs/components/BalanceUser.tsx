import { Balance } from "./scaffold-eth";
import { useAccount } from "wagmi";

export const BalanceUser = () => {
  const { address } = useAccount();

  return (
    <div className="stat">
      <div className="stat-title">Account balance</div>
      <div className="stat-value">
        <Balance address={address} />
      </div>
      <div className="stat-actions">
        <button className="btn btn-sm btn-success">Add funds</button>
      </div>
    </div>
  );
};
