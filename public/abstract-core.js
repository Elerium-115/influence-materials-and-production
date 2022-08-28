
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
