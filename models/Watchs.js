import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Название обязательно!"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Описание обязательно!"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Цена обязательна!"],
    min: 0,
  },
  material: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
  },
});


export default mongoose.model("Watch", productSchema);
