import dotenv from "dotenv";
dotenv.config();
import { NewsLetter } from "../models/newsLetter.js";
import SibApiV3Sdk from "sib-api-v3-sdk";


// Setup Brevo API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

// Create contact API instance
const apiInstance = new SibApiV3Sdk.ContactsApi();

export const handleNewsLetter=async(req,res)=>{
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const createContact = {
    email,
    listIds: [5],
    updateEnabled: true,
  };
//check email exsting or not 
  try {
    const exstingEmail = await NewsLetter.findOne({ email });
    if (exstingEmail) {
      return res
        .status(409)
        .json({ success: false, message: "Email already subscribed" });
    }
    await apiInstance.createContact(createContact);
 await NewsLetter.create({ email });
    res
      .status(200)
      .json({ success: true, message: "Email added to newsletter" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Email already subscribed" });
    }
    console.error("Brevo API error:", error.response?.body || error.message);
    res.status(500).json({ success: false, message: "Failed to add email" });
  }

}