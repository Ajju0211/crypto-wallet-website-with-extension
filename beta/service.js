document.addEventListener("DOMContentLoaded", function () {
    // In THIS WE GOING TO TARGET THE ELEMENTS
  
    const accountList = document.getElementsByClassName("accountList");
    for (let i = 0; i < accountList.length; i++) {
      accountList[i].addEventListener("click", changeAccount);
    }
    document
      .getElementById("add_new_token")
      .addEventListener("click", importToken);
    document
      .getElementById("add_new_token")
      .addEventListener("click", goBack_token);
    document.getElementById("userAddress").addEventListener("click", copyAddress);
    document.getElementById("transferFund").addEventListener("click", handler);
    document
      .getElementById("header_network")
      .addEventListener("click", getOpenNetwork);
    document
      .getElementById("network_item")
      .addEventListener("click", getsSelectedNetwork);
    document.getElementById("add_network").addEventListener("click", setNetwork);
    document.getElementById("loginAccount").addEventListener("click", loginUser);
    document
      .getElementById("accountCreate")
      .addEventListener("click", createUser);
    document.getElementById("openCreate").addEventListener("click", openCreate);
    document.getElementById("sign_up").addEventListener("click", signUp);
    document.getElementById("login_up").addEventListener("click", login);
    document.getElementById("logout").addEventListener("click", logout);
    document
      .getElementById("open_Transfer")
      .addEventListener("click", openTransfer);
    document.getElementById("goBack").addEventListener("click", goBack);
    document.getElementById("open_Import").addEventListener("click", openImport);
    document.getElementById("open_assets").addEventListener("click", openAssets);
    document
      .getElementById("open_activity")
      .addEventListener("click", openActivity);
    document.getElementById("goHomePage").addEventListener("click", goHomePage);
    document
      .getElementById("goBack_import")
      .addEventListener("click", importGoBack);
    document
      .getElementById("openAccountImport")
      .addEventListener("click", openImportModel);
    document
      .getElementById("close_import_account")
      .addEventListener("click", closeImportModel);
    const addAccountButton = document.getElementById("add_new_Account"); // Replace with the actual ID of your button
  
    if (addAccountButton) {
      // Check if the element exists
      addAccountButton.addEventListener("click", addAccount);
    } else {
      console.log("Element with ID 'add_account_button' not found.");
    }
    myFunction();
  });
  
  // STATE VARIABLE
  let providerURL =
    "https://polygon-amoy.g.alchemy.com/v2/kejhjBFuzUS-g5DWAsCqBqFmthPOhsLz";
  let provider;
  let privateKay;
  let address;
  
  // FUNCTION
  function handler() {
    document.getElementById("transfer_center").style.display = "flex";
  
    const amount = document.getElementById("amount").value;
    const address = document.getElementById("address").value;
  
    // PROVIDER
    const provider = new ethers.providers.JsonRpcProvider(providerURL);
    const wallet = new ethers.Wallet(privateKay, provider);
  
    const tx = {
      to: address,
      value: ethers.utils.parseEther(amount),
    };
  
    let a = document.getElementById("link");
    a.href = "somelink Url"; // Set the actual link here
  
    wallet.sendTransaction(tx).then((txObj) => {
      console.log("txHash:", txObj.hash);
  
      document.getElementById("transfer_center").style.display = "none";
      const a = document.getElementById("link");
      a.href = `https://dashboard.tenderly.co/tx/polygon-amoy/${txObj.hash}`;
      document.getElementById("link").style.display = "block"; // Corrected the style display reference
      const url = "https://back-end-r3w1.onrender.com/api/v1/transaction/transection";
      const data = {
        to: address,
        value: amount,
        address: wallet.address,
      };
  
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.log(error);
      });
    });
  }
  
  /// Function to get the current price and percentage change of MATIC and USD
  async function getMaticToUsdRate() {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd&include_24hr_change=true"
    );
    const data = await response.json();
    const maticToUsd = data["matic-network"].usd.toFixed(2);
    const maticChange = data["matic-network"].usd_24h_change.toFixed(2);
    const changeIndicator = maticChange >= 0 ? "+" : ""; // Display "+" for positive, empty string for negative
    document.getElementById(
      "one_usd"
    ).innerHTML = `4${maticToUsd} USD (${changeIndicator}${maticChange}%)`;
    return maticToUsd;
  }
  
  // Example: convert MATIC to USD
  async function convertMaticToUsd(maticAmount) {
    const maticToUsd = await getMaticToUsdRate();
  
    const usdAmount = maticAmount * maticToUsd;
    document.getElementById("Balance_usd").innerHTML = `$${usdAmount.toFixed(
      4
    )} USD`;
  }
  
  function checkBalance(address) {
    const provider = new ethers.providers.JsonRpcProvider(providerURL);
  
    provider.getBalance(address).then((balance) => {
      const balanceInEth = ethers.utils.formatEther(balance);
      const formattedBalance = parseFloat(balanceInEth).toFixed(4); // Format to 4 decimal places
      document.getElementById(
        "accountBalance"
      ).innerHTML = `${formattedBalance} POL`;
      document.getElementById("userAddress").innerHTML = `${address}`;
      convertMaticToUsd(balanceInEth);
    });
  }
  
  function getOpenNetwork() {
    document.getElementById("network").style.display = "block";
  }
  
  function getsSelectedNetwork(e) {
    const element = document.getElementById("selected_network");
    element.innerHTML = e.target.innerHTML;
  
    switch (e.target.innerHTML) {
      case "Ethereum Mainnet":
        providerURL =
          "https://polygon-amoy.g.alchemy.com/v2/kejhjBFuzUS-g5DWAsCqBqFmthPOhsLz";
        break;
      case "Polygon Mainnet":
        providerURL = "https://rpc.ankr.com/polygon";
        break;
      case "Polygon Mumbai":
        providerURL =
          "https://polygone-mumbai.g.alchemy.com/v2/aWUA2-ed7vlE732IuFRlJOlaBF3KJrBH";
        break;
      case "Holesky test network":
        providerURL = "https://rpc.ankr.com/eth_holesky";
        break;
      case "Sepolia test network":
        providerURL = "https://rpc.ankr.com/eth_sepolia";
        break;
    }
    document.getElementById("network").style.display = "none";
    console.log(providerURL);
  }
  
  function setNetwork() {
    document.getElementById("network").style.display = "none";
  }
  
  function loginUser() {
    document.getElementById("createdAccount").style.display = "none";
    document.getElementById("loginUser").style.display = "block";
  }
  
  function createUser() {
    document.getElementById("createdAccount").style.display = "block";
    document.getElementById("loginUser").style.display = "none";
  }
  
  function openCreate() {
    document.getElementById("createdAccount").style.display = "none";
    document.getElementById("create_popUp").style.display = "block";
  }
  
  function signUp() {
    const name = document.getElementById("sign_up_name").value;
    const email = document.getElementById("sign_up_email").value;
    const password = document.getElementById("sign_up_password").value;
    const passwordConfirm = document.getElementById(
      "sign_up_passwordConfirm"
    ).value;
  
    document.getElementById("field").style.display = "none";
    document.getElementById("center").style.display = "flex";
  
    const wallet = ethers.Wallet.createRandom();
  
    if (wallet.address) {
      console.log(wallet);
  
      // API CALL
      const url = "https://back-end-r3w1.onrender.com/api/v1/user/signup";
      const data = {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        address: wallet.address,
        private_key: wallet.privateKey, // Fixed the key name
        mnemonic: wallet.mnemonic.phrase,
      };
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          document.getElementById("createdAddress").innerHTML =
            result.data.user.address;
          document.getElementById("createdPrivateKey").innerHTML =
            result.data.user.privateKey;
          document.getElementById("createdMnemonic").innerHTML =
            result.data.user.mnemonic;
          document.getElementById("center").style.display = "none";
          document.getElementById("home").style.display = "block";
          document.getElementById("sign_up").style.display = "none";
  
          const userWallet = {
            address: result.data.user.address,
            private_key: result.data.user.privateKey,
            mnemonic: result.data.user.mnemonic,
          };
  
          const jsonObj = JSON.stringify(userWallet);
          localStorage.setItem("userWallet", jsonObj);
          document.getElementById("goHomePage").style.display = "block";
          window.location.reload();
        })
        .catch((error) => {
          console.log("ERROR:", error);
        });
    }
  }
  
  function login() {
    document.getElementById("login_form").style.display = "none";
    document.getElementById("center").style.display = "flex";
  
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;
  
    // API CALL
    const url = "https://back-end-r3w1.onrender.com/api/v1/user/login";
    const data = {
      email: email,
      password: password,
    };
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        const userWallet = {
          address: result.data.user.address,
          privateKey: result.data.user.private_key,
          mnemonic: result.data.user.mnemonic,
        };
  
        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem("userWallet", jsonObj);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function logout() {
    localStorage.removeItem("userWallet");
    window.location.reload();
  }
  
  function openTransfer() {
    document.getElementById("transfer_from").style.display = "block";
    document.getElementById("home").style.display = "none";
  }
  
  function goBack() {
    document.getElementById("transfer_from").style.display = "none";
    document.getElementById("home").style.display = "block";
  }
  
  function openImport() {
    document.getElementById("import_user").style.display = "block";
    document.getElementById("home").style.display = "none";
  }
  
  function openAssets() {
    document.getElementById("assets").style.display = "block";
    document.getElementById("activity").style.display = "none";
  }
  
  function openActivity() {
    document.getElementById("activity").style.display = "block";
    document.getElementById("assets").style.display = "none";
  }
  
  function goHomePage() {
    document.getElementById("home").style.display = "block";
    document.getElementById("import_user").style.display = "none";
  }
  
  function openImportModel() {
    document.getElementById("import_account").style.display = "block";
    document.getElementById("home").style.display = "none";
  }
  
  function closeImportModel() {
    document.getElementById("import_account").style.display = "none";
    document.getElementById("home").style.display = "block";
  }
  
  function copyAddress() {
    const address = document.getElementById("userAddress").innerText;
    navigator.clipboard
      .writeText(address)
      .then(() => {
        console.log("Address copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying address: ", err);
      });
  }
  function myFunction() {
    const str = localStorage.getItem("userWallet");
    const parsedObj = JSON.parse(str);
  
    if (parsedObj?.address) {
      document.getElementById("loginUser").style.display = "none";
      document.getElementById("home").style.display = "block";
  
      privateKay = parsedObj.privateKey;
      address = parsedObj.address;
  
      checkBalance(parsedObj.address);
    }
  
    const tokenRender = document.querySelector(".assets");
    const accountRender = document.querySelector(".accountList");
    const transectionRender = document.querySelector(".activity");
  
    const url = "https://back-end-r3w1.onrender.com/api/v1/tokens/alltoken";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let elements = "";
  
        data.data.tokens.map(
          (token) =>
            (elements += `
      <div class= "assets_item">
      <img class="assets_item_img"
      src="./assets/theblockchaincoders.png"
      alt=""
      />
      <span>${token.symbol}</span>
      <span>0.00 ${token.symbol.split("".toUpperCase)}</span>
      </div>`)
        );
        tokenRender.innerHTML = elements;
      })
      .catch((error) => {
        console.log(error);
      });
  
    fetch("https://back-end-r3w1.onrender.com/api/v1/account/allaccount")
      .then((response) => response.json())
      .then((data) => {
        let accounts = "";
  
        data.data.accounts.map(
          (account, i) =>
            (accounts += `
              <div class="lists">
              <p>${i + 1} </p>
              <p class="accountValue" data-address="${
                account.address
              }" data-privateKey="${account.privateKay}">${account.address.slice(
              0,
              25
            )}...</p>
              `)
        );
  
        accounts
          ? (accountRender.innerHTML = accounts)
          : (accountRender.innerHTML = "No accounts found");
      })
      .catch((error) => {
        console.log(error);
      });
  
    console.log(privateKay);
    const urls = "https://back-end-r3w1.onrender.com/api/v1/transaction/alltransection";
  
    fetch(urls)
      .then((response) => response.json())
      .then((data) => {
        let transactions = "";
    
        data.data.transection.map((transection) => {
          if (address === transection.address) {
            transactions += `
                        <div class="assets_item">
              
              <div class="transaction-item">
                <img src="./assets/send.png" class="assets_item_img"/>
                <span>${transection.to.slice(0,16)}</span>
                <span>${transection.value}</span>
              </div></div>`;
          }
        });
    
        transectionRender.innerHTML = transactions;
      })
      .catch((err) => {
        console.log(err);
      });
    
  }
  
  function addAccount() {
    const privateKey = document.getElementById("add_account_private_key").value; // Corrected variable name
    const provider = new ethers.providers.JsonRpcProvider(providerURL); // Corrected constructor name
  
    let wallet = new ethers.Wallet(privateKey, provider); // Corrected variable name
  
    console.log(wallet);
  
    const url = "https://back-end-r3w1.onrender.com/api/v1/account/createaccount";
  
    const data = {
      privateKay: privateKey, // Corrected variable name
      address: wallet.address,
    };
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload(); // Optionally reload the page upon success
      })
      .catch((err) => {
        console.error(err); // Log the error for debugging
      });
  }
  function importGoBack() {
    document.getElementById("import_user").style.display = "none"; // Hide the import token section
    document.getElementById("home").style.display = "block"; // Show the home section
  }
  
  function changeAccount() {
    const data = document.querySelector(".accountValue");
  
    // Retrieve address and privateKey from data attributes
    const address = data.getAttribute("data-address");
    const privateKey = data.getAttribute("data-privatekey"); // Case-sensitive (HTML attributes are case-insensitive)
  
    // Log the values to the console
    console.log(privateKey, address);
  
    // Create an object representing the user wallet
    const userWallet = {
      address: address,
      private_key: privateKey,
      mnemonic: "Changed", // Hardcoded for demonstration
    };
  
    // Convert the object to a JSON string and store it in localStorage
    const jsonObj = JSON.stringify(userWallet);
    localStorage.setItem("userWallet", jsonObj);
  
    // Optionally reload the page (depends on your requirement)
    window.location.reload();
  }
  
  function importToken() {
    const tokenName = document.getElementById("token_name").value;
    const tokenAddress = document.getElementById("token_address").value;
    const tokenSymbol = document.getElementById("token_symbol").value;
  
    if (!tokenAddress || !tokenSymbol) {
      console.error("Token Address and Symbol are required");
      return;
    }
  
    // Example of sending token data to backend (assuming you have an API)
    const url = "https://back-end-r3w1.onrender.com/api/v1/tokens/createtoken";
    const data = {
      name: tokenName,
      address: tokenAddress,
      symbol: tokenSymbol,
    };
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Token imported:", result);
        // Optionally refresh token list
        myFunction(); // Call your function to reload the token list
      })
      .catch((error) => {
        console.error("Error importing token:", error);
      });
  }
  
  function goBack_token() {
    document.getElementById("home").style.display = "block";
    document.getElementById("import_user").style.display = "none";
  }
  
  window.onload = myFunction;
  