import { BalanceApp } from "./scaffold-eth/BalanceApp";

export const BalanceComunity = () => {
  return (
    <div className="flex gap-1 items-center">
      <span className="font-bold text-sm">Balance Comunidad</span>
      <BalanceApp className="px-0 h-1.5 min-h-[0.375rem]" />
    </div>
  );
};
