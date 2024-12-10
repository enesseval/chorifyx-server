/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { users as Query_users } from './user/resolvers/Query/users';
import    { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import    { User } from './user/resolvers/User';
import    { UserResponse } from './user/resolvers/UserResponse';
    export const resolvers: Resolvers = {
      Query: { users: Query_users },
      Mutation: { createUser: Mutation_createUser },
      
      User: User,
UserResponse: UserResponse
    }