import { useState } from "react";
import { Pay } from "./pay";
import { useAccount } from "wagmi";

export const ActionsUser = () => {
  const { address } = useAccount();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleButtonClick = () => {
    setIsCollapsed(prev => !prev);
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-center m-3">
        <a className="btn m-1" href={`/blockexplorer/address/${address}`}>
          Review my pays
        </a>
        <div className="m-1">
          <button onClick={handleButtonClick} className="btn btn-primary">
            Make a pay
          </button>
        </div>
      </div>
      <div className={`flex justify-center ${isCollapsed ? "h-auto" : "h-0"}`}>{isCollapsed && <Pay />}</div>
    </div>
  );
};
