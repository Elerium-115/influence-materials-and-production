const mongoose = require('mongoose');
const AsteroidsPlanRecord = require('./asteroids-plan-record-schema');
const ProductionPlanRecord = require('./production-plan-schema');
const utils = require('../../utils/utils');

/*
NOTE:
Configure a different DB in env, for dev vs. prod:
- dev => db_influence_dev
- prod => db_influence
*/

/*
NOTE:
The schema is only validated automatically when using "create()" or "save()".
It is NOT validated automatically when using e.g. "findByIdAndUpdate()".
For manual validation, use the following syntax:
    try {
        await record.validate();
        console.log(`--- validation OK`);
    } catch (error) {
        console.log(`--- validation ERROR: ${error.message}`);
        return;
    }
*/

function getProductionPlanIdsFromAsteroidsPlan(asteroidsPlan) {
    const productionPlanIds = [];
    asteroidsPlan.forEach(asteroidData => {
        asteroidData.planned_products.forEach(plannedProductData => {
            if (plannedProductData.production_plan_id !== null) {
                productionPlanIds.push(plannedProductData.production_plan_id);
            }
        });
    });
    return productionPlanIds;
}

/**
 * Delete from the DB any orphan production plans that existed in the old asteroids plan,
 * but no longer exist in the new asteroids plan that is being requested to be saved.
 * This occurs e.g. when deleting a non-null production plan in the client; or when
 * deleting an asteroids plan in the client, if it contained non-null production plans.
 */
async function deleteOrphanProductionPlans(oldAsteroidsPlan, newAsteroidsPlan) {
    const oldProductionPlanIds = getProductionPlanIdsFromAsteroidsPlan(oldAsteroidsPlan);
    const newProductionPlanIds = getProductionPlanIdsFromAsteroidsPlan(newAsteroidsPlan);
    const orphanProductionPlanIds = oldProductionPlanIds.filter(id => !newProductionPlanIds.includes(id));
    // console.log(`--- DELETE orphan produciton plan IDs:`, orphanProductionPlanIds);
    if (!orphanProductionPlanIds.length) {
        return;
    }
    try {
        await ProductionPlanRecord.deleteMany({_id: { $in: orphanProductionPlanIds}});
        // Result format: {acknowledged: true, deletedCount: 2}
    } catch (error) {
        // Forward the DB error to the caller of this function
        throw error;
    }
}

async function fetchAsteroidsPlan(address) {
    // console.log(`--- [fetchAsteroidsPlan] for address = ${address}`); //// TEST
    try {
        const record = await AsteroidsPlanRecord.findOneByAddress(address);
        if (!record) {
            // NO asteroids plan found for "address"
            // console.log(`--- [DB] NOT found any record for address`); //// TEST
            return [];
        }
        // console.log(`--- [DB] FOUND record:`, record); //// TEST
        // Remove "_id" property from the records inside "asteroids_plan", after converting it to a plain object
        const asteroidsPlan = JSON.parse(JSON.stringify(record.asteroids_plan));
        utils.removeProps(asteroidsPlan, ['_id']);
        return asteroidsPlan;
    } catch (error) {
        console.log(`--- [DB] ERROR: ${error.message}`); //// TEST
        return {error: error.message};
    }
}

/**
 * If there is no existing asteroids plan record for this address (lowercase) => insert a new record.
 * Otherwise => update the existing record.
 */
async function saveAsteroidsPlan(asteroidsPlan, address) {
    // console.log(`--- [saveAsteroidsPlan] for address = ${address}`); //// TEST
    let record = await AsteroidsPlanRecord.findOneByAddress(address);
    if (record) {
        // Found existing record for same "address"
        try {
            await deleteOrphanProductionPlans(record.asteroids_plan, asteroidsPlan);
        } catch (error) {
            console.log(`--- [DB] ERROR: ${error.message}`); //// TEST
            return {error: error.message};
        }
        // Prepare to update existing record for same "address"
        // console.log(`--- [saveAsteroidsPlan] UPDATE existing record`); //// TEST
        record.asteroids_plan = asteroidsPlan;
    } else {
        // Prepare to insert new record for "address"
        // console.log(`--- [saveAsteroidsPlan] INSERT new record`); //// TEST
        record = new AsteroidsPlanRecord({
            address,
            asteroids_plan: asteroidsPlan,
        });
    }
    try {
        // Save the prepared record, including auto-validation on pre-save
        const savedRecord = await record.save();
        // console.log(`--- [DB] SAVED record:`, savedRecord); //// TEST
        return savedRecord;
    } catch (error) {
        console.log(`--- [DB] ERROR: ${error.message}`); //// TEST
        return {error: error.message};
    }
}

