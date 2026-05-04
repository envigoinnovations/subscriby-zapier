import { App, version as platformVersion } from 'zapier-platform-core';
import { authentication } from './authentication';
import { addAuthHeader } from './utils/http';

import subscriptionCreated from './triggers/subscription-created';
import subscriptionActivated from './triggers/subscription-activated';
import subscriptionRenewed from './triggers/subscription-renewed';
import subscriptionCancelled from './triggers/subscription-cancelled';
import subscriptionExpired from './triggers/subscription-expired';
import subscriptionTrialStarted from './triggers/subscription-trial-started';
import subscriptionTrialConverting from './triggers/subscription-trial-converting';
import subscriptionTrialExpired from './triggers/subscription-trial-expired';
import subscriptionReactivated from './triggers/subscription-reactivated';
import subscriptionPaused from './triggers/subscription-paused';
import subscriptionUnpaused from './triggers/subscription-unpaused';
import subscriptionPastDue from './triggers/subscription-past-due';
import subscriptionUnpaid from './triggers/subscription-unpaid';
import subscriptionRefunded from './triggers/subscription-refunded';
import subscriptionUpgraded from './triggers/subscription-upgraded';
import subscriptionDowngraded from './triggers/subscription-downgraded';
import paymentSucceeded from './triggers/payment-succeeded';
import paymentFailed from './triggers/payment-failed';
import paymentPending from './triggers/payment-pending';
import paymentRefunded from './triggers/payment-refunded';
import accessCodeGenerated from './triggers/access-code-generated';
import accessCodeRedeemed from './triggers/access-code-redeemed';
import accessCodeExpired from './triggers/access-code-expired';
import memberJoined from './triggers/member-joined';
import memberTrialJoined from './triggers/member-trial-joined';
import memberBanned from './triggers/member-banned';
import memberUnbanned from './triggers/member-unbanned';
import memberKicked from './triggers/member-kicked';
import memberConverted from './triggers/member-converted';
import memberChurned from './triggers/member-churned';
import memberRemoved from './triggers/member-removed';
import memberResourceAdded from './triggers/member-resource-added';
import memberResourceRemoved from './triggers/member-resource-removed';
import planCreated from './triggers/plan-created';
import planUpdated from './triggers/plan-updated';
import planDeactivated from './triggers/plan-deactivated';
import planActivated from './triggers/plan-activated';
import planDeleted from './triggers/plan-deleted';
import planSyncCompleted from './triggers/plan-sync-completed';
import projectCreated from './triggers/project-created';
import projectUpdated from './triggers/project-updated';
import projectArchived from './triggers/project-archived';
import projectRestored from './triggers/project-restored';
import projectDeleted from './triggers/project-deleted';
import projectBotConnected from './triggers/project-bot-connected';
import projectBotDisconnected from './triggers/project-bot-disconnected';
import projectResourceCreated from './triggers/project-resource-created';
import projectResourceLinked from './triggers/project-resource-linked';
import projectResourceUnlinked from './triggers/project-resource-unlinked';
import projectResourceDeleted from './triggers/project-resource-deleted';
import teamCreated from './triggers/team-created';
import teamDeleted from './triggers/team-deleted';
import teamMemberInvited from './triggers/team-member-invited';
import teamMemberJoined from './triggers/team-member-joined';
import teamMemberRemoved from './triggers/team-member-removed';
import teamMemberRoleChanged from './triggers/team-member-role-changed';
import roleCreated from './triggers/role-created';
import roleUpdated from './triggers/role-updated';
import roleDeleted from './triggers/role-deleted';
import groupCreated from './triggers/group-created';
import groupUpdated from './triggers/group-updated';
import groupDeleted from './triggers/group-deleted';
import billingInvoiceCreated from './triggers/billing-invoice-created';
import billingInvoicePaid from './triggers/billing-invoice-paid';
import billingInvoiceOverdue from './triggers/billing-invoice-overdue';
import billingPaymentFailed from './triggers/billing-payment-failed';
import billingGracePeriodWarning from './triggers/billing-grace-period-warning';
import billingAccountLocked from './triggers/billing-account-locked';
import billingTierUpgraded from './triggers/billing-tier-upgraded';
import billingTierDowngraded from './triggers/billing-tier-downgraded';
import billingTierCancelled from './triggers/billing-tier-cancelled';
import dropdownProjects from './triggers/dropdown-projects';
import dropdownPlans from './triggers/dropdown-plans';
import dropdownTeams from './triggers/dropdown-teams';
import dropdownMembers from './triggers/dropdown-members';
import dropdownSubscriptions from './triggers/dropdown-subscriptions';
import dropdownResources from './triggers/dropdown-resources';
import dropdownWebhookEndpoints from './triggers/dropdown-webhook-endpoints';
import dropdownTokens from './triggers/dropdown-tokens';
import dropdownRoles from './triggers/dropdown-roles';
import dropdownGroups from './triggers/dropdown-groups';
import dropdownAccessCodes from './triggers/dropdown-access-codes';

