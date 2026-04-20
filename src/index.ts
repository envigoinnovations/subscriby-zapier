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
  creates: {},
  searches: {},
  resources: {},
};

export default app;
