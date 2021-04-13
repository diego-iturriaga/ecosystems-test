import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { MissingFieldError } from '../errors/app.errors';
import StaticStringKeys from '../constants';
import { IRepoService } from '../services/service';
import { TYPES } from '../types';
import Crypto  from "../utils/crypto";
import {createToken} from '../utils/token.creator';

@injectable()
class UserController{
    @inject(TYPES.RepoService) private repoService: IRepoService;

    public async login(req: Request, res: Response){
        const username = req.body.username;
        const password = req.body.password;
        const usr = await this.repoService.getUserByUsername(username);
        if (!usr) {
            return res.status(404).send({
                code: 404,
                message: StaticStringKeys.USER_NOT_FOUND
            });
        }
        const c = new Crypto()
        const isMatch: boolean = c.validPassword(password, usr.password);
        if(!isMatch){
            return res.status(401).send({
                code: 401,
                message: StaticStringKeys.INVALID_LOGIN
                });
        }
        res.status(200).send({
            token: createToken(usr)
          });
    }
    
    public async getUserAccounts(req: Request, res: Response) {
        if (!req.params.userId) {
          throw new MissingFieldError('userId');
        }
        const userId = req.params.userId;
        const response = await this.repoService.getAccounts(userId);
        if(!response){
            StaticStringKeys.REPOSITORY_ERROR_INVALID_ID
        }
        res.send({data: {'accounts': response}});
    }

    public async getUserAccountTransactions(req: Request, res: Response): Promise<void> {
        if (!req.params.userId) {
            throw new MissingFieldError('userId');
        }
        if (!req.params.accountId) {
            throw new MissingFieldError('accountId');
        }
        const userId = req.params.userId;
        const accountId = req.params.accountId;
        //check if userId owns transactionId
        const response = await this.repoService.getTransactions(accountId);
        res.send({data: {'transactions': response}});
    }
    public async getUserAccountTransactionDetail(req: Request, res: Response): Promise<void> {
        if (!req.params.userId) {
            throw new MissingFieldError('userId');
        }
        if (!req.params.accountId) {
            throw new MissingFieldError('accountId');
        }
        if (!req.params.transactionId) {
            throw new MissingFieldError('transactionId');
        }
        const userId = req.params.userId;
        const accountId = req.params.accountId;
        const transactionId = req.params.transactionId;
        //check if userId owns transactionId
        const response = await this.repoService.getTransactionDetail(transactionId);
        res.send({data: {'detail': response}});
    }
    public async getUserAccountSumAverageTransactions(req: Request, res: Response): Promise<void> {
        if (!req.params.accountId) {
            throw new MissingFieldError('accountId');
        }
        const response = await this.repoService.getUserAccountSumAverageTransactions(req.params.accountId);
        res.send({data: {'average': response}});
    }
    public async addNewProductToUser(req: Request, res: Response): Promise<void> {
        if (!req.params.clientId) {
            throw new MissingFieldError('clientId');
        }
        if (!req.params.productId) {
            throw new MissingFieldError('productId');
        }
        const clientId = req.params.clientId;
        const productId = req.params.productId;
        const response = await this.repoService.addProductToClient(clientId, productId);
        res.send({data: {'result': response}});
    }
}

export default UserController;