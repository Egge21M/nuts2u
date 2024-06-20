import { getDecodedToken } from "@cashu/cashu-ts";
import { useMemo } from "react";
import QRCode from "react-qr-code";

type TokenProps = {
  hash: string;
};

function Token({ hash }: TokenProps) {
  const token = hash.slice(1);
  const decodedToken = useMemo(() => {
    return getDecodedToken(token);
  }, [token]);
  const proofs = decodedToken.token.map((t) => t.proofs).flat();
  const amount = proofs.reduce((a, c) => a + c.amount, 0);
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
