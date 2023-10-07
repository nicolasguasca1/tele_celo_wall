import { useCallback, useEffect, useState } from "react";
import { useScaffoldContractRead } from "./useScaffoldContractRead";
import { ethers } from "ethers";
import { useGlobalState } from "~~/services/store/store";

export function useAccountBalanceComunity() {
  const [isEthBalance, setIsEthBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const price = useGlobalState(state => state.nativeCurrencyPrice);

  /*const {
    data: fetchedBalanceData,
    isError,
    isLoading,
  } = useBalance({
    address,
    watch: true,
    chainId: getTargetNetwork().id,
  });*/

  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
  } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "totalMoney",
  });

  const onToggleBalance = useCallback(() => {
    if (price > 0) {
      setIsEthBalance(!isEthBalance);
    }
  }, [isEthBalance, price]);

  useEffect(() => {
    if (fetchedBalanceData) {
      const eths = BigInt(fetchedBalanceData);
      const ethsInEther = Number(ethers.formatEther(eths));
      setBalance(ethsInEther);
    }
  }, [fetchedBalanceData]);

  return { balance, price, isError, isLoading, onToggleBalance, isEthBalance };
}
