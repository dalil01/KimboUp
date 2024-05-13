require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const rootPath = "./src/app/blockchain/";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",

  paths: {
    sources: rootPath + "contracts",
    tests: rootPath + "test",
    cache: rootPath + "cache",
    artifacts: rootPath + "artifacts"
  },

  networks: {
    kimbonet: {
      url: "https://api.ash-test.center/kimbonet/rpc",
      gasPrice: 225000000000,
      chainId: 28979,
      accounts: [process.env.KIMBONET_PRIVATE_KEY]
    },
  }
};
