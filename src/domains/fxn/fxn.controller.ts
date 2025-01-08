import { BN } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
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
} from 'tsoa';

import {
  GetAllSubscriptionsResponse,
  GetProviderTokenAccountResponse,
  GetQualityInfoResponse,
  GetSubscriberDetailsResponse,
  GetSubscriptionStateResponse,
  GetSubscriptionStatusResponse,
  ProgramAddressResponse,
  TransactionSignatureResponse,
} from './fxn.types';
import { fxnService } from '../../services';
import CancelSubscriptionRequestDto from './dto/cancel-subscription-request.dto';
import CreateSubscriptionRequestDto from './dto/create-subscription-request.dto';
import DataProviderFeeRequestDto from './dto/data-provider-fee-request.dto';
import RenewSubscriptionRequestDto from './dto/renew-subscription-request.dto';
import { createModel } from '../../utils/create-model';
import {
  ErrorResponse,
  IServiceError,
  IValidationError,
} from '../../utils/error-handlers';

@Tags('FXN')
@Route('fxn')
export class FxnController extends Controller {
  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/data-provider-fee')
  public async setDataProviderFee(
    @Body() setDataProviderFeeData: DataProviderFeeRequestDto,
  ): TransactionSignatureResponse {
    const model = await createModel(
      DataProviderFeeRequestDto,
      setDataProviderFeeData,
    );

    return await fxnService.setDataProviderFee(model);
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/create-subscription')
  public async createSubscription(
    @Body() createSubscriptionData: CreateSubscriptionRequestDto,
  ): TransactionSignatureResponse {
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

    return await fxnService.createSubscription(convertedModel);
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-subscription-status')
  public getSubscriptionStatus(
    @Query() endTime: number,
  ): GetSubscriptionStatusResponse {
    const convertedEndTime = new BN(endTime);

    return fxnService.getSubscriptionStatus(convertedEndTime);
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-provider-token-account')
  public async getProviderTokenAccount(
    @Query() providerAddress: string,
  ): GetProviderTokenAccountResponse {
    const convertedProviderAddress = new PublicKey(providerAddress);

    return await fxnService.getProviderTokenAccount(convertedProviderAddress);
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-subscriptions-for-provider')
  public async getSubscriptionsForProvider(
    @Query() providerPublicKey: string,
  ): GetSubscriberDetailsResponse {
    const convertedProviderPublicKey = new PublicKey(providerPublicKey);

    return await fxnService.getSubscriptionsForProvider(
      convertedProviderPublicKey,
    );
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-subscriptions-for-user')
  public async getAllSubscriptionsForUser(
    @Query() providerPublicKey: string,
  ): GetAllSubscriptionsResponse {
    const convertedProviderPublicKey = new PublicKey(providerPublicKey);

    return await fxnService.getAllSubscriptionsForUser(
      convertedProviderPublicKey,
    );
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/renew-subscription')
  public async renewSubscription(
    @Body() renewParams: RenewSubscriptionRequestDto,
  ): TransactionSignatureResponse {
    const model = await createModel(RenewSubscriptionRequestDto, renewParams);

    const convertedModel: RenewParams = {
      dataProvider: new PublicKey(model.dataProvider),
      newRecipient: model.newRecipient,
      newEndTime: model.newEndTime,
      qualityScore: model.qualityScore,
      nftTokenAccount: new PublicKey(model.nftTokenAccount),
    };

    return await fxnService.renewSubscription(convertedModel);
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/cancel-subscription')
  public async cancelSubscription(
    @Body() cancelParams: CancelSubscriptionRequestDto,
  ): TransactionSignatureResponse {
    const model = await createModel(CancelSubscriptionRequestDto, cancelParams);

    const convertedModel: CancelParams = {
      dataProvider: new PublicKey(model.dataProvider),
      qualityScore: model.qualityScore,
      nftTokenAccount: model.nftTokenAccount
        ? new PublicKey(model.nftTokenAccount)
        : undefined,
    };

    return await fxnService.cancelSubscription(convertedModel);
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-subscription-state')
  public async getSubscriptionState(
    @Query() subscriptionPDA: string,
  ): GetSubscriptionStateResponse {
    const convertedSubscriptionPDA = new PublicKey(subscriptionPDA);

    return await fxnService.getSubscriptionState(convertedSubscriptionPDA);
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-quality-info')
  public async getQualityInfo(
    @Query() dataProvider: string,
  ): GetQualityInfoResponse {
    const convertedDataProvider = new PublicKey(dataProvider);

    return await fxnService.getQualityInfo(convertedDataProvider);
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/get-program-addresses')
  public getProgramAddresses(
    @Query() dataProvider: string,
    @Query() subscriber: string,
  ): ProgramAddressResponse {
    const convertedDataProvider = new PublicKey(dataProvider);
    const convertedSubscriber = new PublicKey(subscriber);

    return fxnService.getProgramAddresses(
      convertedDataProvider,
      convertedSubscriber,
    );
  }
}
