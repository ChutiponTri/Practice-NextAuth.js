import mongoose from "mongoose";

export async function connectMongo() {
  try {
    const DBAddress = process.env.DB_ADDRESS;
    if (!DBAddress) return;
    await mongoose.connect(DBAddress);
    console.log("DB Connected Success");
  } catch(error) {
    console.log("Error connect to mongo", error);
  }
}