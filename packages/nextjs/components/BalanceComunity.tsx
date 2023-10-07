import { BalanceApp } from "./scaffold-eth/BalanceApp";

export const BalanceComunity = () => {
  return (
    <div className="stat flex flex-col">
      <div className="stat-title">Current balance</div>
      <div className="stat-value">
        <BalanceApp />
      </div>
    </div>
  );
};
