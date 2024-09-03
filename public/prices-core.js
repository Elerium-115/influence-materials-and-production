// Prices snapshot @ 2024-09-04
const pricesDefault = {
    "Acetylene": 0.0245,
    "Acrylonitrile": 0.15838,
    "Alumina": 3,
    "Alumina Ceramic": 2.5,
    "Aluminium": 3.95,
    "Aluminium Beam": 5,
    "Aluminium Hull Plate": 2749,
    "Aluminium Pipe": 4.9,
    "Aluminium Sheet": 4.5,
    "Aluminium Truss": 9999,
    "Ammonia": 0.098,
    "Ammonium Carbonate": 0.099,
    "Ammonium Chloride": 0.89,
    "Ammonium Diuranate": 0.096407,
    "Ammonium Oxalate": 0.054099,
    "Ammonium Paratungstate": 0.62352,
    "Apatite": 0.0003,
    "Attitude Control Module": 16000,
    "Austenitic Nichrome": 12,
    "Avionics Module": 3200,
    "Ball Bearing": 0.45,
    "Ball Valve": 5,
    "Bare Circuit Board": 95.30759951749096,
    "Bare Copper Wire": 0.48,
    "Beryllia": 21.0335,
    "Beryllia Ceramic": 8.2,
    "Beryllium Carbonate": 4.883592819653332,
    "Bioreactor": 205600,
    "Bisphenol A": 0.15,
    "Bitumen": 0.0015,
    "Borax": 0.45,
    "Boria": 1.30935,
    "Boric Acid": 0.49,
    "Boron": 1.89,
    "Borosilicate Glass": 3.69,
    "Brushless Motor": 16,
    "Brushless Motor Rotor": 5.84545,
    "Brushless Motor Stator": 6.39223,
    "CCD": 1800,
    "Calcite": 0.0008,
    "Calcium": 0.049,
    "Calcium Chloride": 0.139,
    "Carbon Dioxide": 0.00009,
    "Carbon Fiber": 0.42,
    "Carbon Monoxide": 0.000001,
    "Cargo Module": 19999.99,
    "Cargo Ring": 39999,
    "Cement": 0.00039,
    "Chlorine": 0.05238663484486873,
    "Chromia": 0.845861,
    "Chromium": 6,
    "Circuit Board": 109,
    "Closed-cycle Gas Core Nuclear Reactor Engine": 299999,
    "Coffinite": 0.022949,
    "Cold Gas Thruster": 15,
    "Cold Gas Torque Thruster": 15,
    "Composite-overwrapped Reactor Shell": 3166.3,
    "Computer": 749.41,
    "Computer Chip": 6000,
    "Control Moment Gyroscope": 687.23,
    "Copper": 0.15,
    "Copper Wire": 0.1669,
    "Core Drill": 39.99,
    "Core Drill Bit": 0.205829,
    "Core Drill Thruster": 44.7188,
    "Deionized Water": 0.0001,
    "Diepoxy Prepolymer Resin": 0.694767,
    "Diode": 8.5,
    "Engine Bell": 8738.095238095239,
    "Epichlorohydrin": 3,
    "Epoxy": 1.14,
    "Escape Module": 41900,
    "Extractor": 46584,
    "Factory": 388550,
    "Feldspar": 0.1448,
    "Ferrite": 0.29,
    "Ferrite-bead Inductor": 0.817122,
    "Ferrochromium": 0.35,
    "Ferromolybdenum": 0.3,
    "Ferrosilicon": 0.46003,
    "Fiber Optic Cable": 0.483,
    "Fiber Optic Gyroscope": 4.63926,
    "Fiberglass": 2.5,
    "Flow Divider Moderator": 95000,
    "Fluids Automation Module": 2439,
    "Fluorine": 9.99,
    "Food": 0.1569,
    "Fuel Make-up Tank": 28700,
    "Fused Quartz": 0.1857,
    "Fused Quartz Lightbulb Tube": 63.8284,
    "Gold": 18999,
    "Graphite": 0.144,
    "Habitat": 4728700,
    "Habitation Module": 9400,
    "Heat Exchanger": 33.6247,
    "Heavy Transport": 4553100,
    "Heavy Transport Hull": 2200000,
    "Highly Enriched Uranium Hexafluoride": 490.602,
    "Highly Enriched Uranium Powder": 1400,
    "Hydrochloric Acid": 0.069,
    "Hydrofluoric Acid": 5.96,
    "Hydrogen": 0.0079,
    "Hydrogen Heptafluorotantalate and Niobate": 4.01025,
    "Hydrogen Propellant": 0.054,
    "Iron": 1.5,
    "Iron Oxide": 0.224421,
    "Iron Sulfide": 0.082038,
    "Landing Auger": 52.5254,
    "Landing Leg": 131.001,
    "Large Thrust Bearing": 399,
    "Laser Diode": 51.469,
    "Leached Coffinite": 0.239956,
    "Leached Feldspar": 2,
    "Lead": 4.99,
    "Lead Sulfide": 0.820382,
    "LiPo Battery": 6.9,
    "Light Transport": 850622,
    "Light Transport Hull": 579999,
    "Lightbulb End Moderators": 1614.09,
    "Lithium": 0.25,
    "Lithium Carbonate": 0.02,
    "Lithium Chloride": 0.04591666666666666,
    "Lithium Sulfate": 0.015,
    "Magnesia": 0.5,
    "Magnesium": 0.85,
    "Magnesium Chloride": 0.022,
    "Marketplace": 2088900,
    "Merrillite": 0.091362,
    "Methane": 0.00225,
    "Mobility Module": 5000,
    "Molybdenum Disulfide": 1.31261,
    "Molybdenum Trioxide": 5,
    "Naphtha": 0.018,
    "Natural Flavorings": 5,
    "Nd:YAG Laser": 100,
    "Nd:YAG Laser Rod": 1.72803,
    "Neodymium": 2.35899,
    "Neodymium Magnet": 4,
    "Neodymium Oxide": 24,
    "Neodymium Trichloride": 1.23512,
    "Neon": 29.868561643835616,
    "Neon Make-up Tank": 15000,
    "Neon/Fuel Separator Centrifuge": 1136.91,
    "Nichrome": 4.5,
    "Nickel": 0.049,
    "Nickel Oxide": 2.07056,
    "Nitric Acid": 0.0375,
    "Nitrogen": 0.182292,
    "Novolak Prepolymer Resin": 0.88,
    "Nuclear Lightbulb": 7690,
    "Olivine": 0.057645,
    "Oxalic Acid": 0.041177,
    "Oxygen": 0.00015,
    "PEDOT": 14,
    "Parabolic Dish": 124.22,
    "Phosphate and Sulfate Salts": 0.199,
    "Phosphoric Acid": 0.099,
    "Photoresist Epoxy": 1,
    "Photovoltaic Panel": 6.75,
    "Platinum": 785,
    "Polyacrylonitrile": 0.195,
    "Polyacrylonitrile Fabric": 0.3,
    "Polymer Tantalum Capacitor": 90.69,
    "Polypropylene": 0.0095,
    "Potassium Carbonate": 0.09,
    "Potassium Chloride": 0.0275,
    "Potassium Fluoride": 25,
    "Potassium Heptafluorotantalate": 7.89183,
    "Potassium Hydroxide": 0.0769,
    "Potatoes": 0.2,
    "Power Module": 1241.2532933333332,
    "Pressure Vessel": 8329.86,
    "Propellant Tank": 14316.083333333334,
    "Propulsion Module": 329500,
    "Propylene": 0.03,
    "Pump": 79,
    "Pure Nitrogen": 0.0695,
    "Pyroxene": 0.091362,
    "Quicklime": 0.00089,
    "Radio Antenna": 129.032,
    "Rare Earth Oxides": 0.494812,
    "Rare Earth Sulfates": 0.115,
    "Raw Salts": 0.013,
    "Reactor Plumbing Assembly": 42522.5,
    "Refinery": 125970,
    "Rhabdite": 0.1,
    "Rhabdite Slag": 0.738593,
    "Roasted Rhabdite": 0.05,
    "Robotic Arm": 205.375,
    "Shipyard": 606490,
    "Shuttle": 440388,
    "Shuttle Hull": 269420,
    "Silica": 0.17,
    "Silica Powder": 0.1679,
    "Silicon": 2.8,
    "Silicon Wafer": 3.7,
    "Silver": 104,
    "Small Propellant Tank": 30,
    "Sodium Bicarbonate": 0.1,
    "Sodium Carbonate": 0.099,
    "Sodium Chloride": 0.0067,
    "Sodium Chromate": 0.165878,
    "Sodium Dichromate": 0.471448,
    "Sodium Hydroxide": 0.0275,
    "Sodium Tungstate": 0.54862,
    "Soil": 0.00895,
    "Solder": 5.9,
    "Solids Automation Module": 2749,
    "Soybeans": 0.277067,
    "Spaceport": 1500600,
    "Spirulina and Chlorella Algae": 0.475,
    "Stainless Steel": 0.3,
    "Stainless Steel Pipe": 0.45,
    "Stainless Steel Sheet": 0.425,
    "Star Tracker": 66.1927,
    "Steel": 0.15,
    "Steel Beam": 0.119,
    "Steel Cable": 0.12,
    "Steel Pipe": 0.1275,
    "Steel Sheet": 0.115,
    "Steel Truss": 180,
    "Steel Wire": 0.059228,
    "Sulfur": 0.156757,
    "Sulfur Dioxide": 0.224755,
    "Sulfuric Acid": 0.17,
    "Surface Mount Device Reel": 550,
    "Taenite": 0.072571,
    "Tank Farm": 101660,
    "Tantalum": 59.9,
    "Terrain Interface Module": 4950,
    "Thermal Module": 1110,
    "Thin-film Resistor": 5,
    "Tin": 3.95,
    "Tin Sulfide": 3.9,
    "Triple Superphosphate": 0.038,
    "Troilite": 0.091362,
    "Tungsten": 3.2,
    "Tungsten Powder": 3.5,
    "Turbopump": 13000,
    "Unenriched Uranium Hexafluoride": 2.45822,
    "Uraninite": 0.1,
    "Uranium Dioxide": 0.112075,
    "Uranium Tetrafluoride": 0.98,
    "Uranyl Nitrate": 0.071403,
    "Warehouse": 64806,
    "Water": 0.0004,
    "Weathered Olivine": 0.02,
    "Xenotime": 0.022949,
    "Yellowcake": 0.3,
    "Yttria": 20,
    "Zinc": 1.9,
    "Zinc Oxide": 0.55
};

