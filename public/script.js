const spectralTypes = ['c', 'ci', 'cis', 'cm', 'cms', 'cs', 'i', 'm', 's', 'si', 'sm'];

const rawMaterialsByBaseSpectralType = {
    'c': ['carbon-dioxide', 'carbon-monoxide', 'methane', 'water', 'apatite', 'bitumen', 'calcite'],
    'i': ['ammonia', 'carbon-dioxide', 'carbon-monoxide', 'hydrogen', 'methane', 'nitrogen', 'sulfur-dioxide', 'water'],
    'm': ['graphite', 'rhabdite', 'taenite', 'troilite', 'uraninite'],
    's': ['feldspar', 'olivine', 'pyroxene', 'merrillite', 'xenotime', 'coffinite'],
};

// determine the raw-materials for each spectral-type (including multi-spectrals e.g. "CMS")
const rawMaterialsBySpectralType = {};
spectralTypes.forEach(spectralType => {
    const rawMaterials = [];
    // parsing each letter from multi-spectrals as a base-type spectral (e.g. "CMS" => "C" + "M" + "S")
    for (let i=0; i<spectralType.length; i++) {
        const baseSpectralType = spectralType[i];
        rawMaterialsByBaseSpectralType[baseSpectralType].forEach(rawMaterial => {
            // avoid pushing the same raw-material multiple times (e.g. "Water" from both "C" and "I")
            if (!rawMaterials.includes(rawMaterial)) {
                rawMaterials.push(rawMaterial);
            }
        });
    }
    rawMaterialsBySpectralType[spectralType] = rawMaterials;
});

const materialTypes = ['volatiles', 'organics', 'metals', 'rare-earth', 'fissiles'];

const rawMaterialsByMaterialType = {
    'volatiles': ['ammonia', 'carbon-dioxide', 'carbon-monoxide', 'hydrogen', 'methane', 'nitrogen', 'sulfur-dioxide', 'water'],
    'organics': ['apatite', 'bitumen', 'calcite'],
    'metals': ['feldspar', 'graphite', 'olivine', 'pyroxene', 'rhabdite', 'taenite', 'troilite'],
    'rare-earth': ['merrillite', 'xenotime'],
    'fissiles': ['coffinite', 'uraninite'],
};

// determine the material-type of each raw-material
// (also generate list of all raw-materials, sorted by material-type)
const materialTypeByRawMaterial = {};
let rawMaterialsSortedByMaterialType = [];
materialTypes.forEach(materialType => {
    const rawMaterials = rawMaterialsByMaterialType[materialType];
    rawMaterials.forEach(rawMaterial => materialTypeByRawMaterial[rawMaterial] = materialType);
    rawMaterialsSortedByMaterialType = rawMaterialsSortedByMaterialType.concat(rawMaterials);
});

//// PAGE-SPECIFIC LOGIC BELOW

const elsSpectralTypes = document.querySelectorAll(".spectral-types ul li");
const elsMaterialTypes = document.querySelectorAll(".material-type");
const elsRawMaterials = document.querySelectorAll(".raw-material");

const elTitleSpectralTypes = document.querySelector(".spectral-types h2");
const elTitleRawMaterials = document.querySelector(".material-types h2");
const originalTitleSpectralTypes = elTitleSpectralTypes.textContent;
const originalTitleRawMaterials = elTitleRawMaterials.textContent;

function getSpectralTypesForRawMaterial(rawMaterial) {
    const spectralTypes = [];
    for (const baseSpectralType in rawMaterialsByBaseSpectralType) {
        if (rawMaterialsByBaseSpectralType[baseSpectralType].includes(rawMaterial)) {
            spectralTypes.push(baseSpectralType);
            /**
             * multi-spectral types (e.g. "cis")
             * that include the current "baseSpectralType" (e.g. "s")
             * also contain the same "rawMaterial" (e.g. "xenotime")
             */
            if (baseSpectralType === 'c') {
                spectralTypes.push('ci', 'cis', 'cm', 'cms', 'cs');
            }
            if (baseSpectralType === 'i') {
                spectralTypes.push('ci', 'cis', 'si');
            }
            if (baseSpectralType === 'm') {
                spectralTypes.push('cm', 'cms', 'sm');
            }
            if (baseSpectralType === 's') {
                spectralTypes.push('cis', 'cms', 'cs', 'si', 'sm');
            }
        }
    }
    return spectralTypes;
}

