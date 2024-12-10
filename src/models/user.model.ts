import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
   name: string;
   surname: string;
   email: string;
   password: string;
   verificationCode: Number;
}

const userSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      surname: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      profileImage: {
         type: String,
         default: null,
      },
      lastLogin: {
         type: Date,
         default: Date.now,
      },
      status: {
         type: Boolean,
         default: false,
      },
      verificationCode: {
         type: String,
      },
      verificationExpiry: {
         type: Date,
         default: () => new Date(Date.now() + 15 * 60 * 1000),
      },
      verificationCodeLimit: {
         type: Number,
         default: 3,
      },
      refreshToken: {
         type: String,
         default: null,
      },
   },
   { timestamps: true }
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

export const User = mongoose.model<IUser>("User", userSchema);
