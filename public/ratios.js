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

const materialTypesRatiosBySpectralType = {
    'c': {'volatiles': 2/5, 'organics': 3/5},
    'ci': {'volatiles': 1/2, 'organics': 1/2},
    'cis': {'volatiles': 3/7, 'organics': 1/7, 'metals': 1/7, 'rare-earth': 1/7, 'fissiles': 1/7},
    'cm': {'volatiles': 1/5, 'organics': 1/5, 'metals': 2/5, 'fissiles': 1/5},
    'cms': {'volatiles': 1/7, 'organics': 1/7, 'metals': 3/7, 'rare-earth': 1/7, 'fissiles': 1/7},
    'cs': {'volatiles': 1/5, 'organics': 1/5, 'metals': 1/5, 'rare-earth': 1/5, 'fissiles': 1/5},
    'i': {'volatiles': 1/1},
    'm': {'metals': 4/5, 'fissiles': 1/5},
    's': {'metals': 1/3, 'rare-earth': 1/3, 'fissiles': 1/3},
    'si': {'volatiles': 2/5, 'metals': 1/5, 'rare-earth': 1/5, 'fissiles': 1/5},
    'sm': {'metals': 3/5, 'rare-earth': 1/5, 'fissiles': 1/5},
};

// determine the ratio of each raw-material contained in each spectral-type
const rawMaterialsRatiosBySpectralType = {};
for (const spectralType in materialTypesRatiosBySpectralType) {
    const materialTypesRatios = materialTypesRatiosBySpectralType[spectralType];
    const rawMaterials = rawMaterialsBySpectralType[spectralType];
    // count raw-materials of each material-type, for this spectral-type
    const rawMaterialsCountByMaterialType = {};
    rawMaterials.forEach(rawMaterial => {
        const materialType = materialTypeByRawMaterial[rawMaterial];
        if (!rawMaterialsCountByMaterialType[materialType]) {
            rawMaterialsCountByMaterialType[materialType] = 0;
        }
        rawMaterialsCountByMaterialType[materialType]++;
    });
    // determine the ratio of each raw-material contained in this spectral-type
    rawMaterialsRatiosBySpectralType[spectralType] = {};
    rawMaterials.forEach(rawMaterial => {
        /**
         * General formula for a spectral-type containing various material-types, in various ratios:
         * - if material-type "T" has ratio "R(T)" and contains "N(T)" raw-materials.
         * - then each raw-material of type T has a ratio % of 100 * R(T) / N(T)
         */
        const materialType = materialTypeByRawMaterial[rawMaterial];
        const materialTypeRatio = materialTypesRatios[materialType];
        rawMaterialsRatiosBySpectralType[spectralType][rawMaterial] = 100 * materialTypeRatio / rawMaterialsCountByMaterialType[materialType];
    });
}

const minRatioBarWidth = 2; /* percent width, should match "default minimum" from CSS */

