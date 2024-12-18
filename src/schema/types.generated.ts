import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<UserResponse>;
  login?: Maybe<UserResponse>;
};


export type MutationcreateUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  surname: Scalars['String']['input'];
};


export type MutationloginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  getUsers: Array<UsersSearch>;
};


export type QuerygetUserArgs = {
  username: Scalars['String']['input'];
};


export type QuerygetUsersArgs = {
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  lastLogin?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
  surname: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
  verCode?: Maybe<Scalars['Int']['output']>;
  verCodeLimit?: Maybe<Scalars['Int']['output']>;
  verExp?: Maybe<Scalars['String']['output']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  username?: Maybe<Scalars['String']['output']>;
};

export type UsersSearch = {
  __typename?: 'UsersSearch';
  name: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
  surname: Scalars['String']['output'];
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UsersSearch: ResolverTypeWrapper<UsersSearch>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Mutation: {};
  String: Scalars['String']['output'];
  Query: {};
  User: User;
  ID: Scalars['ID']['output'];
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  UserResponse: UserResponse;
  UsersSearch: UsersSearch;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'email' | 'name' | 'password' | 'surname'>>;
  login?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationloginArgs, 'email' | 'password'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserArgs, 'username'>>;
  getUsers?: Resolver<Array<ResolversTypes['UsersSearch']>, ParentType, ContextType, RequireFields<QuerygetUsersArgs, 'username'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lastLogin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  verCodeLimit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  verExp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersSearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersSearch'] = ResolversParentTypes['UsersSearch']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UsersSearch?: UsersSearchResolvers<ContextType>;
};