async function fetchProductionPlan(productionPlanId) {
    // console.log(`--- [fetchProductionPlan] for productionPlanId = ${productionPlanId}`); //// TEST
    try {
        const record = await ProductionPlanRecord.findOneByProductionPlanId(productionPlanId);
        if (!record) {
            // NO production plan found for "productionPlanId"
            const errorMessage = `Record not found for production plan ID "${productionPlanId}"`;
            console.log(`--- [fetchProductionPlan] ERROR: ${errorMessage}`); //// TEST
            return {error: errorMessage};
        }
        // console.log(`--- [DB] FOUND record:`, record); //// TEST
        // Remove "_id" and "__v" properties from the record, after converting it to a plain object
        const productionPlan = JSON.parse(JSON.stringify(record));
        utils.removeProps(productionPlan, ['_id', '__v']);
        return productionPlan;
    } catch (error) {
        console.log(`--- [DB] ERROR: ${error.message}`); //// TEST
        return {error: error.message};
    }
}

async function saveProductionPlan(productionPlanData, productionPlanId = null) {
    // NOTE: A new production plan will have productionPlanId = 'null' (string)
    if (productionPlanId && productionPlanId !== 'null') {
        const record = await ProductionPlanRecord.findOneByProductionPlanId(productionPlanId);
        if (!record) {
            // NO production plan found for non-null "productionPlanId"
            const errorMessage = `Record not found for production plan ID "${productionPlanId}"`;
            console.log(`--- [saveProductionPlan] ERROR: ${errorMessage}`); //// TEST
            return {error: errorMessage};
        }
        // Remove "_id" and "__v" properties from the record, after converting it to a plain object
        const oldProductionPlanData = JSON.parse(JSON.stringify(record));
        utils.removeProps(oldProductionPlanData, ['_id', '__v']);
        try {
            // Update existing record for same "productionPlanId"
            // console.log(`--- [saveProductionPlan] UPDATE existing record`); //// TEST
            record.itemDataById = productionPlanData.itemDataById;
            // Auto-validation on pre-save
            const savedRecord = await record.save();
            // console.log(`--- [DB] SAVED (updated) record:`, savedRecord); //// TEST
            // Remove "_id" and "__v" properties from the record, after converting it to a plain object
            const savedProductionPlanData = JSON.parse(JSON.stringify(savedRecord));
            utils.removeProps(savedProductionPlanData, ['_id', '__v']);
            return savedProductionPlanData;
        } catch (error) {
            // Error updating the existing record
            console.log(`--- [DB] ERROR: ${error.message}`); //// TEST
            return {error: error.message};
        }
    } else {
        // New production plan
        // console.log(`--- [saveProductionPlan] INSERT new record`); //// TEST
        const record = new ProductionPlanRecord({
            itemDataById: productionPlanData.itemDataById,
            plannedProductName: productionPlanData.plannedProductName,
        });
        try {
            // Insert new record, including auto-validation on pre-save
            const insertedRecord = await record.save();
            // console.log(`--- [DB] SAVED (inserted) record:`, insertedRecord); //// TEST
            // Update the newly-inserted record's "productionPlanId", with the new mongoDB ID
            const insertedProductionPlanData = JSON.parse(JSON.stringify(insertedRecord));
            insertedRecord.productionPlanId = insertedProductionPlanData._id;
            try {
                // Auto-validation on pre-save
                const savedRecord = await insertedRecord.save();
                // console.log(`--- [DB] SAVED (updated) record:`, savedRecord); //// TEST
                // Remove "_id" and "__v" properties from the record, after converting it to a plain object
                const savedProductionPlanData = JSON.parse(JSON.stringify(savedRecord));
                utils.removeProps(savedProductionPlanData, ['_id', '__v']);
                return savedProductionPlanData;
            } catch (error) {
                // Error updating the newly-inserted record's "productionPlanId", with the new mongoDB ID
                console.log(`--- [DB] ERROR: ${error.message}`); //// TEST
                return {error: error.message};
            }
        } catch (error) {
            // Error inserting the new record
            console.log(`--- [DB] ERROR: ${error.message}`); //// TEST
            return {error: error.message};
        }
    }
}

module.exports = {
    fetchAsteroidsPlan,
    fetchProductionPlan,
    saveAsteroidsPlan,
    saveProductionPlan,
};
