const User = require("../models/User")

exports.getoneUser = async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const UserData = await User.findById(userId)
        if(UserData.accountBalance > 0){
            let newDay = UserData.newDay
            const setter = setInterval(() => {
              newDay--;
               UserData.newDay = newDay;
               UserData.save();
               console.log(UserData.newDay);
            },8.64e+7)
    
            if(UserData.newDay <= 0){
              clearInterval(setter);
            }else{
              setter
            }
          }
        
        res.status(201).json({
            message: "User Data",
            data: UserData
        })

    }catch(err){
        next(err)
    }
}

exports.allUserData = async (req, res, next) =>{
    try {
        const UserDatas = await User.find()
        
        res.status(201).json({
            message: "All User Data",
            maxnumber: UserDatas.length,
            data: UserDatas
        })

    }catch(err){
        next(err)
    }
}

exports.deleteoneUser = async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const UserDatadelete = await User.findByIdAndDelete(userId)
        
        res.status(200).json({
            message: "User Data have been deleted",
            data: UserDatadelete
        })

    }catch(err){
        next(err)
    }
}

exports.updateoneUser = async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const UserDataupdate= await User.findByIdAndUpdate(userId,req.body,{
            new: true
        })
        
        res.status(201).json({
            message: "User Data have been Updated",
            data: UserDataupdate
        })

    }catch(err){
        next(err)
    }
}


exports.updateLastDepo = async (req,res, next) => {
    try{
        const id = req.params.id
        const {lastDeposit} = req.body
      if(!lastDeposit){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const lastDepo = await User.findByIdAndUpdate(id,{lastDeposit:lastDeposit},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:lastDepo
     })
      }
    }catch(e){
       next(e)
    }
}
exports.updateRef = async (req,res, next) => {
    try{
        const id = req.params.id
        const {ref} = req.body
      if(!ref){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const refs = await User.findByIdAndUpdate(id,{ref:ref},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:refs
     })
      }
    }catch(e){
       next(e)
    }
}
exports.updateLastWithdrawal = async (req,res, next) => {
    try{
        const id = req.params.id
        const {lastWithdrawal} = req.body
      if(!lastWithdrawal){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const lastDepo = await User.findByIdAndUpdate(id,{lastWithdrawal:lastWithdrawal},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:lastDepo
     })
      }
    }catch(e){
       next(e)
    }
}

exports.updateDepositWalletBalance = async (req,res, next) => {
    try{
        const id = req.params.id
        const {depositWalletbalance} = req.body
      if(!depositWalletbalance){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const totalDepo = await User.findByIdAndUpdate(id,{depositWalletbalance:depositWalletbalance},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:totalDepo
     })
      }
    }catch(e){
       next(e)
    }
}

exports.updateInterestWalletbalance = async (req,res, next) => {
    try{
        const id = req.params.id
        const {interestWalletbalance} = req.body
      if(!interestWalletbalance){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const totalDepo = await User.findByIdAndUpdate(id,{interestWalletbalance:interestWalletbalance},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:totalDepo
     })
      }
    }catch(e){
       next(e)
    }
}

exports.updateAccountBalance = async (req,res, next) => {
    try{
        const id = req.params.id
        const {currentBalance} = req.body
      if(!currentBalance){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const totalDepo = await User.findByIdAndUpdate(id,{currentBalance:currentBalance},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:totalDepo
     })
      }
    }catch(e){
       next(e)
    }
}

exports.updateTotalDeposit = async (req,res, next) => {
    try{
        const id = req.params.id
        const {totalDeposit} = req.body
      if(!totalDeposit){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const totalDepo = await User.findByIdAndUpdate(id,{totalDeposit:totalDeposit},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:totalDepo
     })
      }
    }catch(e){
       next(e)
    }
}

exports.updateTotalInvest = async (req,res, next) => {
    try{
        const id = req.params.id
        const {totalInvest} = req.body
      if(!totalInvest){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const totalDepo = await User.findByIdAndUpdate(id,{totalInvest:totalInvest},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:totalDepo
     })
      }
    }catch(e){
       next(e)
    }
}