function updateRatios() {
    const areaBySpectralType = {}; // e.g. C-types 50 km2 + CM-types 300 km2 => {'c': 50, 'cm': 300}
    const areaRatioBySpectralType = {};

    const areaByRawMaterial = {};
    const areaRatioByRawMaterial = {};

    // determine the area (in km2) for each spectral-type, from among all spectral-types
    // (also determine the maximum area from among all spectral-types)
    let maxSpectralTypeArea = 0;
    document.querySelectorAll(".ratios-spectral-types ul li").forEach(el => {
        const spectralType = el.dataset.value;
        const spectralTypeArea = parseInt(el.querySelector(".area input[type='text']").value);
        areaBySpectralType[spectralType] = spectralTypeArea;
        maxSpectralTypeArea = Math.max(maxSpectralTypeArea, spectralTypeArea);
    });

    // determine the ratio % of area for each spectral-type,
    // relative to the maximum area from among all spectral-types
    for (const spectralType in areaBySpectralType) {
        const spectralTypeArea = areaBySpectralType[spectralType];
        areaRatioBySpectralType[spectralType] = 100 * spectralTypeArea / maxSpectralTypeArea;
    }

    // determine the "virtual area" (in km2) for each raw-material,
    // from among all raw-materials contained in the spectral-types from "areaBySpectralType"
    // (also determine the maximum "virtual area" from among all raw-materials)
    let maxRawMaterialArea = 0;
    for (const spectralType in areaBySpectralType) {
        const spectralTypeArea = areaBySpectralType[spectralType];
        const rawMaterialsRatios = rawMaterialsRatiosBySpectralType[spectralType];
        for (const rawMaterial in rawMaterialsRatios) {
            const rawMaterialRatio = rawMaterialsRatios[rawMaterial];
            const rawMaterialArea = spectralTypeArea * rawMaterialRatio / 100;
            if (!areaByRawMaterial[rawMaterial]) {
                areaByRawMaterial[rawMaterial] = 0;
            }
            areaByRawMaterial[rawMaterial] += rawMaterialArea;
            maxRawMaterialArea = Math.max(maxRawMaterialArea, rawMaterialArea);
        }
    }

    // determine the ratio % of "virtual area" for each raw-material,
    // relative to the maximum "virtual area" from among all raw-materials
    for (const rawMaterial in areaByRawMaterial) {
        const rawMaterialArea = areaByRawMaterial[rawMaterial];
        areaRatioByRawMaterial[rawMaterial] = 100 * rawMaterialArea / maxRawMaterialArea;
    }

    // update HTML for spectral-types ratios
    document.querySelectorAll(".ratios-spectral-types ul li").forEach(el => {
        const spectralType = el.dataset.value;
        const baseSpectrals = el.querySelector(".base-spectrals");
        baseSpectrals.classList.remove('narrow', 'narrower', 'narrowest');
        if (!areaRatioBySpectralType[spectralType]) {
            // reset HTML
            el.classList.remove('active');
            baseSpectrals.style.width = '';
            return;
        }
        el.classList.add('active');
        const barWidthPercent = Math.max(minRatioBarWidth, areaRatioBySpectralType[spectralType]);
        baseSpectrals.style.width = `${barWidthPercent}%`;
        if (barWidthPercent <= 25) {
            baseSpectrals.classList.add('narrowest');
        } else if (barWidthPercent <= 50) {
            baseSpectrals.classList.add('narrower');
        } else if (barWidthPercent <= 75) {
            baseSpectrals.classList.add('narrow');
        }
    });

    // update HTML for raw-materials ratios
    document.querySelectorAll(".ratios-raw-materials ul li").forEach(el => {
        const rawMaterial = el.dataset.value;
        if (!areaRatioByRawMaterial[rawMaterial]) {
            // reset HTML
            el.classList.remove('active');
            el.querySelector(".area").textContent = '0';
            el.querySelector(".ratio-bar").style.width = '';
            return;
        }
        el.classList.add('active');
        // el.querySelector(".area").textContent = parseInt(areaByRawMaterial[rawMaterial]);
        el.querySelector(".area").textContent = Math.round(areaByRawMaterial[rawMaterial]);
        // el.querySelector(".area").textContent = (areaByRawMaterial[rawMaterial]).toFixed(2);
        const barWidthPercent = Math.max(minRatioBarWidth, areaRatioByRawMaterial[rawMaterial]);
        el.querySelector(".ratio-bar").style.width = `${barWidthPercent}%`;
    });
}

// source: https://gist.github.com/Machy8/1b0e3cd6c61f140a6b520269acdd645f
function on(eventType, selector, callback) {
    document.body.addEventListener(eventType, event => {
        if (event.target.matches(selector)) {
            callback(event.target);
        }
    });
}

// update ratios whenever an input-value changes
on('change', ".ratios-spectral-types ul li .area input[type='text']", el => {
    const intValue = parseInt(el.value);
    el.value = isNaN(intValue) || intValue < 0 ? 0 : intValue;
    updateRatios();
});

// update ratios on page-load, based on input-values hardcoded in the HTML
updateRatios();

//// TO DO: MINIMUM NON-ZERO surface area per spectral-type = 13 km2 (i.e. smallest asteroid)

//// TO DO: FIX BUG re: ratios-bars length identical for different values
////        TEST w/ C-types 100 km2, I-types 200 km2
