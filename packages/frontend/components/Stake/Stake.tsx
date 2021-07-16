import * as React from "react";
import { StakeProps } from "./types";
import { useWallet } from "../../hooks/useWallet";
import { useArtiStake } from "../../hooks/useContract";
import externalContracts from "../../contracts/external_contracts";
import { Contract, ethers } from "ethers";

const Stake: React.FC<StakeProps> = ({ artistWalletAddress }) => {
  const [connectWallet, account, library] = useWallet();
  const [stakeAmount, setStakeAmount] = React.useState("");
  const [depositedAmount, setDepositedAmount] = React.useState("0");
  const stakeContract = useArtiStake();

  React.useEffect(() => {
    if (!library) return;
    refresh();
  }, [library]);

  const stake = async () => {
    console.log("stake");

    const value = ethers.utils.parseEther(stakeAmount).toString();
    await stakeContract.deposit(artistWalletAddress, 0, { value: value });
  };

  const withdraw = async () => {
    console.log("withdraw");
    stakeContract.withdraw(artistWalletAddress);
  };

  const refresh = () => {
    console.log("refresh");
    stakeContract.getStakerBalanceWithInterest(artistWalletAddress).then((deposited) => {
      console.log(deposited);
      setDepositedAmount(ethers.utils.formatEther(deposited.toString()).toString());
    });
  };

  const handleStakeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) return;
    setStakeAmount(event.target.value);
  };

  return (
    <div className="w-full mx-auto text-white">
      <div className="bg-marimo-2 flex text-center grid lg:grid-cols-3">
        <p className="m-auto p-4 flex-1 text-white text-2xl">
          Toatal Staking Value <br /> 1,234,567,890 MATIC
        </p>
        <p className="m-auto p-4 flex-1 text-white text-2xl">
          APY
          <br /> 888%
        </p>
        <p className="m-auto p-4 flex-1 text-white text-2xl">
          Reward
          <br /> 52,456 MATIC
        </p>
      </div>
      <div className="bg-marimo-3 grid lg:grid-cols-2">
        <div className="m-auto w-1/2 my-16 text-center justify-around">
          <div className="mb-2 text-xl">
            <p>Stake</p>
          </div>
          <input
            type="number"
            onChange={handleStakeAmount}
            value={stakeAmount}
            placeholder="MATIC"
            className="h-10 w-2/3 border-2 pr-2 border-marimo-5 rounded-l-lg text-black text-right"
          />
          {!account ? (
            // @ts-ignore:
            <button onClick={connectWallet} className="h-10 w-1/3 bg-marimo-5 rounded-r-lg text-xs hover:opacity-75">
              Connect Wallet
            </button>
          ) : (
            <button onClick={stake} className="h-10 w-1/3 bg-marimo-5 rounded-r-lg hover:opacity-75">
              Stake
            </button>
          )}
        </div>
        <div className="w-1/2 m-auto my-8 text-center">
          <div className="mb-2 text-xl">
            <div>Withdraw</div>
          </div>
          <div className="flex mb-2">
            <p className="m-auto text-white text-2xl">{depositedAmount}MATIC</p>
            <button onClick={refresh}>
              <p className="text-2xl">🔄</p>
            </button>
          </div>
          {!account ? (
            // @ts-ignore:
            <button onClick={connectWallet} className="h-10 w-1/2 bg-marimo-5 rounded-lg hover:opacity-75">
              Connect Wallet
            </button>
          ) : (
            <button onClick={withdraw} className="h-10 w-1/2 bg-marimo-5 rounded-lg hover:opacity-75">
              Withdraw
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stake;