/**
 * Use this to quickly disable API prices (i.e. use only
 * the current prices from local-storage / default prices),
 * in case of issues with the source of real-time prices.
 */
const isDisabledApiPrices = false;

/**
 * Object containing the price of each product, with format:
 * - `{"Acetylene": 0.008972, "Acrylonitrile": 0.15838, ...}`
 * 
 * Pre-load from local-storage (if set), otherwise default to "pricesDefault".
 * Then periodically update with API calls, via "refreshPrices".
 * 
 * Whenever this is changed, it should trigger all handlers
 * from "pricesChangedHandlers", via "handlePricesChanged".
 */
const prices = JSON.parse(localStorage.getItem('prices')) || {...pricesDefault};

/**
 * List of handler functions to be triggered, whenever "prices" is changed
 */
const pricesChangedHandlers = [
    () => savePrices(),
];

function savePrices() {
    localStorage.setItem('prices', JSON.stringify(prices));
    localStorage.setItem('pricesTimestamp', Date.now());
}

async function handlePricesChanged() {
    for (handler of pricesChangedHandlers) {
        await handler();
    }
}

// Update prices via API call
async function refreshPrices() {
    if (isDisabledApiPrices) {
        // Use the current prices from local-storage / default prices
        return;
    }
    // Do NOT update prices if recently updated (e.g. on previous page loads)
    const cacheExpiresInMilliseconds = HOUR_IN_MILLISECONDS;
    const pricesTimestamp = Number(localStorage.getItem('pricesTimestamp'));
    if (pricesTimestamp && Date.now() - pricesTimestamp < cacheExpiresInMilliseconds) {
        return;
    }
    const config = {
        method: 'get',
        url: `${apiUrl}/data/prices`,
    };
    try {
        const response = await axios(config);
        const rawData = response.data;
        // console.log(`--- rawData from API:`, rawData); //// TEST
        if (rawData.error) {
            // Abort re: error in data from API
            console.log(`--- ERROR in data from API:`, rawData.error); //// TEST
            return;
        }
        // Sanity check
        if (!rawData['Hydrogen']) {
            // Abort re: failed sanity check
            console.log(`--- FAILED sanity check re: rawData['Hydrogen']`); //// TEST
            return;
        }
        // Update prices only for products which have a dynamic price (i.e. already being traded)
        for (const [productName, price] of Object.entries(rawData)) {
            if (!prices[productName]) {
                // All products should already exist in "prices", from the default prices
                console.log(`--- UNEXPECTED API product "${productName}", API price: ${price}`); //// TEST
            }
            prices[productName] = price;
        }
        await handlePricesChanged();
    } catch (error) {
        // Abort re: error from API
        console.log(`--- ERROR from API:`, error); //// TEST
        return;
    }
}

// Refresh prices on page-load
refreshPrices();

/**
 * Relatively frequent checks to determine if the prices need to be updated,
 * but the actual frequency of API calls may be slower,
 * as defined in "refreshPrices" > "cacheExpiresInMilliseconds".
 */
setInterval(refreshPrices, HOUR_IN_MILLISECONDS);
