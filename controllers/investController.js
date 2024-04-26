// const UserModel = require('../models/User');
// const InvestModel = require('../models/invest');
// const plansModel = require('../models/plansModel');





// // Function to add 0.4% of the money invested after every 24 hours
// const addInterest = async (userId, planId, amount) => {
//     // Assuming you have a function to get the user's account balance
//     const user = await UserModel.findById(userId);

//     const plan = await plansModel.findById(planId);

//     // Calculate interest
//     const interest = amount * plan.percentageInterest; // 0.4% of the amount

//     // Add interest to the user's account balance
//     user.acctBalance += interest;
//     await user.save();

//     // Log the interest transaction
//     const interestTransaction = new depositModel({
//         user: userId,
//         amount: interest,
//         total: user.acctBalance
//     });
//     await interestTransaction.save();

//     // Log the interest transaction in history
//     const interestHistory = new historyModel({
//         userId,
//         transactionType: 'Interest',
//         amount: interest
//     });
//     await interestHistory.save();

//     // Log a notification message for the user
//     const notificationMessage = `Hi ${user.userName}, you earned ${interest} interest on your ${coin} deposit.`;
//     const message = new msgModel({
//         userId,
//         msg: notificationMessage
//     });
//     await message.save();
// };



// exports.makeInvestment = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { planId, amount } = req.body;

//         // Find the user and check if they have enough balance
//         const user = await UserModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         if (user.accountBalance < amount) {
//             return res.status(400).json({ message: 'Insufficient balance' });
//         }

//         // Deduct the amount from the user's balance
//         user.accountBalance -= amount;
//         await user.save();

//         // Create the investment record
//         const investment = new InvestModel({
//             plan: planId,
//             amount: amount,
//             transactionType: user.transactionType
//         });
//         await investment.save();

//         // Update the user's total investment
//         user.totalInvestment += amount;
//         await user.save();

//         user.investmentPlan.push(investment._id)

//          // Save the transfer id to the user
//          user.Transactions.push(investment._id);
//          await user.save();
 
//          // Create a transaction history for the user and save
//          const History = new historyModel({
//              userId: user._id,
//              transactionType: investment.transactionType,
//              amount: `${amount}`,
//          });
//          await History.save();
 
//          // Create a notification message for the user and save
//          if (investment) {
//              const msg = `Hi ${user.fullName}, you just invested ${amount}.`;
//              const message = new msgModel({
//                  userId: user._id,
//                  msg
//              });
//              await message.save();
//          }
//           // Call the function to add interest after 24 hours
//             setInterval(() => {
//                 addInterest(userId, newAmount, planId);
//             },24 * 60 * 60  * 1000);


//         res.status(200).json({ message: 'Investment successful', data: investment });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



const UserModel = require('../models/User');
const InvestModel = require('../models/investModel');
const PlansModel = require('../models/plansModel');
const { addDays } = require('date-fns');

// Function to add 0.4% of the money invested after every 24 hours
const addInterest = async (userId, planId, amount) => {
    try {
        const user = await UserModel.findById(userId);
        const plan = await PlansModel.findById(planId);
        if (!user || !plan) {
            throw new Error('User or plan not found');
        }

        const interest = amount * (plan.percentageInterest / 100); // Calculate interest

        user.accountBalance += interest; // Add interest to the user's account balance
        await user.save();

        user.totalProfit += interest; // Add interest to the user's account balance
        await user.save();

        // Log the interest transaction
        const interestTransaction = new InvestModel({
            user: userId,
            amount: interest,
            transactionType: 'Interest'
        });
        await interestTransaction.save();

        // Log the interest transaction in history
        const history = new HistoryModel({
            userId,
            transactionType: 'Interest',
            amount: interest
        });
        await history.save();

        // Log a notification message for the user
        const notificationMessage = `Hi ${user.fullName}, you earned ${interest} interest on your ${plan.planName} investment.`;
        const message = new MsgModel({
            userId,
            msg: notificationMessage
        });
        await message.save();
    } catch (error) {
        console.error('Error adding interest:', error);
    }
};

exports.makeInvestment = async (req, res) => {
    try {
        const { userId } = req.params;
        const { planId, amount } = req.body;

        const user = await UserModel.findById(userId);
        const plan = await PlansModel.findById(planId);
        if (!user || !plan) {
            return res.status(404).json({ message: 'User or plan not found' });
        }

        if (user.accountBalance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        if (amount < plan.minimumDeposit || amount > plan.maximumDeposit) {
            return res.status(400).json({ message: `Amount must be between ${plan.minimumDeposit} and ${plan.maximumDeposit}` });
        }

        // Deduct the amount from the user's balance
        user.accountBalance -= amount;
        await user.save();

        // Create the investment record
        const investment = new InvestModel({
            user: userId,
            plan: planId,
            amount: amount
        });
        await investment.save();

        // Update the user's total investment
        user.totalInvestment += amount;
        await user.save();

      // Schedule interest calculation based on the plan's duration
const expirationDate = addDays(new Date(), plan.durationDays);
const timeUntilExpiration = expirationDate - Date.now();
const interval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Calculate the initial delay until the next 24-hour interval
const initialDelay = timeUntilExpiration % interval;

// Add interest immediately
addInterest(userId, planId, amount);

// Schedule interest calculation every 24 hours until the expiration date
setInterval(() => {
    addInterest(userId, planId, amount);
}, interval);


        res.status(200).json({ message: 'Investment successful', data: investment });
    } catch (error) {
        console.error('Error making investment:', error);
        res.status(500).json({ error: error.message });
    }
};