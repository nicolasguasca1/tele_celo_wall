import { useAccountBalanceComunity } from "~~/hooks/scaffold-eth/useAccountBalanceComunity";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

type TBalanceProps = {
  className?: string;
};

/**
 * Display (ETH & USD) balance of an ETH address.
 */
export const BalanceApp = () => {
  const configuredNetwork = getTargetNetwork();
  const { balance, price, isError, isLoading, onToggleBalance, isEthBalance } = useAccountBalanceComunity();

  if (isLoading) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}>
        <div className="text-warning">Error</div>
      </div>
    );
  }

  return (
    <button onClick={onToggleBalance}>
      <div className="w-full flex items-center justify-center">
        {isEthBalance ? (
          <>
            <span>{balance ? balance?.toFixed(4) : 0}</span>
            <span>{configuredNetwork.nativeCurrency.symbol}</span>
          </>
        ) : (
          <>
            <span>$</span>
            <span>{balance ? (balance * price).toFixed(2) : 0}</span>
          </>
        )}
      </div>
    </button>
  );
};
