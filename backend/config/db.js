import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // const conn = await mongoose.connect(
    //   "mongodb+srv://rajkumarpra341_db_user:rajkumar123@cluster0.lsrf8t7.mongodb.net/virtualAssistantdb"
    // );
    const conn = await mongoose.connect(
      process.env.MONGODB_URL
    );

    console.log("DB Connected");
  
  } catch (error) {
    console.log("FULL ERROR:", error);
  }
};

export default connectDb;