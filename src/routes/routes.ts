/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FxnController } from './../domains/fxn/fxn.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../domains/auth/auth.controller';
import { expressAuthentication } from './../middlewares/authentication';
// @ts-ignore - no great way to install types from subpackage
import type {
  Request as ExRequest,
  Response as ExResponse,
  RequestHandler,
  Router,
} from 'express';

const expressAuthenticationRecasted = expressAuthentication as (
  req: ExRequest,
  securityName: string,
  scopes?: string[],
  res?: ExResponse,
) => Promise<any>;

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  TransactionSignature: {
    dataType: 'refAlias',
    type: { dataType: 'string', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TransactionSignatureResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        transactionSignature: { ref: 'TransactionSignature', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IServiceError: {
    dataType: 'refObject',
    properties: {
      message: { dataType: 'string', required: true },
      reason: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ErrorResponse_IServiceError_: {
    dataType: 'refObject',
    properties: {
      message: { dataType: 'string', required: true },
      details: { ref: 'IServiceError' },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IValidationError: {
    dataType: 'refObject',
    properties: {
      constraints: { dataType: 'any', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ErrorResponse_IValidationError_: {
    dataType: 'refObject',
    properties: {
      message: { dataType: 'string', required: true },
      details: { ref: 'IValidationError' },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DataProviderFeeRequestDto: {
    dataType: 'refObject',
    properties: {
      fee: { dataType: 'double', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateSubscriptionRequestDto: {
    dataType: 'refObject',
    properties: {
      dataProvider: { dataType: 'string', required: true },
      recipient: { dataType: 'string', required: true },
      durationInDays: { dataType: 'double', required: true },
      nftTokenAccount: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetSubscriptionStatusResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        status: {
          dataType: 'union',
          subSchemas: [
            { dataType: 'enum', enums: ['active'] },
            { dataType: 'enum', enums: ['expired'] },
            { dataType: 'enum', enums: ['expiring_soon'] },
          ],
          required: true,
        },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetProviderTokenAccountResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        tokenAccount: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PublicKey: {
    dataType: 'refAlias',
    type: { dataType: 'string', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SubscriptionAccount: {
    dataType: 'refObject',
    properties: {
      endTime: { dataType: 'double', required: true },
      recipient: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SubscriberDetails: {
    dataType: 'refObject',
    properties: {
      subscriber: { ref: 'PublicKey', required: true },
      subscriptionPDA: { ref: 'PublicKey', required: true },
      subscription: { ref: 'SubscriptionAccount', required: true },
      status: {
        dataType: 'union',
        subSchemas: [
          { dataType: 'enum', enums: ['active'] },
          { dataType: 'enum', enums: ['expired'] },
          { dataType: 'enum', enums: ['expiring_soon'] },
        ],
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetSubscriberDetailsResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        subscriptions: {
          dataType: 'array',
          array: { dataType: 'refObject', ref: 'SubscriberDetails' },
          required: true,
        },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SubscriptionStatus: {
    dataType: 'refObject',
    properties: {
      status: {
        dataType: 'union',
        subSchemas: [
          { dataType: 'enum', enums: ['active'] },
          { dataType: 'enum', enums: ['expired'] },
          { dataType: 'enum', enums: ['expiring_soon'] },
        ],
        required: true,
      },
      subscription: { ref: 'SubscriptionAccount', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetAllSubscriptionsResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        subscriptions: {
          dataType: 'array',
          array: { dataType: 'refObject', ref: 'SubscriptionStatus' },
          required: true,
        },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RenewSubscriptionRequestDto: {
    dataType: 'refObject',
    properties: {
      dataProvider: { dataType: 'string', required: true },
      newRecipient: { dataType: 'string', required: true },
      newEndTime: { dataType: 'double', required: true },
      qualityScore: { dataType: 'double', required: true },
      nftTokenAccount: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CancelSubscriptionRequestDto: {
    dataType: 'refObject',
    properties: {
      dataProvider: { dataType: 'string', required: true },
      qualityScore: { dataType: 'double', required: true },
      nftTokenAccount: { dataType: 'string' },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetSubscriptionStateResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        recipient: { dataType: 'string', required: true },
        endTime: { dataType: 'double', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetQualityInfoResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        qualities: {
          dataType: 'array',
          array: { dataType: 'any' },
          required: true,
        },
        currentIndex: { dataType: 'double', required: true },
        quality: { dataType: 'double', required: true },
        subscriber: { ref: 'PublicKey', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ProgramAddressResponse: {
    dataType: 'refObject',
    properties: {
      statePDA: { ref: 'PublicKey', required: true },
      qualityPDA: { ref: 'PublicKey', required: true },
      subscriptionPDA: { ref: 'PublicKey', required: true },
      subscribersListPDA: { ref: 'PublicKey', required: true },
      dataProviderFeePDA: { ref: 'PublicKey', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RegisterAgentResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: { apiKey: { dataType: 'string', required: true } },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RegisterAgentRequestDto: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      name: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: 'throw-on-extras',
  bodyCoercion: true,
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const argsFxnController_setDataProviderFee: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    setDataProviderFeeData: {
      in: 'body',
      name: 'setDataProviderFeeData',
      required: true,
      ref: 'DataProviderFeeRequestDto',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.post(
    '/api/v1/fxn/data-provider-fee',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(
      FxnController.prototype.setDataProviderFee,
    ),

    async function FxnController_setDataProviderFee(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_setDataProviderFee,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'setDataProviderFee',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsFxnController_createSubscription: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    createSubscriptionData: {
      in: 'body',
      name: 'createSubscriptionData',
      required: true,
      ref: 'CreateSubscriptionRequestDto',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.post(
    '/api/v1/fxn/create-subscription',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(
      FxnController.prototype.createSubscription,
    ),

    async function FxnController_createSubscription(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_createSubscription,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'createSubscription',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsFxnController_getSubscriptionStatus: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    endTime: {
      in: 'query',
      name: 'endTime',
      required: true,
      dataType: 'double',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.get(
    '/api/v1/fxn/get-subscription-status',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(
      FxnController.prototype.getSubscriptionStatus,
    ),

    async function FxnController_getSubscriptionStatus(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_getSubscriptionStatus,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'getSubscriptionStatus',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsFxnController_getProviderTokenAccount: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    providerAddress: {
      in: 'query',
      name: 'providerAddress',
      required: true,
      dataType: 'string',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.get(
    '/api/v1/fxn/get-provider-token-account',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(
      FxnController.prototype.getProviderTokenAccount,
    ),

    async function FxnController_getProviderTokenAccount(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_getProviderTokenAccount,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'getProviderTokenAccount',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsFxnController_getSubscriptionsForProvider: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    providerPublicKey: {
      in: 'query',
      name: 'providerPublicKey',
      required: true,
      dataType: 'string',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.get(
    '/api/v1/fxn/get-subscriptions-for-provider',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(
      FxnController.prototype.getSubscriptionsForProvider,
    ),

    async function FxnController_getSubscriptionsForProvider(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_getSubscriptionsForProvider,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'getSubscriptionsForProvider',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsFxnController_getAllSubscriptionsForUser: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    providerPublicKey: {
      in: 'query',
      name: 'providerPublicKey',
      required: true,
      dataType: 'string',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.get(
    '/api/v1/fxn/get-subscriptions-for-user',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(
      FxnController.prototype.getAllSubscriptionsForUser,
    ),

    async function FxnController_getAllSubscriptionsForUser(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_getAllSubscriptionsForUser,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'getAllSubscriptionsForUser',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsFxnController_renewSubscription: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    renewParams: {
      in: 'body',
      name: 'renewParams',
      required: true,
      ref: 'RenewSubscriptionRequestDto',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.post(
    '/api/v1/fxn/renew-subscription',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(
      FxnController.prototype.renewSubscription,
    ),

    async function FxnController_renewSubscription(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_renewSubscription,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'renewSubscription',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsFxnController_cancelSubscription: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    cancelParams: {
      in: 'body',
      name: 'cancelParams',
      required: true,
      ref: 'CancelSubscriptionRequestDto',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.post(
    '/api/v1/fxn/cancel-subscription',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(
      FxnController.prototype.cancelSubscription,
    ),

    async function FxnController_cancelSubscription(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_cancelSubscription,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'cancelSubscription',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsFxnController_getSubscriptionState: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    subscriptionPDA: {
      in: 'query',
      name: 'subscriptionPDA',
      required: true,
      dataType: 'string',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.get(
    '/api/v1/fxn/get-subscription-state',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(
      FxnController.prototype.getSubscriptionState,
    ),

    async function FxnController_getSubscriptionState(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_getSubscriptionState,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'getSubscriptionState',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsFxnController_getQualityInfo: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    dataProvider: {
      in: 'query',
      name: 'dataProvider',
      required: true,
      dataType: 'string',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.get(
    '/api/v1/fxn/get-quality-info',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(FxnController.prototype.getQualityInfo),

    async function FxnController_getQualityInfo(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_getQualityInfo,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'getQualityInfo',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsFxnController_getProgramAddresses: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    dataProvider: {
      in: 'query',
      name: 'dataProvider',
      required: true,
      dataType: 'string',
    },
    subscriber: {
      in: 'query',
      name: 'subscriber',
      required: true,
      dataType: 'string',
    },
    apiKey: { in: 'query', name: 'apiKey', dataType: 'string' },
  };
  app.get(
    '/api/v1/fxn/get-program-addresses',
    ...fetchMiddlewares<RequestHandler>(FxnController),
    ...fetchMiddlewares<RequestHandler>(
      FxnController.prototype.getProgramAddresses,
    ),

    async function FxnController_getProgramAddresses(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsFxnController_getProgramAddresses,
          request,
          response,
        });

        const controller = new FxnController();

        await templateService.apiHandler({
          methodName: 'getProgramAddresses',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthController_registerAgent: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    agentData: {
      in: 'body',
      name: 'agentData',
      required: true,
      ref: 'RegisterAgentRequestDto',
    },
  };
  app.post(
    '/api/v1/auth/register-agent',
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.registerAgent),

    async function AuthController_registerAgent(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsAuthController_registerAgent,
          request,
          response,
        });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'registerAgent',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
