import { App, version as platformVersion } from 'zapier-platform-core';
import { authentication } from './authentication';
import { addAuthHeader } from './utils/http';

import subscriptionCreated from './triggers/subscription-created';
import subscriptionActivated from './triggers/subscription-activated';
import subscriptionRenewed from './triggers/subscription-renewed';
import subscriptionCancelled from './triggers/subscription-cancelled';
import subscriptionExpired from './triggers/subscription-expired';
import paymentSucceeded from './triggers/payment-succeeded';
import paymentFailed from './triggers/payment-failed';
import accessCodeGenerated from './triggers/access-code-generated';
import accessCodeRedeemed from './triggers/access-code-redeemed';
import accessCodeExpired from './triggers/access-code-expired';
import memberJoined from './triggers/member-joined';
import memberTrialJoined from './triggers/member-trial-joined';
import memberBanned from './triggers/member-banned';
import memberUnbanned from './triggers/member-unbanned';
import memberKicked from './triggers/member-kicked';
import planCreated from './triggers/plan-created';
import planUpdated from './triggers/plan-updated';
import planDeactivated from './triggers/plan-deactivated';
import projectCreated from './triggers/project-created';

import createProject from './creates/create-project';
import updateProject from './creates/update-project';
import archiveProject from './creates/archive-project';
import restoreProject from './creates/restore-project';
import createPlan from './creates/create-plan';
import updatePlan from './creates/update-plan';
import publishPlan from './creates/publish-plan';
import unpublishPlan from './creates/unpublish-plan';
import cancelSubscription from './creates/cancel-subscription';
import banMember from './creates/ban-member';
import unbanMember from './creates/unban-member';
import kickMember from './creates/kick-member';
import createResource from './creates/create-resource';
import bulkGenerateAccessCodes from './creates/bulk-generate-access-codes';

import findProjectByHandle from './searches/find-project-by-handle';
import findPlanByName from './searches/find-plan-by-name';
import findPlanById from './searches/find-plan-by-id';
import findSubscriberByTelegramId from './searches/find-subscriber-by-telegram-id';
import findMemberById from './searches/find-member-by-id';
import findSubscriptionById from './searches/find-subscription-by-id';

import pkg from '../package.json';

const triggers = {
  [subscriptionCreated.key]: subscriptionCreated,
  [subscriptionActivated.key]: subscriptionActivated,
  [subscriptionRenewed.key]: subscriptionRenewed,
  [subscriptionCancelled.key]: subscriptionCancelled,
  [subscriptionExpired.key]: subscriptionExpired,
  [paymentSucceeded.key]: paymentSucceeded,
  [paymentFailed.key]: paymentFailed,
  [accessCodeGenerated.key]: accessCodeGenerated,
  [accessCodeRedeemed.key]: accessCodeRedeemed,
  [accessCodeExpired.key]: accessCodeExpired,
  [memberJoined.key]: memberJoined,
  [memberTrialJoined.key]: memberTrialJoined,
  [memberBanned.key]: memberBanned,
  [memberUnbanned.key]: memberUnbanned,
  [memberKicked.key]: memberKicked,
  [planCreated.key]: planCreated,
  [planUpdated.key]: planUpdated,
  [planDeactivated.key]: planDeactivated,
  [projectCreated.key]: projectCreated,
};

const creates = {
  [createProject.key]: createProject,
  [updateProject.key]: updateProject,
  [archiveProject.key]: archiveProject,
  [restoreProject.key]: restoreProject,
  [createPlan.key]: createPlan,
  [updatePlan.key]: updatePlan,
  [publishPlan.key]: publishPlan,
  [unpublishPlan.key]: unpublishPlan,
  [cancelSubscription.key]: cancelSubscription,
  [banMember.key]: banMember,
  [unbanMember.key]: unbanMember,
  [kickMember.key]: kickMember,
  [createResource.key]: createResource,
  [bulkGenerateAccessCodes.key]: bulkGenerateAccessCodes,
};

const searches = {
  [findProjectByHandle.key]: findProjectByHandle,
  [findPlanByName.key]: findPlanByName,
  [findPlanById.key]: findPlanById,
  [findSubscriberByTelegramId.key]: findSubscriberByTelegramId,
  [findMemberById.key]: findMemberById,
  [findSubscriptionById.key]: findSubscriptionById,
};

const app: App<typeof triggers, typeof creates, typeof searches> = {
  version: pkg.version,
  platformVersion,
  authentication,
  beforeRequest: [addAuthHeader],
  afterResponse: [],
  triggers,
  creates,
  searches,
  resources: {},
};

export default app;
