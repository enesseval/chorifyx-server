import { User } from "../models/user.model";

export const resolvers = {
   Query: {
      users: async () => {
         return await User.find();
      },
   },
   Mutation: {
      addUser: async (_: unknown, { name, surname, email, password }: { name: string; surname: string; email: string; password: string }) => {
         const user = new User({ name, surname, email, password });
         return await user.save();
      },
   },
};
