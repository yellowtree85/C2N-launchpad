farm:
	@npx hardhat compile
	@npx hardhat run --network local scripts/deployment/deploy_boba_token.js
	@npx hardhat run --network local scripts/deployment/deploy_c2n_token.js
	@npx hardhat run --network local scripts/deployment/deploy_airdrop_c2n.js
	@npx hardhat run --network local scripts/deployment/deploy_farm.js
ido:
	@npx hardhat compile
	@npx hardhat run --network local scripts/deployment/deploy_boba_token.js
	@npx hardhat run --network local scripts/deployment/deploy_c2n_token.js
	@npx hardhat run --network local scripts/deployment/deploy_airdrop_c2n.js
	@npx hardhat run --network local scripts/deployment/deploy_singletons.js
	@npx hardhat run --network local scripts/deployment/deploy_mock_token.js
sales:
	@npx hardhat run --network local scripts/deployment/deploy_sales.js
deposit:
	@npx hardhat run --network local scripts/deployment/depositToken.js
node:
	@npx hardhat node
runtest:
	@npx hardhat test
upgrades:
	@npx hardhat run --network local scripts/deployment/upgrades.js
interact:
	@npx hardhat run --network local scripts/interacts/interact_c2nToken.js
	@npx hardhat run --network local .\scripts\interacts\interact_farm.js
	@npx hardhat run --network arb_sepolia .\scripts\interacts\interact_idoStaking.js
	@npx hardhat run --network local .\scripts\interacts\interact_sales.js
