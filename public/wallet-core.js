let web3;

document.addEventListener('DOMContentLoaded', () => {
    web3 = new Web3(window.ethereum);
});

function getChecksumAddress(address) {
    return web3 ? web3.utils.toChecksumAddress(address) : address; // fallback to NON-checksum address
    //// TO DO: try to rework this without "web3" => delete "web3.min.js"?
    //// ____
}

// Source: https://ethereum.org/en/developers/tutorials/hello-world-smart-contract-fullstack/#the-connectWallet-function
async function connectWallet() {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            return {
                address: getChecksumAddress(addressArray[0]),
            };
        } catch (error) {
            return {
                error: error.message,
            };
        }
    } else {
        return {
            error: 'Please install a wallet such as MetaMask',
        };
    }
}

function getConnectedAddress() {
    // WARNING: "ethereum.selectedAddress" is deprecated?
    return (window.ethereum && window.ethereum.selectedAddress) ? getChecksumAddress(window.ethereum.selectedAddress) : null;
}
