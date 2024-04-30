const mongoose = require('mongoose');

const userPlanSchema = new mongoose.Schema({
    plan:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'investmentPlan'
    },
    investment:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Invest'
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
  

}, {timestamps: true});

module.exports = userPlanModel = mongoose.model('userplan', userPlanSchema )

