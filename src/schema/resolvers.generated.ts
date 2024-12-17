/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { getUser as Query_getUser } from './user/resolvers/Query/getUser';
import    { getUsers as Query_getUsers } from './user/resolvers/Query/getUsers';
import    { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import    { login as Mutation_login } from './user/resolvers/Mutation/login';
import    { User } from './user/resolvers/User';
import    { UserResponse } from './user/resolvers/UserResponse';
import    { UsersSearch } from './user/resolvers/UsersSearch';
    export const resolvers: Resolvers = {
      Query: { getUser: Query_getUser,getUsers: Query_getUsers },
      Mutation: { createUser: Mutation_createUser,login: Mutation_login },
      
      User: User,
UserResponse: UserResponse,
UsersSearch: UsersSearch
    }