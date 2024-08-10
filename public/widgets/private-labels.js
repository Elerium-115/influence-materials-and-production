const urlParamAddAddress = urlParams.get('add_address');

const privateLabelsDefault = {};

// Save default list of private labels by address into local-storage, if needed
if (!localStorage.getItem('widgetPrivateLabels')) {
    localStorage.setItem('widgetPrivateLabels', JSON.stringify(privateLabelsDefault));
}

const privateLabels = JSON.parse(localStorage.getItem('widgetPrivateLabels'));

// Convert obsolete JSON to new format
Object.keys(privateLabels).forEach(address => {
    const addressData = privateLabels[address];
    if (typeof addressData === 'string') {
        // Obsolete "addressData" is the label itself
        privateLabels[address] = {
            isBlacklisted: false, // NO blacklisting for obsolete JSON
            label: addressData,
        };
    }
});

const elAddUpdateSection = document.getElementById('add-update-section');
const elInputStarknetAddress = document.getElementById('input-starknet-address');
const elInputPrivateLabel = document.getElementById('input-private-label');
const elInputIsBlacklisted = document.getElementById('input-is-blacklisted');
const elPrivateLabelsList = document.getElementById('private-labels-list');
const elImportButton = document.getElementById('import-button');
const elInputUpload = document.getElementById('input-upload');
const elInputSearch = document.getElementById('input-search');

function injectElListItemForAddress(address) {
    const addressData = privateLabels[address];
    const elListItem = document.createElement('li');
    elListItem.innerHTML = /*html*/ `
        <div class="address" title=""></div>
        <div class="label"></div>
        <div class="remove"></div>
    `;
    // Set values via "textContent", to avoid issues re: HTML entities - e.g. "<Q> Elerium"
    elListItem.querySelector('.address').textContent = getCompactAddress(address);
    elListItem.querySelector('.address').title = address;
    // Set label via "textContent", NOT via "innerHTML", to avoid issues re: encoding
    elListItem.querySelector('.label').textContent = addressData.label;
    elListItem.dataset.address = address;
    elListItem.classList.toggle('is-blacklisted', addressData.isBlacklisted);
    elListItem.addEventListener('click', onClickPrivateLabel);
    elListItem.querySelector('.remove').addEventListener('click', onClickPrivateLabelRemove);
    elPrivateLabelsList.append(elListItem);
}

function onClickPrivateLabel(event) {
    const elListItem = event.target.closest('li');
    const address = elListItem.dataset.address;
    // Populate the inputs to update
    elInputStarknetAddress.value = address;
    elInputPrivateLabel.value = privateLabels[address].label;
    elInputIsBlacklisted.checked = privateLabels[address].isBlacklisted;
    elInputIsBlacklisted.dispatchEvent(new Event('change'));
    // Ensure the label input is visible, i.e. its parent section is not closed
    elAddUpdateSection.classList.remove('closed')
    // Focus the label input
    elInputPrivateLabel.focus();
}

function onClickPrivateLabelRemove(event) {
    // Prevent this click from also triggering "onClickPrivateLabel"
    event.stopPropagation();
    if (!confirm('Are you sure you want to remove this label?')) {
        // Abort removal
        return;
    }
    const elListItem = event.target.closest('li');
    const address = elListItem.dataset.address;
    removeLabelForAddress(address);
}

function removeLabelForAddress(address, shouldSave = true) {
    const elListItem = elPrivateLabelsList.querySelector(`[data-address="${address}"]`);
    if (!elListItem) {
        return;
    }
    elListItem.parentElement.removeChild(elListItem);
    delete privateLabels[address];
    if (shouldSave) {
        savePrivateLabels();
    }
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
        /**
         * Remove existing label, before adding it again.
         * Bypass "savePrivateLabels" during "removeLabelForAddress",
         * b/c "savePrivateLabels" will be called later in this function.
         */
        removeLabelForAddress(address, false);
    }
    privateLabels[address] = {
        isBlacklisted: elInputIsBlacklisted.checked,
        label,
    };
    savePrivateLabels();
    renderPrivateLabels();
    // Reset inputs
    elInputStarknetAddress.value = '';
    elInputPrivateLabel.value = '';
    elInputIsBlacklisted.checked = false;
    elInputIsBlacklisted.dispatchEvent(new Event('change'));
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
    const labelsSorted = Object.values(privateLabels)
        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
        .map(addressData => addressData.label);
    const labelsSortedUnique = [...new Set(labelsSorted)];
    labelsSortedUnique.forEach(label => {
        // The same label may be associated with multiple addresses
        const addresses = Object.keys(privateLabels).filter(address => privateLabels[address].label === label);
        addresses.forEach(address => {
            injectElListItemForAddress(address);
        });
    });
    // Also reset the search input
    elInputSearch.value = '';
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
        // Convert obsolete JSON to new format
        Object.keys(privateLabelsNew).forEach(address => {
            const addressData = privateLabelsNew[address];
            if (typeof addressData === 'string') {
                // Obsolete "addressData" is the label itself
                privateLabelsNew[address] = {
                    isBlacklisted: false, // NO blacklisting for obsolete JSON
                    label: addressData,
                };
            }
        });
        // Add new labels + update existing labels
        for (const [address, addressData] of Object.entries(privateLabelsNew)) {
            privateLabels[address] = addressData;
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

function onInputSearch() {
    const queryLowercase = elInputSearch.value.toLowerCase().trim();
    [...elPrivateLabelsList.children].forEach(elListItem => {
        const addressLowercase = elListItem.dataset.address.toLowerCase();
        const labelLowercase = elListItem.textContent.toLowerCase();
        const isMatch = !queryLowercase.length ||
            addressLowercase.includes(queryLowercase) ||
            labelLowercase.includes(queryLowercase);
        elListItem.classList.toggle('hidden', !isMatch);
    });
}

elInputUpload.addEventListener('change', handleUpload, false);

// Inject the list of private labels, based on initial "privateLabels" from local-storage
renderPrivateLabels();

if (urlParamAddAddress) {
    // Populate the address received via URL params (e.g. from the Chrome extension)
    elInputStarknetAddress.value = urlParamAddAddress.trim().toLowerCase();
    // Focus the label input
    elInputPrivateLabel.focus();
}
