const mongoose = require('mongoose');

const productionPlanRecordSchema = new mongoose.Schema({
    itemDataById: Object,
    plannedProductName: String,
    productionPlanId: String,
});

productionPlanRecordSchema.statics.findOneByProductionPlanId = function(productionPlanId) {
    return this.findOne({productionPlanId});
};

module.exports = mongoose.model("ProductionPlanRecord", productionPlanRecordSchema);
