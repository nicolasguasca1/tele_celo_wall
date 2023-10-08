import { useState } from "react";
import { smartWalletConfig } from "../../pages/_app";
// import base64 from "@hexagon/base64";
// import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
// import {
//   VerifiedRegistrationResponse,
//   generateAuthenticationOptions,
//   generateRegistrationOptions,
//   verifyAuthenticationResponse,
//   verifyRegistrationResponse,
// } from "@simplewebauthn/server";
import { CeloAlfajoresTestnet } from "@thirdweb-dev/chains";
import { useAddress, useConnect } from "@thirdweb-dev/react";
import { LocalWallet } from "@thirdweb-dev/wallets";

export const ConnectComponent = () => {
  const connect = useConnect();
  const address = useAddress();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loadLocalWalletAndConnect = async () => {
    // let authenticationOptions = await generateAuthenticationOptions({
    //   rpID: window.location.hostname,
    //   challenge: "asdf",
    // });

    // let authenticationResponse = await startAuthentication(
    //   authenticationOptions
    // );

    // let clientDataJSON = base64.toArrayBuffer(
    //   authenticationResponse.response.clientDataJSON,
    //   true
    // );
    // let authenticatorData = base64.toArrayBuffer(
    //   authenticationResponse.response.authenticatorData,
    //   true
    // );
    // let signature = base64.toArrayBuffer(
    //   authenticationResponse.response.signature,
    //   true
    // );
    // let hashedClientData = await window.crypto.subtle.digest(
    //     "SHA-256",
    //     clientDataJSON
    //   );

    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");
    try {
      const personalWallet = new LocalWallet({
        chain: CeloAlfajoresTestnet,
      });
      await personalWallet.loadOrCreate({
        strategy: "encryptedJson",
        password: password,
      });
      await connect(smartWalletConfig, {
        personalWallet: personalWallet,
      });
    } catch (e) {
      setError((e as any).message);
    }
  };

  return address ? (
    <h3>
      Connected as:
      <br />{" "}
      <a
        href={`https://thirdweb.com/${CeloAlfajoresTestnet.chainId}/${address}/account`}
        target="_blank"
        rel="noreferrer"
      >
        {address}
      </a>
    </h3>
  ) : (
    <>
      <input
        className="input"
        type="password"
        placeholder="Enter Password"
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button className="button" onClick={loadLocalWalletAndConnect}>
        Log in
      </button>
      <p style={{ color: "red" }}>{error}</p>
    </>
  );
};