function resetSelectionsExcept(skipEntity = null) {
    if (skipEntity != 'spectral-types') {
        elsSpectralTypes.forEach(el => el.classList.remove('active'));
    }
    if (skipEntity != 'material-types') {
        elsMaterialTypes.forEach(el => el.classList.remove('active'));
    }
    if (skipEntity != 'raw-materials') {
        elsRawMaterials.forEach(el => el.classList.remove('active'));
    }
    elTitleSpectralTypes.textContent = originalTitleSpectralTypes;
    elTitleRawMaterials.textContent = originalTitleRawMaterials;
}

function updateRawMaterialsForActiveSpectralTypes() {
    resetSelectionsExcept('spectral-types');
    const elsSpectralTypesActive = document.querySelectorAll(".spectral-types ul li.active");
    elsSpectralTypesActive.forEach(el => {
        const spectralType = el.dataset.value;
        const rawMaterials = rawMaterialsBySpectralType[spectralType];
        if (!rawMaterials) {
            return;
        }
        rawMaterials.forEach(rawMaterial => {
            const materialType = materialTypeByRawMaterial[rawMaterial];
            document.querySelector(`.material-type[data-value="${materialType}"]`).classList.add('active');
            document.querySelector(`.raw-material[data-value="${rawMaterial}"]`).classList.add('active');
        });
    });
    elTitleRawMaterials.textContent = elsSpectralTypesActive.length ? originalTitleRawMaterials + ' that can be mined from the selected spectral types' : originalTitleRawMaterials;
}

function updateSpectralTypesForActiveRawMaterials() {
    const elsRawMaterialsActive = document.querySelectorAll(".raw-material.active");
    if (!elsRawMaterialsActive.length) {
        resetSelectionsExcept();
        return;
    }
    elsRawMaterialsActive.forEach(el => {
        const rawMaterial = el.dataset.value;
        const materialType = materialTypeByRawMaterial[rawMaterial];
        document.querySelector(`.material-type[data-value="${materialType}"]`).classList.add('active');
        const spectralTypes = getSpectralTypesForRawMaterial(rawMaterial);
        spectralTypes.forEach(spectralType => {
            document.querySelector(`.spectral-types ul li[data-value="${spectralType}"]`).classList.add('active');
        });
    });
    elTitleSpectralTypes.textContent = elsRawMaterialsActive.length ? originalTitleSpectralTypes + ' from which the selected raw material can be mined' : originalTitleSpectralTypes;
}

let lastSelectedItemType = ''; // 'spectral-type' or 'raw-material'
let lastSelectedRawMaterial = '';

elsSpectralTypes.forEach(el => {
    el.addEventListener('click', function(event) {
        if (lastSelectedItemType === 'raw-material') {
            // switching from selecting raw materials, to selecting spectral types
            resetSelectionsExcept();
        }
        event.currentTarget.classList.toggle('active');
        updateRawMaterialsForActiveSpectralTypes();
        lastSelectedItemType = 'spectral-type';
    });
});

elsRawMaterials.forEach(el => {
    el.addEventListener('click', function(event) {
        const newlySelectedRawMaterial = event.currentTarget.dataset.value;
        if (lastSelectedItemType === 'raw-material') {
            if (lastSelectedRawMaterial.length && lastSelectedRawMaterial !== newlySelectedRawMaterial) {
                // prevent selecting multiple raw materials
                resetSelectionsExcept();
            }
            event.currentTarget.classList.toggle('active');
        } else {
            resetSelectionsExcept();
            event.currentTarget.classList.add('active');
        }
        updateSpectralTypesForActiveRawMaterials();
        lastSelectedItemType = 'raw-material';
        lastSelectedRawMaterial = event.currentTarget.classList.contains('active') ? newlySelectedRawMaterial : '';
    });
});
