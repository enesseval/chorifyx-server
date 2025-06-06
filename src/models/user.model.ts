import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/db";

class User extends Model {
   public id!: string;
   public name?: string;
   public surname?: string;
   public email!: string;
   public password?: string;
   public username!: string;
   public profileImage?: string;
   public isVerified!: boolean;
   public verificationAttempts!: number;
   public verificationCode!: string | null;
   public verificationCodeExpires!: Date | null;
   public passwordHistory!: string[];
   public loginAttempts!: number;
   public lockUntil!: Date | null;
   public googleId?: string;
   public authProvider!: "email" | "google";
   public linkedAccounts?: {
      google?: {
         id: string;
         email: string;
         linkedAt: Date;
      };
   };

   public async setPassword(password: string): Promise<void> {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(password, salt);
   }

   public async comparePassword(password: string): Promise<boolean> {
      if (!this.password) return false;
      return bcrypt.compare(password, this.password);
   }

   public static async generateUniqueUsername(name: string, surname: string): Promise<string> {
      let base = `${name}${surname}`
         .toLowerCase()
         .replace(/ğ/g, "g")
         .replace(/ü/g, "u")
         .replace(/ş/g, "s")
         .replace(/ı/g, "i")
         .replace(/ö/g, "o")
         .replace(/ç/g, "c")
         .replace(/[^a-z0-9]/g, "");
      let username = base;
      let counter = 1;
      while (await User.findOne({ where: { username } })) {
         username = `${base}${counter++}`;
      }
      return username;
   }

   public static async addPasswordHistory(userId: string, password: string): Promise<void> {
      const user = await User.findByPk(userId);
      if (user) {
         user.passwordHistory.push(password);
         if (user.passwordHistory.length > 5) user.passwordHistory.shift();
         await user.save();
      }
   }

   public static async incrementLoginAttempts(email: string): Promise<void> {
      const user = await User.findOne({ where: { email } });
      if (user) {
         user.loginAttempts += 1;
         if (user.loginAttempts >= 5) user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
         await user.save();
      }
   }
}

User.init(
   {
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: { isEmail: true },
      },
      password: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      profileImage: DataTypes.STRING,
      isVerified: {
         type: DataTypes.BOOLEAN,
         defaultValue: false,
      },
      verificationAttempts: {
         type: DataTypes.INTEGER,
         defaultValue: 0,
      },
      verificationCode: DataTypes.STRING,
      verificationCodeExpires: DataTypes.DATE,
      passwordHistory: {
         type: DataTypes.JSONB,
         defaultValue: [],
      },
      loginAttempts: {
         type: DataTypes.INTEGER,
         defaultValue: 0,
      },
      lockUntil: DataTypes.DATE,
      googleId: DataTypes.STRING,
      authProvider: {
         type: DataTypes.ENUM("email", "google"),
         allowNull: false,
      },
      linkedAccounts: {
         type: DataTypes.JSONB,
         defaultValue: {},
      },
   },
   {
      sequelize,
      modelName: "User",
      timestamps: true,
      hooks: {
         beforeSave: async (user: User) => {
            if (user.changed("password") && user.password) {
               const salt = await bcrypt.genSalt(10);
               user.password = await bcrypt.hash(user.password, salt);
            }
         },
         beforeCreate: async (user: User) => {
            if (!user.verificationCodeExpires) {
               user.verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);
            }
         },
      },
   }
);

export default User;
