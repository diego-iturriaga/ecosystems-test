import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IUserService } from '../services/user.service';
import { TYPES } from '../types';


@injectable()
class UserController{
    @inject(TYPES.UserService) private userService: IUserService;

    public async getUserAccounts(req: Request, res: Response): Promise<void> {
        const response = await this.userService.getAccount(req.body.userId);
        res.send(response);
        /*return User.findOne({where: {id: userId}, include: [Client]}).then(usr => {
            return Account.findAll({where: {clientId: usr?.getClientId()}}).then(accs=>{
                return accs;
            });
        });*/
    }

    public async getUserAccountTransactions(req: Request, res: Response): Promise<void> {
        const response = await this.userService.getTransactions(req.body.accountId);
        res.send(response);
        /*
        return Transaction.findAll({where: {accountId}, include: [TransactionDetail]}).then(trlist => {
            return trlist;
        }); */
    }
    public async getUserAccountTransactionDetail(req: Request, res: Response): Promise<void> {
        const response = await this.userService.getTransactionDetail(req.body.transactionId);
        res.send(response);
        /*
        return Transaction.findByPk(transactionId, {include: TransactionDetail}).then(trd => {
            return trd?.getDetail();
        });*/
        //return TransactionDetail.findOne({where: {transactionId}}).then(trd => {
        //    return trd;
        //});
    }
    public async getUserAccountSumAverageTransactions(req: Request, res: Response): Promise<void> {
        const response = await this.userService.getUserAccountSumAverageTransactions(req.body.transactionId);
        res.send(response);
        
        /*return Transaction.findAll(
            {where:
                {accountId,
                createdAt: {[Op.between]: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]}}})
            .then(trlist=>{
                let sum = 0;
                let count = 0;
                trlist.forEach((resultSetItem) => {
                    count++;
                    sum+= Number(resultSetItem.getAmount());
                });
                if(count===0) return 0;
                return sum/count;
            });*/
    }
    public async addNewProductToUser(req: Request, res: Response): Promise<void> {
        const response = await this.userService.addProductToClient(req.body.clientId, req.body.productId);
        res.send(response);
        
        /*
        return User.findByPk(userId).then(usr=>{
            return Product.findByPk(productId).then(pr=>{
                return Client.findByPk(usr?.getClientId(), {include: Product}).then(cl=>{
                    return ClientProduct.create({clientId: cl?.id, productId: pr?.id}).then(cp=>{
                        return cp;
                    }).catch(err=>{
                        return err;
                    });
                });
            });
        });*/
    }
}

export default UserController;