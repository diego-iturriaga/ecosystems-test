import { Container } from 'inversify';
import UserController from './controllers/user.controller';
import AccountRepository, { IAccountRepository } from './repositories/account.repository';
import ClientProductRepository, { IClientProductRepository } from './repositories/client.product.repository';
import ClientRepository, { IClientRepository } from './repositories/client.repository';
import TransactionDetailRepository, { ITransactionDetailRepository } from './repositories/transaction.detail.repository';
import TransactionRepository, { ITransactionRepository } from './repositories/transaction.repository';
import UserRepository, { IUserRepository } from './repositories/user.repository';
import RepoService, { IRepoService } from './services/service';
import { TYPES } from './types';

const container = new Container({ defaultScope: 'Singleton' });
container.bind(UserController).to(UserController);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IRepoService>(TYPES.RepoService).to(RepoService);


container.bind<IClientRepository>(TYPES.ClientRepository).to(ClientRepository);

container.bind<IAccountRepository>(TYPES.AccountRepository).to(AccountRepository);

container.bind<ITransactionRepository>(TYPES.TransactionRepository).to(TransactionRepository);

container.bind<ITransactionDetailRepository>(TYPES.TransactionDetailRepository).to(TransactionDetailRepository);

container.bind<IClientProductRepository>(TYPES.ClientProductRepository).to(ClientProductRepository);


export default container;
