import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
   name: string;
   surname: string;
   username: string;
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
      username: {
         type: String,
         unique: true,
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
      },
      lastLogin: {
         type: Date,
         default: Date.now,
      },
      status: {
         type: Boolean,
         default: false,
      },
      verCode: {
         type: Number,
         default: null,
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
   { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
   if (this.isModified("name") || this.isModified("surname")) {
      this.name = this.name.replace(/\s+/g, "");
      this.surname = this.surname.replace(/\s+/g, "");

      const username = `${this.name.toLowerCase()}${this.surname.toLowerCase()}`;

      const existingUser = await User.findOne({ username });

      if (existingUser) {
         let variation = 1;
         let newUsername = `${username}${variation}`;

         while (await User.findOne({ username: newUsername })) {
            variation++;
            newUsername = `${username}${variation}`;
         }

         this.username = newUsername;
      } else this.username = username;
   }

   if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
   }
   next();
});

export const User = mongoose.model<IUser>("User", userSchema);
