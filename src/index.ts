import { App, version as platformVersion } from 'zapier-platform-core';
import { authentication } from './authentication';
import { addAuthHeader } from './utils/http';

import subscriptionCreated from './triggers/subscription-created';
import subscriptionCancelled from './triggers/subscription-cancelled';
import subscriptionExpired from './triggers/subscription-expired';
import paymentSucceeded from './triggers/payment-succeeded';
import paymentFailed from './triggers/payment-failed';
import accessCodeRedeemed from './triggers/access-code-redeemed';
import memberJoined from './triggers/member-joined';
import memberBanned from './triggers/member-banned';

import createProject from './creates/create-project';
import archiveProject from './creates/archive-project';
import createPlan from './creates/create-plan';
import cancelSubscription from './creates/cancel-subscription';
import banMember from './creates/ban-member';
import kickMember from './creates/kick-member';

import findProjectByHandle from './searches/find-project-by-handle';
import findPlanByName from './searches/find-plan-by-name';
import findSubscriberByTelegramId from './searches/find-subscriber-by-telegram-id';

import pkg from '../package.json';

const app: App = {
  version: pkg.version,
  platformVersion,
  authentication,
  beforeRequest: [addAuthHeader],
  afterResponse: [],
  triggers: {
    [subscriptionCreated.key]: subscriptionCreated,
    [subscriptionCancelled.key]: subscriptionCancelled,
    [subscriptionExpired.key]: subscriptionExpired,
    [paymentSucceeded.key]: paymentSucceeded,
    [paymentFailed.key]: paymentFailed,
    [accessCodeRedeemed.key]: accessCodeRedeemed,
    [memberJoined.key]: memberJoined,
    [memberBanned.key]: memberBanned,
  },
  creates: {
    [createProject.key]: createProject,
    [archiveProject.key]: archiveProject,
    [createPlan.key]: createPlan,
    [cancelSubscription.key]: cancelSubscription,
    [banMember.key]: banMember,
    [kickMember.key]: kickMember,
  },
  searches: {
    [findProjectByHandle.key]: findProjectByHandle,
    [findPlanByName.key]: findPlanByName,
    [findSubscriberByTelegramId.key]: findSubscriberByTelegramId,
  },
  resources: {},
};

export default app;
