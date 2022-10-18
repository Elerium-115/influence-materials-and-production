async function getNextProductionPlanId() {
    //// TO DO: check if latest production plan ID cached => increment that value + update it in cache
    //// -- if NOT cached => fetch the production plan from MongoDB with the highest ID (NOT necessarily the latest plan)
    //// ---- then increment that ID + update it in cache
    //// -- if NO plan in DB => initialize plan ID = 1 + update it in cache
    //// ____
    return Date.now(); //// TEST
}

module.exports = {
    getNextProductionPlanId,
};
