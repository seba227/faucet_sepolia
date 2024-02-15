document
  .getElementById("faucetForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const address = document.getElementById("address").value;

    const response = await fetch("/request-ether", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    const data = await response.json();

    document.getElementById("response").innerText = data.message;
  });
