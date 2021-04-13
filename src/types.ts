/**
 * InversifyJS need to use the type as identifiers at runtime.
 * We use symbols as identifiers but you can also use classes and or string literals.
 */
 export const TYPES = {
  UserController: Symbol('UserController'),
  RepoService: Symbol('RepoService'),
  
  UserRepository: Symbol('UserRepository'),
  ClientRepository: Symbol('ClientRepository'),
  AccountRepository: Symbol('AccountRepository'),
  TransactionRepository: Symbol('TransactionRepository'),
  TransactionDetailRepository: Symbol('TransactionDetailRepository'),
  ClientProductRepository: Symbol('ClientProductRepository'),
  
};
  