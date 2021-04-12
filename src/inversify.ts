import { Container } from 'inversify';
import { TYPES } from './types';
import UserRepository, { IUserRepository } from './repositories/user.repository';
import UserService, { IUserService } from './services/user.service';
import UserController from './controllers/user.controller';
import ClientRepository, { IClientRepository } from './repositories/client.repository';
import AccountRepository, { IAccountRepository } from './repositories/account.repository';
import TransactionRepository, { ITransactionDetailRepository } from './repositories/transaction.detail.repository';
import { ITransactionRepository } from './repositories/transaction.repository';
import TransactionDetailRepository from './repositories/transaction.detail.repository';

const container = new Container({ defaultScope: 'Singleton' });
container.bind(UserController).to(UserController);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);


container.bind<IClientRepository>(TYPES.ClientRepository).to(ClientRepository);

container.bind<IAccountRepository>(TYPES.AccountRepository).to(AccountRepository);

container.bind<ITransactionRepository>(TYPES.TransactionRepository).to(TransactionRepository);

container.bind<ITransactionDetailRepository>(TYPES.TransactionDetailRepository).to(TransactionDetailRepository);

export default container;
