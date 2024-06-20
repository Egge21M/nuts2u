import { CashuMint, CashuWallet, getDecodedToken } from "@cashu/cashu-ts";
import { useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import sorry from "./assets/sorry.webp";

type TokenProps = {
  hash: string;
};

function Token({ hash }: TokenProps) {
  const [loading, setIsLoading] = useState(true);
  const [isSpent, setIsSpent] = useState(false);

  const token = hash.slice(1);
  const decodedToken = useMemo(() => {
    return getDecodedToken(token);
  }, [token]);
  const proofs = useMemo(() => {
    return decodedToken.token.map((t) => t.proofs).flat();
  }, [decodedToken]);
  const amount = proofs.reduce((a, c) => a + c.amount, 0);
  useEffect(() => {
    async function checkTokenStatus() {
      const minturl = decodedToken.token[0].mint;
      const wallet = new CashuWallet(new CashuMint(minturl));
      const spent = await wallet.checkProofsSpent([
        {
          secret: decodedToken.token[0].proofs[0].secret,
        },
      ]);
      if (spent[0]) {
        setIsSpent(true);
      }
      setIsLoading(false);
    }
    if (decodedToken) {
      checkTokenStatus();
    }
  }, [decodedToken]);

  if (loading) {
    return <p className="animate-pulse">Loading...</p>;
  }
  if (isSpent) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p>Token already spent...</p>
        <img src={sorry} className="w-64 h-64 rounded" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h2 className="text-xl">Someone sent you {amount} SATS via Cashu</h2>
        <a className="text-sm text-zinc-500">Whats is Cashu?</a>
      </div>
      <div className="p-2 rounded bg-white">
        <QRCode value={token} />
      </div>
      <a href={`cashu:${token}`}>Claim in Wallet</a>
      <p>
        Don't have a Cashu Wallet? Get one <a>here</a>
      </p>
    </div>
  );
}

export default Token;
