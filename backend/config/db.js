import mongoose from "mongoose"

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://venkatdevara98:Tunnu98@cluster0.whddy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/food-del"
    )
    .then(() => {
      console.log("DB connected")
    })
}
