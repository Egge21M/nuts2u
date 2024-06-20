import { useLocation } from "react-router-dom";
import Token from "./Token";

function App() {
  const location = useLocation();
  const hash = location.hash;

  if (hash) {
    return <Token hash={hash} />;
  }

  return <div></div>;
}

export default App;
