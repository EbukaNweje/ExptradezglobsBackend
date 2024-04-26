const msgModel = require("../models/msgModel")
const historyModel = require("../models/historyModel")
const userModel = require("../models/User")
const depositModel = require("../models/depositModel")
// const currencyapi = require('@everapi/currencyapi-js');
require("dotenv").config()
const axios = require('axios');

// Deposit function
exports.deposit = async (req, res) => {
    try {
        // Get the depositor's id
        const { userId } = req.params;

        // Find the depositor
        const depositor = await userModel.findById(userId);

        // Get the details for transaction
        const { amount, coin } = req.body;
        const newAmount = Number(amount);

        // Check if the amount is within the allowed range
        if (newAmount <= 0 || newAmount > 9999999 || newAmount === NaN) {
            return res.status(400).json({
                message: 'You can only deposit between 0 and 9,999,999'
            });
        }

        if (coin != "BTC" && coin != "ETH") {
            return res.status(404).json({
                message: `Coin not available`
            });
        }

        // Perform the currency conversion
        let response;
        let roundedNumber;

        if (coin == "BTC") {
            response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=5`);
            const conversionRates = response.data.bitcoin.usd;
            const myTotal = Number(conversionRates);
            const btcAmount = newAmount / myTotal;
            roundedNumber = btcAmount.toFixed(9);
        } else if (coin == "ETH") {
            response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&precision=5`);
            const conversionRates = response.data.ethereum.usd;
            const myTotal = Number(conversionRates);
            const btcAmount = newAmount / myTotal;
            roundedNumber = btcAmount.toFixed(9);
        }

        // Save the deposit details
        const deposit = new depositModel({
            user: depositor._id,
            amount: `${newAmount}`,
            coin: coin,
            total: roundedNumber,
            status: 'pending',
            transactionType: depositor.transactionType
        });
        await deposit.save();


        if(deposit.status === 'pending'){
            return res.status(200).json({
                message: `Deposit made and pending`
            })
        }
        if(deposit.status === 'confirmed'){
        // Add the deposited amount to the user's account balance
        depositor.accountBalance += newAmount;
        }

        // Save the transfer id to the user
        depositor.Transactions.push(deposit._id);
        await depositor.save();

        // Create a transaction history for the depositor and save
        const History = new historyModel({
            userId: depositor._id,
            transactionType: deposit.transactionType,
            amount: `${newAmount}`,
        });
        await History.save();

        // Create a notification message for the depositor and save
        if (deposit) {
            const msg = `Hi ${depositor.fullName}, you just deposited ${newAmount} to your balance in ${coin}`;
            const message = new msgModel({
                userId: depositor._id,
                msg
            });
            await message.save();
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};