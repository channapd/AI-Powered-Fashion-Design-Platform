import userModel from "../models/userModel.js";
import designModel from "../models/designModel.js"
import bcrypt from "bcryptjs";


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
                email: user.email,
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

      const designs = await designModel.find({ user: user._id }).sort({"createdAt": -1});
      //console.log(designs);
      return res.json({success: true, designs: designs});
  
    } catch (error) {
      return res.json({success: false, message: error.message});
    }
}

export const editUserData = async (req, res) => {
    const {userId, name, password} = req.body;

    try {
        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success:false, message: "User does not exist"});
        }

        if(name){
            user.name = name;
        }

        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        return res.json({success: true, message: "Updated Details Successfully"});
        
    } catch (error) {
        return res.json({success: false, message:error.message});
    }
}