import { Schema, models, model } from "mongoose";
import connectMongodb from "../db";

connectMongodb();

export const UserSchema = new Schema({
  full_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  is_approved: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = models.User || model("User", UserSchema);

export const MakeRegister = async (
  full_name: string,
  email: string,
  password: string
) => {
  const user = await UserModel.create({
    full_name: full_name,
    email: email,
    password: password,
  });
  return user;
};

export const checkByEmail = async (email: string) => {
  const check = await UserModel.findOne({ email });
  return check;
};

export const MakeApprove = async (id: string) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) return null;
  } catch (err) {
    console.log(err);
    return null;
  }
  const data = await UserModel.findByIdAndUpdate(
    id,
    {
      is_approved: true,
    },
    { new: true }
  );
  return data;
};
