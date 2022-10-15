async function getNextProductionPlanId() {
    //// TO DO: fetch the latest production plan from MongoDB, and increment its ID
    //// ____
    return Date.now(); //// TEST
}

module.exports = {
    getNextProductionPlanId,
};