import createProject from './creates/create-project';
import updateProject from './creates/update-project';
import archiveProject from './creates/archive-project';
import restoreProject from './creates/restore-project';
import deleteProject from './creates/delete-project';
import createPlan from './creates/create-plan';
import updatePlan from './creates/update-plan';
import publishPlan from './creates/publish-plan';
import unpublishPlan from './creates/unpublish-plan';
import deletePlan from './creates/delete-plan';
import cancelSubscription from './creates/cancel-subscription';
import banMember from './creates/ban-member';
import unbanMember from './creates/unban-member';
import kickMember from './creates/kick-member';
import createResource from './creates/create-resource';
import unlinkResource from './creates/unlink-resource';
import deleteResource from './creates/delete-resource';
import bulkGenerateAccessCodes from './creates/bulk-generate-access-codes';
import deleteAccessCode from './creates/delete-access-code';
import createWebhookEndpoint from './creates/create-webhook-endpoint';
import deleteWebhookEndpoint from './creates/delete-webhook-endpoint';
import rotateWebhookSecret from './creates/rotate-webhook-secret';
import testWebhookEndpoint from './creates/test-webhook-endpoint';
import revokeToken from './creates/revoke-token';

import findProjectByHandle from './searches/find-project-by-handle';
import findPlanByName from './searches/find-plan-by-name';
import findPlanById from './searches/find-plan-by-id';
import findSubscriberByTelegramId from './searches/find-subscriber-by-telegram-id';
import findMemberById from './searches/find-member-by-id';
import findSubscriptionById from './searches/find-subscription-by-id';
import listProjects from './searches/list-projects';
import getProject from './searches/get-project';
import listPlans from './searches/list-plans';
import listSubscriptions from './searches/list-subscriptions';
import listMembers from './searches/list-members';
import listAccessCodes from './searches/list-access-codes';
import previewAccessCodeCost from './searches/preview-access-code-cost';
import listResources from './searches/list-resources';
import getResource from './searches/get-resource';
import listPaymentMethods from './searches/list-payment-methods';
import getPaymentMethod from './searches/get-payment-method';
import listWebhookEndpoints from './searches/list-webhook-endpoints';
import listWebhookDeliveries from './searches/list-webhook-deliveries';
import listTokens from './searches/list-tokens';
import getToken from './searches/get-token';
import listTeams from './searches/list-teams';
import getTeam from './searches/get-team';
import getCurrentTeam from './searches/get-current-team';
import listTeamMembers from './searches/list-team-members';
import getTeamMember from './searches/get-team-member';
import listRoles from './searches/list-roles';
import getRole from './searches/get-role';
import listGroups from './searches/list-groups';
import getGroup from './searches/get-group';
import listActivity from './searches/list-activity';
import getBotStatus from './searches/get-bot-status';
import getBotLink from './searches/get-bot-link';
import getPortalUrl from './searches/get-portal-url';
import getDeepLink from './searches/get-deep-link';
import getDashboardMetrics from './searches/get-dashboard-metrics';
import getEarningsReport from './searches/get-earnings-report';
import getSubscriberAnalytics from './searches/get-subscriber-analytics';
import getTransactionBreakdown from './searches/get-transaction-breakdown';
import getPlanPerformance from './searches/get-plan-performance';
import listTransactions from './searches/list-transactions';

