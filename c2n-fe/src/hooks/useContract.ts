import { useMemo } from "react";
import { useAppSelector } from "@src/redux/hooks";
import { Contract, providers } from "ethers";
import AirdropAbi from "@src/util/abi/Airdrop.json";
import { airdropInfos } from "@src/config";

export const useAirdropContract = () => {
  const chain = useAppSelector((state) => state.wallet.chain);
  const signer = useAppSelector((state) => state.contract.signer);
  const walletAddress = useAppSelector((state) => state.contract.walletAddress);

  // const viewProvider = new providers.JsonRpcProvider(chain?.rpc[0]);
  if (!signer || !walletAddress) {
    console.log("no signer");
  }
  const airdrop = useMemo(() => {
    return (
      airdropInfos.find((item) => item.chainId == chain?.chainId) ||
      airdropInfos[0]
    );
  }, [chain]);

  const airdropContract = new Contract(airdrop.address, AirdropAbi.abi, signer);
  return airdropContract;
};
