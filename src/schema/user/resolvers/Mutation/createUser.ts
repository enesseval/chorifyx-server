import { User } from "../../../../models/user.model";
import { createTokenAndSetCookies } from "../../../../utils/createToken";
import { sendVerificationMail } from "../../../../utils/sendMail";
import type { MutationResolvers } from "./../../../types.generated";

export const createUser: NonNullable<MutationResolvers['createUser']> = async (_parent, { name, surname, email, password }, context) => {
   const { res } = context;
   const existingUser = await User.findOne({ email });
   if (existingUser) {
      throw new Error("Bu email adresi zaten kullanılıyor.");
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

      await createTokenAndSetCookies(newUser.id, res);

      return { username: newUser.username };
   } catch (error) {
      if (newUser.id) await User.findByIdAndDelete(newUser.id);

      throw new Error("Kullanıcı oluşturulurken bir hata oluştu: " + error);
   }
};
