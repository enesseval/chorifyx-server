/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { getUser as Query_getUser } from './user/resolvers/Query/getUser';
import    { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import    { User } from './user/resolvers/User';
import    { UserResponse } from './user/resolvers/UserResponse';
    export const resolvers: Resolvers = {
      Query: { getUser: Query_getUser },
      Mutation: { createUser: Mutation_createUser },
      
      User: User,
UserResponse: UserResponse
    }