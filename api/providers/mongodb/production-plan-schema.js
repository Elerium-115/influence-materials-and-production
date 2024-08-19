import mongoose from 'mongoose';

const productionPlanRecordSchema = new mongoose.Schema({
    itemDataById: Object,
    plannedProductName: String,
    productionPlanId: String,
});

productionPlanRecordSchema.statics.findOneByProductionPlanId = function(productionPlanId) {
    return this.findOne({productionPlanId});
};

export default mongoose.model('ProductionPlanRecord', productionPlanRecordSchema);
