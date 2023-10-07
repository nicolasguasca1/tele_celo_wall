import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export const useWalletIsConnect = () => {
  const router = useRouter();
  const { address } = useAccount();

  if (!address) {
    router.push("/");
    return;
  }
  return address;
};
