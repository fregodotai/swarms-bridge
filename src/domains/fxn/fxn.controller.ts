import { BN } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import express from 'express';
import {
  CancelParams,
  CreateSubscriptionParams,
  RenewParams,
} from 'fxn-protocol-sdk/dist/client/fxn-solana-adapter';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
  Response,
  Middlewares,
  Request,
} from 'tsoa';

import CancelSubscriptionRequestDto from './dto/cancel-subscription-request.dto';
import CreateSubscriptionRequestDto from './dto/create-subscription-request.dto';
import DataProviderFeeRequestDto from './dto/data-provider-fee-request.dto';
import RenewSubscriptionRequestDto from './dto/renew-subscription-request.dto';
import SubscriptionListRequestDto from './dto/subscription-list-request.dto';
import FxnService from './fxn.service';
import {
  CreateSubscriptionResponse,
  GetProviderTokenAccountResponse,
  GetQualityInfoResponse,
  GetSubscriberDetailsResponse,
  GetSubscriptionStateResponse,
  GetSubscriptionStatusResponse,
  ProgramAddressResponse,
  SubscriptionListParams,
  TransactionSignatureResponse,
} from './fxn.types';
import getAnchorProviderMiddleware from '../../middlewares/get-anchor-provider';
import { createModel } from '../../utils/create-model';
import {
  ErrorResponse,
  IServiceError,
  IValidationError,
  ServiceError,
} from '../../utils/error-handlers';

