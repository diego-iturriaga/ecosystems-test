import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IRepoService } from '../services/service';
import { TYPES } from '../types';

@injectable()
class UserController{
    @inject(TYPES.RepoService) private repoService: IRepoService;

    public async getUserAccounts(req: Request, res: Response) {
        const response = await this.repoService.getAccounts(req.params.userId);
        res.send({data: response});
    }

    public async getUserAccountTransactions(req: Request, res: Response): Promise<void> {
        const response = await this.repoService.getTransactions(req.body.accountId);
        res.send({data: response});
    }
    public async getUserAccountTransactionDetail(req: Request, res: Response): Promise<void> {
        const response = await this.repoService.getTransactionDetail(req.body.transactionId);
        res.send({data: response});
    }
    public async getUserAccountSumAverageTransactions(req: Request, res: Response): Promise<void> {
        const response = await this.repoService.getUserAccountSumAverageTransactions(req.body.transactionId);
        res.send({data: response});
    }
    public async addNewProductToUser(req: Request, res: Response): Promise<void> {
        const response = await this.repoService.addProductToClient(req.body.clientId, req.body.productId);
        res.send({data: response});
    }
}

export default UserController;