
/**
 * Fix for Firefox bug re: checkbox inputs keeping
 * the "checked" PROPERTY cached after a SOFT-reload.
 * e.g. if deselecting an input, and then doing a soft-reload,
 * the input will keep its "checked" property = false,
 * even though the DOM elements are marked as checked.
 */
document.querySelectorAll('.options label > input').forEach(elInput => {
    elInput.checked = elInput.parentElement.classList.contains('checked');
});

/**
 * e.g. "Thin-film Resistor" => "Thin-filmResistor"
 */
 function getCompactName(name) {
    return name.replace(/\s+/g, '');
}

/**
 * e.g. "Thin-film Resistor" => "thin-film-resistor"
 */
function getItemNameSafe(itemName) {
    return itemName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
}

/**
 * e.g. "Raw Material" => "item-type-raw-material"
 */
function getItemTypeClass(itemType) {
    return `item-type-${getItemNameSafe(itemType)}`;
}

function validateInputArea(el) {
    if (!el.value.length) {
        return;
    }
    const intValue = parseInt(el.value);
    // Min. 13 km2, max. 1768484 km2 (Adalia Prime)
    el.value = isNaN(intValue) || intValue < 13 ? 13 : Math.min(intValue, 1768484);
}

// Source: https://gist.github.com/Machy8/1b0e3cd6c61f140a6b520269acdd645f
function on(eventType, selector, callback) {
    document.addEventListener(eventType, event => {
        if (event.target.matches(selector)) {
            callback(event.target);
        }
    }, true); // "true" required for correct behaviour of e.g. "mouseenter" / "mouseleave" attached to elements that have children
}

// Toggle option checked
on('change', 'label > input', el => {
    if (el.checked) {
        el.parentElement.classList.add('checked');
    } else {
        el.parentElement.classList.remove('checked');
    }
});