import pkg from '../package.json';

const triggers = {
  [subscriptionCreated.key]: subscriptionCreated,
  [subscriptionActivated.key]: subscriptionActivated,
  [subscriptionRenewed.key]: subscriptionRenewed,
  [subscriptionCancelled.key]: subscriptionCancelled,
  [subscriptionExpired.key]: subscriptionExpired,
  [subscriptionTrialStarted.key]: subscriptionTrialStarted,
  [subscriptionTrialConverting.key]: subscriptionTrialConverting,
  [subscriptionTrialExpired.key]: subscriptionTrialExpired,
  [subscriptionReactivated.key]: subscriptionReactivated,
  [subscriptionPaused.key]: subscriptionPaused,
  [subscriptionUnpaused.key]: subscriptionUnpaused,
  [subscriptionPastDue.key]: subscriptionPastDue,
  [subscriptionUnpaid.key]: subscriptionUnpaid,
  [subscriptionRefunded.key]: subscriptionRefunded,
  [subscriptionUpgraded.key]: subscriptionUpgraded,
  [subscriptionDowngraded.key]: subscriptionDowngraded,
  [paymentSucceeded.key]: paymentSucceeded,
  [paymentFailed.key]: paymentFailed,
  [paymentPending.key]: paymentPending,
  [paymentRefunded.key]: paymentRefunded,
  [accessCodeGenerated.key]: accessCodeGenerated,
  [accessCodeRedeemed.key]: accessCodeRedeemed,
  [accessCodeExpired.key]: accessCodeExpired,
  [memberJoined.key]: memberJoined,
  [memberTrialJoined.key]: memberTrialJoined,
  [memberBanned.key]: memberBanned,
  [memberUnbanned.key]: memberUnbanned,
  [memberKicked.key]: memberKicked,
  [memberConverted.key]: memberConverted,
  [memberChurned.key]: memberChurned,
  [memberRemoved.key]: memberRemoved,
  [memberResourceAdded.key]: memberResourceAdded,
  [memberResourceRemoved.key]: memberResourceRemoved,
  [planCreated.key]: planCreated,
  [planUpdated.key]: planUpdated,
  [planDeactivated.key]: planDeactivated,
  [planActivated.key]: planActivated,
  [planDeleted.key]: planDeleted,
  [planSyncCompleted.key]: planSyncCompleted,
  [projectCreated.key]: projectCreated,
  [projectUpdated.key]: projectUpdated,
  [projectArchived.key]: projectArchived,
  [projectRestored.key]: projectRestored,
  [projectDeleted.key]: projectDeleted,
  [projectBotConnected.key]: projectBotConnected,
  [projectBotDisconnected.key]: projectBotDisconnected,
  [projectResourceCreated.key]: projectResourceCreated,
  [projectResourceLinked.key]: projectResourceLinked,
  [projectResourceUnlinked.key]: projectResourceUnlinked,
  [projectResourceDeleted.key]: projectResourceDeleted,
  [teamCreated.key]: teamCreated,
  [teamDeleted.key]: teamDeleted,
  [teamMemberInvited.key]: teamMemberInvited,
  [teamMemberJoined.key]: teamMemberJoined,
  [teamMemberRemoved.key]: teamMemberRemoved,
  [teamMemberRoleChanged.key]: teamMemberRoleChanged,
  [roleCreated.key]: roleCreated,
  [roleUpdated.key]: roleUpdated,
  [roleDeleted.key]: roleDeleted,
  [groupCreated.key]: groupCreated,
  [groupUpdated.key]: groupUpdated,
  [groupDeleted.key]: groupDeleted,
  [billingInvoiceCreated.key]: billingInvoiceCreated,
  [billingInvoicePaid.key]: billingInvoicePaid,
  [billingInvoiceOverdue.key]: billingInvoiceOverdue,
  [billingPaymentFailed.key]: billingPaymentFailed,
  [billingGracePeriodWarning.key]: billingGracePeriodWarning,
  [billingAccountLocked.key]: billingAccountLocked,
  [billingTierUpgraded.key]: billingTierUpgraded,
  [billingTierDowngraded.key]: billingTierDowngraded,
  [billingTierCancelled.key]: billingTierCancelled,
  [dropdownProjects.key]: dropdownProjects,
  [dropdownPlans.key]: dropdownPlans,
  [dropdownTeams.key]: dropdownTeams,
  [dropdownMembers.key]: dropdownMembers,
  [dropdownSubscriptions.key]: dropdownSubscriptions,
  [dropdownResources.key]: dropdownResources,
  [dropdownWebhookEndpoints.key]: dropdownWebhookEndpoints,
  [dropdownTokens.key]: dropdownTokens,
  [dropdownRoles.key]: dropdownRoles,
  [dropdownGroups.key]: dropdownGroups,
  [dropdownAccessCodes.key]: dropdownAccessCodes,
};

