const express = require("express");
const bodyParser = require("body-parser");
const Web3 = require("web3");

const app = express();
const port = 3000;

const privateKey = "aaaaaaaaaa";
const providerUrl =
  "https://mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8";

// // Sample function to send test ether
// function sendTestEther(address) {
//   // Code to send test ether to the given address on Sepolia testchain
//   // You would need to implement this function using web3.js or ethers.js
//   console.log(`Sending test ether to address: ${address}`);
// }

// Function to send test ether
async function sendTestEther(providerUrl, privateKey, toAddress) {
  // Connect to Ethereum node
  const web3 = new Web3(providerUrl);

  // Create transaction object
  const txObject = {
    from: web3.eth.accounts.wallet.add(privateKey),
    to: toAddress,
    value: web3.utils.toWei("0.01", "ether"), // 0.1 ETH
  };

  // Send transaction
  const txHash = await web3.eth.sendTransaction(txObject);

  console.log("Transaction hash:", txHash);

  // Wait for the transaction to be mined
  await new Promise((resolve) =>
    web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
      if (err) {
        console.error("Error getting transaction receipt:", err);
        return;
      }
      if (receipt) {
        resolve();
      }
    })
  );

  console.log("Transaction confirmed");
}

app.use(bodyParser.json());

app.post("/request-ether", (req, res) => {
  const { address } = req.body;

  // Validate Ethereum address (basic validation)
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: "Invalid Ethereum address" });
  }

  // Send test ether to the requested address
  sendTestEther(privateKey, providerUrl, address)
    .then(() => console.log("Test Ether sent successfully!"))
    .catch((err) => console.error("Error sending test Ether:", err));

  res.json({ message: "Test Ether sent successfully!" });
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
