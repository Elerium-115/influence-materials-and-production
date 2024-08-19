import mongoose from 'mongoose';

const plannedProductSchema = new mongoose.Schema({
    planned_product_name: String,
    production_plan_id: String,
});

const asteroidSchema = new mongoose.Schema({
    asteroid_area: Number,
    asteroid_name: String,
    asteroid_type: String,
    planned_products: [plannedProductSchema],
});

const asteroidsPlanRecordSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    asteroids_plan: [asteroidSchema],
});

asteroidsPlanRecordSchema.statics.findOneByAddress = function(address) {
    return this.findOne({address: new RegExp(address, 'i')}); // Case-insensitive search
};

export default mongoose.model('AsteroidsPlanRecord', asteroidsPlanRecordSchema);