exports.updateTotalWithdraw = async (req,res, next) => {
    try{
        const id = req.params.id
        const {totalWithdraw} = req.body
      if(!totalWithdraw){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const totalDepo = await User.findByIdAndUpdate(id,{totalWithdraw:totalWithdraw},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:totalDepo
     })
      }
    }catch(e){
       next(e)
    }
}

exports.updateStartUpDeposit = async (req,res, next) => {
    try{
        const id = req.params.id
        const {startUpDeposit} = req.body
      if(!startUpDeposit){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const totalDepo = await User.findByIdAndUpdate(id,{startUpDeposit:startUpDeposit},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:totalDepo
     })
      }
    }catch(e){
       next(e)
    }
}
exports.updateTotalEarned = async (req,res, next) => {
    try{
        const id = req.params.id
        const {totalEarned} = req.body
      if(!totalEarned){
        res.status(400).json({
            message: "wrong input"
        })
      }else{
        const totalDepo = await User.findByIdAndUpdate(id,{totalEarned:totalEarned},{
            new: true
        })
        res.status(201).json({
        message:"Updated successfully",
        data:totalDepo
     })
      }
    }catch(e){
       next(e)
    }
}





exports.getUserDeposits = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('Transactions.deposits');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const deposits = user.Transactions.deposits;
        if (!deposits || deposits.length === 0) {
            return res.status(404).json({ message: 'No deposit transactions found for this user' });
        }
        res.status(200).json({ data: deposits });
    } catch (error) {
        console.error('Error fetching deposits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserInvestments = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('Transactions.investments');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const investments = user.Transactions.investments;
        if (!investments || investments.length === 0) {
            return res.status(404).json({ message: 'No investment transactions found for this user' });
        }
        res.status(200).json({ data: investments });
    } catch (error) {
        console.error('Error fetching investments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserInterests = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('Transactions.interests');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const interests = user.Transactions.interests;
        if (!interests || interests.length === 0) {
            return res.status(404).json({ message: 'No interest transactions found for this user' });
        }
        res.status(200).json({ data: interests });
    } catch (error) {
        console.error('Error fetching interests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserWithdrawals = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('Transactions.withdrawals');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const withdrawals = user.Transactions.withdrawals;
        if (!withdrawals || withdrawals.length === 0) {
            return res.status(404).json({ message: 'No withdrawal transactions found for this user' });
        }
        res.status(200).json({ data: withdrawals });
    } catch (error) {
        console.error('Error fetching withdrawals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




exports.getAllTransactions = async (req, res) => {
  try {
    // Fetch user by ID from request or however you're identifying the user
    const id = req.params.id; 

    // Fetch user with populated transactions
    const user = await User.findById(id)
      .populate('Transactions.deposits Transactions.withdrawals Transactions.investments Transactions.interests')
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract transactions from user object and simplify them
    const transactions = [];
    user.Transactions.deposits.forEach(deposit => {
      transactions.push({
        transactionType: 'Deposit',
        date: deposit.depositDate,
        amount: deposit.amount,
        status: deposit.status
      });
    });
    user.Transactions.withdrawals.forEach(withdrawal => {
      transactions.push({
        transactionType: 'Withdrawal',
        date: withdrawal.withdrawDate,
        amount: withdrawal.amount,
        status: withdrawal.status

      });
    });
    user.Transactions.investments.forEach(investment => {
      transactions.push({
        transactionType: 'Investment',
        date: investment.Date,
        amount: investment.amount,
        status: "confirmed"

      });
    });
    user.Transactions.interests.forEach(interest => {
      transactions.push({
        transactionType: 'Interest',
        date: interest.Date,
        amount: interest.amount,
        status: "confirmed"

      });
    });

    // Sort transactions by date
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Return the simplified transactions array
    return res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};



// controllers/userController.js

// const User = require('../models/User');

exports.getAllUserInvestmentPlans = async (req, res) => {
  try {
    // Fetch user by ID from request or however you're identifying the user
    const id = req.params.id; // Assuming user ID is available in request

    // Find the user and populate the investment plans
    const user = await User.findById(id).populate('investmentPlan').exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract investment plans from user object
    const investmentPlans = user.investmentPlan;

    // Return the investment plans associated with the user
    return res.status(200).json(investmentPlans);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};