@Tags('FXN')
@Route('fxn')
export class FxnController extends Controller {
  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/data-provider-fee')
  public async setDataProviderFee(
    @Request() req: express.Request,
    @Body() setDataProviderFeeData: DataProviderFeeRequestDto,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): TransactionSignatureResponse {
    const model = await createModel(
      DataProviderFeeRequestDto,
      setDataProviderFeeData,
    );

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.setDataProviderFee(model);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/create-subscription')
  public async createSubscription(
    @Request() req: express.Request,
    @Body() createSubscriptionData: CreateSubscriptionRequestDto,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): CreateSubscriptionResponse {
    const model = await createModel(
      CreateSubscriptionRequestDto,
      createSubscriptionData,
    );

    const convertedModel: CreateSubscriptionParams = {
      dataProvider: new PublicKey(model.dataProvider),
      recipient: model.recipient,
      durationInDays: model.durationInDays,
      nftTokenAccount: new PublicKey(model.nftTokenAccount),
    };

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.createSubscription(convertedModel);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/subscription-list')
  public async subscriptionLists(
    @Request() req: express.Request,
    @Body() dataProvider: string,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): TransactionSignatureResponse {
    const convertedDataProvider = new PublicKey(dataProvider);

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.subscriptionLists({
      dataProvider: convertedDataProvider,
    });
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/realloc-subscription-list')
  public async reallocSubscriptionLists(
    @Request() req: express.Request,
    @Body() subscriptionListParams: SubscriptionListRequestDto,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): TransactionSignatureResponse {
    const model = await createModel(
      SubscriptionListRequestDto,
      subscriptionListParams,
    );

    const convertedModel: SubscriptionListParams = {
      subscriber: new PublicKey(model.subscriber),
      dataProvider: new PublicKey(model.dataProvider),
      mySubscriptionsPDA: new PublicKey(model.mySubscriptionsPDA),
      subscribersListPDA: new PublicKey(model.subscribersListPDA),
    };
    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.reallocSubscriptionLists(convertedModel);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/init-my-subscription-list')
  public async initMySubscriptionsList(
    @Request() req: express.Request,
    @Body() subscriptionListParams: SubscriptionListRequestDto,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): TransactionSignatureResponse {
    const model = await createModel(
      SubscriptionListRequestDto,
      subscriptionListParams,
    );

    const convertedModel: SubscriptionListParams = {
      subscriber: new PublicKey(model.subscriber),
      dataProvider: new PublicKey(model.dataProvider),
      mySubscriptionsPDA: new PublicKey(model.mySubscriptionsPDA),
      subscribersListPDA: new PublicKey(model.subscribersListPDA),
    };
    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.initMySubscriptionsList(convertedModel);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/init-subscribers-list')
  public async initSubscribersList(
    @Request() req: express.Request,
    @Body() subscriptionListParams: SubscriptionListRequestDto,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): TransactionSignatureResponse {
    const model = await createModel(
      SubscriptionListRequestDto,
      subscriptionListParams,
    );

    const convertedModel: SubscriptionListParams = {
      subscriber: new PublicKey(model.subscriber),
      dataProvider: new PublicKey(model.dataProvider),
      mySubscriptionsPDA: new PublicKey(model.mySubscriptionsPDA),
      subscribersListPDA: new PublicKey(model.subscribersListPDA),
    };
    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.initSubscribersList(convertedModel);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/add-subscriptions-list')
  public async addSubscriptionsLists(
    @Request() req: express.Request,
    @Body() subscriptionListParams: SubscriptionListRequestDto,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): TransactionSignatureResponse {
    const model = await createModel(
      SubscriptionListRequestDto,
      subscriptionListParams,
    );

    const convertedModel: SubscriptionListParams = {
      subscriber: new PublicKey(model.subscriber),
      dataProvider: new PublicKey(model.dataProvider),
      mySubscriptionsPDA: new PublicKey(model.mySubscriptionsPDA),
      subscribersListPDA: new PublicKey(model.subscribersListPDA),
    };
    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.addSubscriptionsLists(convertedModel);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-subscription-status')
  public getSubscriptionStatus(
    @Request() req: express.Request,
    @Query() endTime: number,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): GetSubscriptionStatusResponse {
    const convertedEndTime = new BN(endTime);

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return fxnService.getSubscriptionStatus(convertedEndTime);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-provider-token-account')
  public async getProviderTokenAccount(
    @Request() req: express.Request,
    @Query() providerAddress: string,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): GetProviderTokenAccountResponse {
    const convertedProviderAddress = new PublicKey(providerAddress);

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.getProviderTokenAccount(convertedProviderAddress);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-subscriptions-for-provider')
  public async getSubscriptionsForProvider(
    @Request() req: express.Request,
    @Query() providerPublicKey: string,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): GetSubscriberDetailsResponse {
    const convertedProviderPublicKey = new PublicKey(providerPublicKey);

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.getSubscriptionsForProvider(
      convertedProviderPublicKey,
    );
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-subscriptions-for-user')
  public async getAllSubscriptionsForUser(
    @Request() req: express.Request,
    @Query() providerPublicKey: string,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): GetSubscriberDetailsResponse {
    const convertedProviderPublicKey = new PublicKey(providerPublicKey);

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.getAllSubscriptionsForUser(
      convertedProviderPublicKey,
    );
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/renew-subscription')
  public async renewSubscription(
    @Request() req: express.Request,
    @Body() renewParams: RenewSubscriptionRequestDto,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): TransactionSignatureResponse {
    const model = await createModel(RenewSubscriptionRequestDto, renewParams);

    const convertedModel: RenewParams = {
      dataProvider: new PublicKey(model.dataProvider),
      newRecipient: model.newRecipient,
      newEndTime: model.newEndTime,
      qualityScore: model.qualityScore,
      nftTokenAccount: new PublicKey(model.nftTokenAccount),
    };

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.renewSubscription(convertedModel);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/cancel-subscription')
  public async cancelSubscription(
    @Request() req: express.Request,
    @Body() cancelParams: CancelSubscriptionRequestDto,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): TransactionSignatureResponse {
    const model = await createModel(CancelSubscriptionRequestDto, cancelParams);

    const convertedModel: CancelParams = {
      dataProvider: new PublicKey(model.dataProvider),
      qualityScore: model.qualityScore,
      nftTokenAccount: model.nftTokenAccount
        ? new PublicKey(model.nftTokenAccount)
        : undefined,
    };

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.cancelSubscription(convertedModel);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-subscription-state')
  public async getSubscriptionState(
    @Request() req: express.Request,
    @Query() subscriptionPDA: string,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): GetSubscriptionStateResponse {
    const convertedSubscriptionPDA = new PublicKey(subscriptionPDA);

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.getSubscriptionState(convertedSubscriptionPDA);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-quality-info')
  public async getQualityInfo(
    @Request() req: express.Request,
    @Query() dataProvider: string,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): GetQualityInfoResponse {
    const convertedDataProvider = new PublicKey(dataProvider);

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return await fxnService.getQualityInfo(convertedDataProvider);
  }

  /**
   * @param apiKey Provide an API key as a query parameter to call request on behalf of the user
   */
  @SuccessResponse('200')
  @Middlewares(getAnchorProviderMiddleware)
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-program-addresses')
  public getProgramAddresses(
    @Request() req: express.Request,
    @Query() dataProvider: string,
    @Query() subscriber: string,
    // eslint-disable-next-line
    @Query() apiKey?: string,
  ): ProgramAddressResponse {
    const convertedDataProvider = new PublicKey(dataProvider);
    const convertedSubscriber = new PublicKey(subscriber);

    if (!req.anchorProvider)
      throw new ServiceError('Cannot get anchor provider');

    const fxnService = new FxnService(req.anchorProvider);

    return fxnService.getProgramAddresses(
      convertedDataProvider,
      convertedSubscriber,
    );
  }
}