const creates = {
  [createProject.key]: createProject,
  [updateProject.key]: updateProject,
  [archiveProject.key]: archiveProject,
  [restoreProject.key]: restoreProject,
  [deleteProject.key]: deleteProject,
  [createPlan.key]: createPlan,
  [updatePlan.key]: updatePlan,
  [publishPlan.key]: publishPlan,
  [unpublishPlan.key]: unpublishPlan,
  [deletePlan.key]: deletePlan,
  [cancelSubscription.key]: cancelSubscription,
  [banMember.key]: banMember,
  [unbanMember.key]: unbanMember,
  [kickMember.key]: kickMember,
  [createResource.key]: createResource,
  [unlinkResource.key]: unlinkResource,
  [deleteResource.key]: deleteResource,
  [bulkGenerateAccessCodes.key]: bulkGenerateAccessCodes,
  [deleteAccessCode.key]: deleteAccessCode,
  [createWebhookEndpoint.key]: createWebhookEndpoint,
  [deleteWebhookEndpoint.key]: deleteWebhookEndpoint,
  [rotateWebhookSecret.key]: rotateWebhookSecret,
  [testWebhookEndpoint.key]: testWebhookEndpoint,
  [revokeToken.key]: revokeToken,
};

const searches = {
  [findProjectByHandle.key]: findProjectByHandle,
  [findPlanByName.key]: findPlanByName,
  [findPlanById.key]: findPlanById,
  [findSubscriberByTelegramId.key]: findSubscriberByTelegramId,
  [findMemberById.key]: findMemberById,
  [findSubscriptionById.key]: findSubscriptionById,
  [listProjects.key]: listProjects,
  [getProject.key]: getProject,
  [listPlans.key]: listPlans,
  [listSubscriptions.key]: listSubscriptions,
  [listMembers.key]: listMembers,
  [listAccessCodes.key]: listAccessCodes,
  [previewAccessCodeCost.key]: previewAccessCodeCost,
  [listResources.key]: listResources,
  [getResource.key]: getResource,
  [listPaymentMethods.key]: listPaymentMethods,
  [getPaymentMethod.key]: getPaymentMethod,
  [listWebhookEndpoints.key]: listWebhookEndpoints,
  [listWebhookDeliveries.key]: listWebhookDeliveries,
  [listTokens.key]: listTokens,
  [getToken.key]: getToken,
  [listTeams.key]: listTeams,
  [getTeam.key]: getTeam,
  [getCurrentTeam.key]: getCurrentTeam,
  [listTeamMembers.key]: listTeamMembers,
  [getTeamMember.key]: getTeamMember,
  [listRoles.key]: listRoles,
  [getRole.key]: getRole,
  [listGroups.key]: listGroups,
  [getGroup.key]: getGroup,
  [listActivity.key]: listActivity,
  [getBotStatus.key]: getBotStatus,
  [getBotLink.key]: getBotLink,
  [getPortalUrl.key]: getPortalUrl,
  [getDeepLink.key]: getDeepLink,
  [getDashboardMetrics.key]: getDashboardMetrics,
  [getEarningsReport.key]: getEarningsReport,
  [getSubscriberAnalytics.key]: getSubscriberAnalytics,
  [getTransactionBreakdown.key]: getTransactionBreakdown,
  [getPlanPerformance.key]: getPlanPerformance,
  [listTransactions.key]: listTransactions,
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
  flags: { cleanInputData: false },
};

export default app;
