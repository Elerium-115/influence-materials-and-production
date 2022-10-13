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
async function connectWallet(isExampleAsteroidsPlan = false) {
    if (!getConnectedAddress() && isExampleAsteroidsPlan) {
        /**
         * Attempting to connect a wallet while using the "example" asteroids plan
         * => require confirmation, before resetting the asteroids plan.
         */
        if (!confirm(`The current "example" asteroids plan will be reset, after you connect your wallet. You can then start a new plan, and it will be automatically saved for your wallet. Are you sure you want to continue?`)) {
            return; // Abort wallet connection
        }
    }
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

/**
 * Refresh wallet by triggering "walletEventsHandlers" for "accountsChanged"
 */
async function refreshWallet() {
    if (window.ethereum) {
        // Wait until the connected address can be retrieved
        await window.ethereum.request({
            method: 'eth_accounts',
        });
        // Then trigger the "walletEventsHandlers" for "accountsChanged"
        window.ethereum.emit('accountsChanged');
    }
}

function getConnectedAddress() {
    // WARNING: "ethereum.selectedAddress" is deprecated?
    return window.ethereum?.selectedAddress;
}
