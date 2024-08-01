const privateLabelsDefault = {};

// Save default list of private labels by address into local-storage, if needed
if (!localStorage.getItem('widgetPrivateLabels')) {
    localStorage.setItem('widgetPrivateLabels', JSON.stringify(privateLabelsDefault));
}

const privateLabels = JSON.parse(localStorage.getItem('widgetPrivateLabels'));

const elInputStarknetAddress = document.getElementById('input-starknet-address');
const elInputPrivateLabel = document.getElementById('input-private-label');
const elPrivateLabelsList = document.getElementById('private-labels-list');
const elImportButton = document.getElementById('import-button');
const elInputUpload = document.getElementById('input-upload');

function injectElListItem(address, label) {
    const elListItem = document.createElement('li');
    elListItem.innerHTML = /*html*/ `
        <div class="address" title=""></div>
        <div class="label"></div>
        <div class="remove" onclick="removeLabelForElAddress(this)"></div>
    `;
    // Set values via "textContent", to avoid issues re: HTML entities - e.g. "<Q> Elerium"
    elListItem.querySelector('.address').textContent = getCompactAddress(address);
    elListItem.querySelector('.address').title = address;
    elListItem.querySelector('.label').textContent = label;
    elListItem.dataset.address = address;
    elPrivateLabelsList.append(elListItem);
}

function removeLabelForElAddress(elRemove) {
    const elListItem = elRemove.closest('li');
    if (!elListItem) {
        return;
    }
    const address = elListItem.dataset.address;
    elListItem.parentElement.removeChild(elListItem);
    delete privateLabels[address];
    savePrivateLabels();
}

function addPrivateLabel() {
    const address = elInputStarknetAddress.value.trim().toLowerCase();
    const label = elInputPrivateLabel.value.trim();
    if (!address.match(/^0x[0-9a-f]+$/)) {
        alert('Please enter a Starknet address in 0x... format');
        return;
    }
    if (!label) {
        alert('Please enter a label for the Starknet address');
        return;
    }
    if (privateLabels[address]) {
        // Remove existing label, before adding it again
        const elRemove = elPrivateLabelsList.querySelector(`[data-address="${address}"] .remove`);
        if (!elRemove) {
            return;
        }
        removeLabelForElAddress(elRemove);
    }
    privateLabels[address] = label;
    savePrivateLabels();
    renderPrivateLabels();
    // Reset inputs
    elInputStarknetAddress.value = '';
    elInputPrivateLabel.value = '';
}

/**
 * Save the private labels into local-storage for the widget,
 * and emit event for saving them into the local-storage for the extension.
 */
function savePrivateLabels() {
    const privateLabelsString = JSON.stringify(privateLabels);
    localStorage.setItem('widgetPrivateLabels', privateLabelsString);
    // Emit event to parent window, after updating the private labels in the widget
    if (window.self !== window.top) {
        const widgetEventData = {
            widgetEventKey: 'PRIVATE_LABELS_UPDATED',
            widgetEventValue: privateLabelsString,
        };
        window.parent.postMessage(widgetEventData, '*');
    }
}

/**
 * Render the list of private labels, sorted by label (case-insensitive)
 */
function renderPrivateLabels() {
    elPrivateLabelsList.textContent = '';
    const labelsSorted = Object.values(privateLabels).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    const labelsSortedUnique = [...new Set(labelsSorted)];
    labelsSortedUnique.forEach(label => {
        // The same label may be associated with multiple addresses
        const addresses = Object.keys(privateLabels).filter(address => privateLabels[address] === label);
        addresses.forEach(address => {
            injectElListItem(address, label);
        });
    });
}

function uploadPrivateLabels() {
    elInputUpload.click(); // trigger upload via file selection
}

function downloadPrivateLabels() {
    const elLink = document.createElement('a');
    const blob = new Blob([JSON.stringify(privateLabels)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    elLink.setAttribute('href', url);
    elLink.setAttribute('download', 'influence-private-labels.json');
    elLink.click(); // trigger download
}

function handleUpload() {
    if (!this.files || !this.files.length) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        const fileText = event.target.result;
        const privateLabelsNew = JSON.parse(fileText);
        // Add new labels + update existing labels
        for (const [address, label] of Object.entries(privateLabelsNew)) {
            privateLabels[address] = label;
        }
        savePrivateLabels();
        renderPrivateLabels();
        // Reset the file input
        elInputUpload.value = '';
        // Flash the import button
        elImportButton.classList.add('flash-import');
        // Stop flashing after 3 flashes (based on animation-duration of ".flash-import" in SCSS)
        setTimeout(() => elImportButton.classList.remove('flash-import'), 900);
    };
    reader.readAsText(this.files[0]);
}

elInputUpload.addEventListener('change', handleUpload, false);

// Inject the list of private labels, based on initial "privateLabels" from local-storage
renderPrivateLabels();
