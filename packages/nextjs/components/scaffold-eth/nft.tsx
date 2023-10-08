import { editionDropAddress, editionDropTokenId } from "../../lib/constants";
import { ThirdwebNftMedia, Web3Button, useAddress, useContract, useNFT, useOwnedNFTs } from "@thirdweb-dev/react";

export const NFTComponent = () => {
  const address = useAddress();
  const { contract: editionDropContract } = useContract(editionDropAddress);
  const { data: nft, isLoading: isNftLoading } = useNFT(editionDropContract, editionDropTokenId);
  const { data: ownedNfts } = useOwnedNFTs(editionDropContract, address);

  return (
    <div className="card" style={{ marginBottom: "20px" }}>
      {" "}
      {isNftLoading ? (
        "Loading..."
      ) : (
        <>
          {nft ? <ThirdwebNftMedia metadata={nft.metadata} style={{ width: "100%", marginTop: "10px" }} /> : null}
          {address ? (
            <>
              <p
                style={{
                  textAlign: "center",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                You own {ownedNfts?.[0]?.quantityOwned || "0"} Tickets
              </p>
              <Web3Button
                contractAddress={editionDropAddress}
                action={(contract: { erc1155: { claim: (arg0: string, arg1: number) => any } }) =>
                  contract.erc1155.claim(editionDropTokenId, 1)
                }
                onSuccess={async () => {
                  alert("Claim successful!");
                }}
                style={{ width: "100%", marginTop: "10px" }}
              >
                Claim!
              </Web3Button>
            </>
          ) : (
            <p
              style={{
                textAlign: "center",
                width: "100%",
                marginTop: "10px",
              }}
            >
              Login to claim this Ticket!
            </p>
          )}
        </>
      )}
    </div>
  );
};
