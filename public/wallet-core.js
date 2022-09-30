/**
 * List of handler functions to be called, for each wallet event
 */
const walletEventsHandlers = {
    accountsChanged: [],
    chainChanged: [],
};

// Add debugging handlers for wallet events
/* DISABLED
walletEventsHandlers.accountsChanged.push(accounts => {
    console.log(`--- accountsChanged:`, accounts); //// TEST
});
walletEventsHandlers.chainChanged.push(chainIdHex => {
    console.log(`--- chainChanged:`, chainIdHex); //// TEST
});
*/

document.addEventListener('DOMContentLoaded', () => {
    if (window.ethereum) {
        // Execute all handlers assigned to each wallet event, when such an event is triggered
        window.ethereum.on('accountsChanged', accounts => {
            walletEventsHandlers.accountsChanged.forEach(handler => handler(accounts));
        });
        // Using "chainChanged" b/c "networkChanged" is deprecated
        window.ethereum.on('chainChanged', chainIdHex => {
            walletEventsHandlers.chainChanged.forEach(handler => handler(chainIdHex));
        });
    }
});

// Source: https://ethereum.org/en/developers/tutorials/hello-world-smart-contract-fullstack/#the-connectWallet-function
async function connectWallet() {
    let walletError = null;
    if (window.ethereum) {
        try {
            await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            /**
             * NOT using the address returned by this request.
             * Instead, "ethereum.selectedAddress" will be used.
             */
            return;
        } catch (error) {
            walletError = error.message;
        }
    } else {
        walletError = 'Please install a wallet such as MetaMask';
    }
    if (walletError) {
        alert(walletError);
    }
}

function getConnectedAddress() {
    // WARNING: "ethereum.selectedAddress" is deprecated?
    return window.ethereum?.selectedAddress;
}
