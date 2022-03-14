const rawMaterialsBySpectralType = {
    'c': ['carbon-dioxide', 'carbon-monoxide', 'methane', 'water', 'apatite', 'bitumen', 'calcite'],
    'i': ['ammonia', 'carbon-dioxide', 'carbon-monoxide', 'hydrogen', 'methane', 'nitrogen', 'sulfur-dioxide', 'water'],
    'm': ['graphite', 'rhabdite', 'taenite', 'troilite', 'uranite'],
    's': ['feldspar', 'olivine', 'pyroxene', 'merrillite', 'xenotime', 'coffinite'],
};

const rawMaterialsByMaterialType = {
    'volatiles': ['ammonia', 'carbon-dioxide', 'carbon-monoxide', 'hydrogen', 'methane', 'nitrogen', 'sulfur-dioxide', 'water'],
    'organics': ['apatite', 'bitumen', 'calcite'],
    'metals': ['feldspar', 'graphite', 'olivine', 'pyroxene', 'rhabdite', 'taenite', 'troilite'],
    'rare-earth': ['merrillite', 'xenotime'],
    'fissiles': ['coffinite', 'uranite'],
};

const elsSpectralTypes = document.querySelectorAll(".spectral-types ul li");
const elsMaterialTypes = document.querySelectorAll(".material-type");
const elsRawMaterials = document.querySelectorAll(".raw-material");

const elTitleSpectralTypes = document.querySelector(".spectral-types h2");
const elTitleRawMaterials = document.querySelector(".material-types h2");
const originalTitleSpectralTypes = elTitleSpectralTypes.textContent;
const originalTitleRawMaterials = elTitleRawMaterials.textContent;

function getSpectralTypesForRawMaterial(rawMaterial) {
    let spectralTypes = [];
    for (spectralType in rawMaterialsBySpectralType) {
        if (rawMaterialsBySpectralType[spectralType].includes(rawMaterial)) {
            spectralTypes.push(spectralType);
            /**
             * assuming that multi-spectral types (e.g. "cis")
             * that include the current "spectralType" (e.g. "s")
             * also contain the same "rawMaterial" (e.g. "xenotime")
             */
            if (spectralType === 'c') {
                spectralTypes.push('ci', 'cis', 'cm', 'cms', 'cs');
            }
            if (spectralType === 'i') {
                spectralTypes.push('ci', 'cis', 'si');
            }
            if (spectralType === 'm') {
                spectralTypes.push('cm', 'cms', 'sm');
            }
            if (spectralType === 's') {
                spectralTypes.push('cis', 'cms', 'cs', 'si', 'sm');
            }
        }
    }
    return spectralTypes;
}

function getRawMaterialsForSpectralType(spectralType) {
    let rawMaterials = [];
    for (let i=0; i<spectralType.length; i++) {
        // parsing each base-type (e.g. "C" + "M" + "S") from multi-spectrals (e.g. "CMS")
        const baseSpectralType = spectralType[i];
        rawMaterials = rawMaterials.concat(rawMaterialsBySpectralType[baseSpectralType]);
    }
    return rawMaterials;
}

function getMaterialTypeForRawMaterial(rawMaterial) {
    for (materialType in rawMaterialsByMaterialType) {
        if (rawMaterialsByMaterialType[materialType].includes(rawMaterial)) {
            return materialType;
        }
    }
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
        const rawMaterials = getRawMaterialsForSpectralType(spectralType);
        if (!rawMaterials) {
            return;
        }
        rawMaterials.forEach(rawMaterial => {
            const materialType = getMaterialTypeForRawMaterial(rawMaterial);
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
        const materialType = getMaterialTypeForRawMaterial(rawMaterial);
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
