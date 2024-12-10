import { User } from "../../../../models/user.model";
import { sendVerificationMail } from "../../../../utils/sendMail";
import type { MutationResolvers } from "./../../../types.generated";
export const createUser: NonNullable<MutationResolvers["createUser"]> = async (_parent, { name, surname, email, password }, _ctx) => {
   // 1. Kullanıcı veritabanında mevcut mu kontrolü
   const existingUser = await User.findOne({ email });
   if (existingUser) {
      throw new Error("A user with this email already exists");
   }

   const newUser = new User({
      name,
      surname,
      email,
      password,
   });

   try {
      await newUser.save();

      const verificationCode = await sendVerificationMail(email);

      newUser.verificationCode = verificationCode;
      await newUser.save();

      return { id: newUser.id };
   } catch (error) {
      if (newUser.id) await User.findByIdAndDelete(newUser.id);

      throw new Error("Kullanıcı oluşturulurken bir hata oluştu: " + error);
   }
};