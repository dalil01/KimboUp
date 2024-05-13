const hardhat = require("hardhat");

async function main() {
    const CarCityFactory = await hardhat.ethers.getContractFactory("CarCity");
    const CarCityContract = await CarCityFactory.deploy();

    await CarCityContract.deployed();

    console.log("CarCity contract deployed to:", CarCityContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
