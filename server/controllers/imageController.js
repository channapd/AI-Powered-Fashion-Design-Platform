import userModel from "../models/userModel.js";
import FormData from 'form-data';
import axios from 'axios'
import designModel from "../models/designModel.js";
import { GoogleGenAI } from "@google/genai";
import { GetColorName } from 'hex-color-to-color-name';


export const refineText = async (prompt) => {
  const gemini_api_key = process.env.GEMINI_API;
  const ai = new GoogleGenAI({ apiKey: gemini_api_key });
  
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text;
}

export const generateImage = async (req, res) => {
    try {
        
      const {userId, designName, designSpecs} = req.body;

      const user = await userModel.findById(userId);

      if(!user){
          return res.json({success: false, message: "User does not exist"});
      }

      if(!designSpecs){
          return res.json({success: false, message: "Design details not entered"});
      }

      if(user.creditBalance === 0 || userModel.creditBalance < 0){
          return res.json({success: false, message: "No Credit Balance", creditBalance: user.creditBalance});
      }

      const { category, material, pattern, neckline, sleeves, fit, color } = designSpecs;

      const colorName = GetColorName(color);

      console.log("Color name: ", colorName);

      
      const isDetailed = category === 'Gowns' || category === 'Tops';

      const prompt = `Generate a women's ${category} with a ${fit} fit, ${material} material, ${pattern} pattern${isDetailed ? `, ${neckline} neckline, ${sleeves} sleeves` : ''}, ${colorName} color. Do not include any other text in the image.`;
                  
      const desc = `A women's ${category} with a ${fit} fit, ${material} material, ${pattern} pattern${isDetailed ? `, ${neckline} neckline, ${sleeves} sleeves` : ''}, ${colorName} color.`;

      const formData = new FormData();
      formData.append('prompt', prompt);

      const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
        },
        responseType: 'arraybuffer'
      });

      const base64Image = Buffer.from(data, 'binary').toString('base64');
      const resultImage = `data:image/png;base64,${base64Image}`

      await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1});

      const instruction2 = `Rephrase the following text into a clear and effective description in not more than 4-5 lines.'${desc}'`;
      const refinedDesc = await refineText(instruction2);

      await designModel.create({
        user: user._id,
        designName,
        desc: refinedDesc,
        image: {
          data: resultImage,  
          contentType: 'image/png',
        },
      });

      return res.json({success: true, message: "Image Generated", creditBalance: user.creditBalance - 1, resultImage});

    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}

export const deleteImage = async (req, res) => {
  const {userId, designId} = req.body;
  try {
    const user = await userModel.findById(userId);

    if(!user){
      return res.json({success: false, message: "User does not exist"});
    }

    if(!designId){
      return res.json({success:false, message: "Design does not exist"});
    }

    await designModel.findByIdAndDelete(designId);

    return res.json({success: true, message: "Design Deleted Successfully"});

  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}

