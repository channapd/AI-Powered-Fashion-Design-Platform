import userModel from "../models/userModel.js";
import designModel from "../models/designModel.js"


export const getUserData = async (req, res) => {
    try{
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success: false, message: "User not found"})
        }

        return res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch(error){
        return res.json({success: false, message: error.message});
    }
    
}

export const userCredits = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        return res.json({success:true, credits: user.creditBalance, user: {name: user.name}});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export const retrieveDesigns = async (req, res) => {
    try {
      const {userId} = req.body;
  
      const user = await userModel.findById(userId);

      const designs = await designModel.find({ user: user._id });
      //console.log(designs);
      return res.json({success: true, designs: designs});
  
    } catch (error) {
      return res.json({success: false, message: error.message});
    }
}