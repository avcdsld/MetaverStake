export const rpc =
  process.env.NODE_ENV == "development"
    ? "https://rpc.shibuya.astar.network:8545"
    : "https://polygon-mainnet.infura.io/v3/7495501b681645b0b80f955d4139add9";
// export const networkId = process.env.NODE_ENV == "development" ? 81 : 592;
export const networkId = process.env.NODE_ENV == "development" ? 81 : 81; // TODO:
export const subgraphUrl =
  process.env.NODE_ENV == "development"
    ? "https://api.thegraph.com/subgraphs/name/aave/aave-v2-polygon-mumbai"
    : "https://api.thegraph.com/subgraphs/name/aave/aave-v2-matic";
