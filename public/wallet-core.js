/**
 * Wallet status
 */
const walletStatus = {
    connectedAddress: null,
    hasAddressChangedWhileWalletConnected: false,
    isConnected: false,
};

/**
 * List of handler functions to be called, for each wallet event
 */
const walletEventsHandlers = {
    accountsChanged: [],
    chainChanged: [],
};

let isRegisteredWalletEventsHandlers = false;

// Add default handler for wallet event "accountsChanged"
walletEventsHandlers.accountsChanged.push(async (accounts) => {
    // Call "getConnectedAddress" to ensure "walletStatus" ends up being updated, if needed
    await getConnectedAddress();
});

/* DISABLED
// Add default handler for wallet event "chainChanged"
walletEventsHandlers.chainChanged.push(chainIdHex => {
    console.log(`--- chainChanged:`, chainIdHex); //// TEST
});
*/

document.addEventListener('DOMContentLoaded', () => {
    if (window.ethereum) {
        /**
         * Execute all handlers assigned to each wallet event, when such an event is triggered.
         * Chain the handlers synchronously, because the order in which they are executed is relevant!
         */
        window.ethereum.on('accountsChanged', async accounts => {
            for (handler of walletEventsHandlers.accountsChanged) {
                await handler(accounts);
            }
        });
        // Using "chainChanged" b/c "networkChanged" is deprecated
        window.ethereum.on('chainChanged', async chainIdHex => {
            for (handler of walletEventsHandlers.chainChanged) {
                await handler(chainIdHex);
            }
        });
        isRegisteredWalletEventsHandlers = true;
    }
});

// Source: https://ethereum.org/en/developers/tutorials/hello-world-smart-contract-fullstack/#the-connectWallet-function
async function connectWallet(isExampleAsteroidsPlan = false) {
    if (!await getConnectedAddress() && isExampleAsteroidsPlan) {
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
             * Instead, "getConnectedAddress" will be used.
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
 * Refresh wallet by triggering "walletEventsHandlers" for "accountsChanged".
 * Returns "true" if wallet installed, otherwise "false".
 */
function refreshWallet() {
    if (window.ethereum) {
        setTimeout(async () => {
            // Wait until the connected address can be retrieved
            await window.ethereum.request({
                method: 'eth_accounts',
            });
            /**
             * Then trigger the "walletEventsHandlers" for "accountsChanged",
             * AFTER those handlers are registered on "DOMContentLoaded".
             */
            emitAccountsChangedAfterRegisteredWalletEventsHandlers();
        });
        return true;
    } else {
        return false;
    }
}

/**
 * This method is required for the (random / slow network) situation when "refreshWallet" would
 * emit "accountsChanged" BEFORE the handlers for that event are registerd in "DOMContentLoaded".
 * (i.e. "DOMContentLoaded" is triggered AFTER the wallet responds with the connected address)
 */
function emitAccountsChangedAfterRegisteredWalletEventsHandlers() {
    if (isRegisteredWalletEventsHandlers) {
        window.ethereum.emit('accountsChanged');
        return;
    }
    const interval = setInterval(() => {
        if (isRegisteredWalletEventsHandlers) {
            clearInterval(interval);
            window.ethereum.emit('accountsChanged');
        }
    }, 100);
}

/**
 * NOTE: This function may return a connected address even if the latest "accountsChanged" event indicated NO connected address.
 * This is happening e.g. on the initial page load, when the wallet is connected, but the actual address is not retrieved immediately.
 */
async function getConnectedAddress() {
    // WARNING: "ethereum.selectedAddress" is deprecated?
    let connectedAddressNew = window.ethereum?.selectedAddress;
    if (!connectedAddressNew && window.ethereum) {
        /**
         * Fix for Brave wallet re: "ethereum.selectedAddress" undefined
         * after navigating back to a page where the wallet is already connected.
         */
        const ethAccounts = await window.ethereum.request({
            method: 'eth_accounts',
        });
        connectedAddressNew = ethAccounts[0];
    }
    updateWalletStatusForConnectedAddress(connectedAddressNew);
    return connectedAddressNew;
}

function updateWalletStatusForConnectedAddress(connectedAddressNew) {
    const connectedAddressOld = walletStatus.connectedAddress;
    if (connectedAddressNew != connectedAddressOld) {
        /**
         * The wallet was connected / disconnected, or the connected address has changed
         * (while wallet connected), since the last time this function was called.
         */
        if (connectedAddressNew) {
            walletStatus.connectedAddress = connectedAddressNew;
            walletStatus.hasAddressChangedWhileWalletConnected = Boolean(connectedAddressNew && connectedAddressOld);
            walletStatus.isConnected = true;
        } else {
            walletStatus.connectedAddress = null;
            walletStatus.hasAddressChangedWhileWalletConnected = false;
            walletStatus.isConnected = false;
        }
    }
}
