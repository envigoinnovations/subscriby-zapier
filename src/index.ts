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
import subscriptionPaymentRecovered from './triggers/subscription-payment-recovered';
import subscriptionAccessSuspended from './triggers/subscription-access-suspended';
import subscriptionCancellationFeedback from './triggers/subscription-cancellation-feedback';
import subscriptionOfferTaken from './triggers/subscription-offer-taken';
import subscriptionAccessRestored from './triggers/subscription-access-restored';
import subscriptionUnpaid from './triggers/subscription-unpaid';
import subscriptionRefunded from './triggers/subscription-refunded';
import subscriptionUpgraded from './triggers/subscription-upgraded';
import subscriptionDowngraded from './triggers/subscription-downgraded';
import paymentSucceeded from './triggers/payment-succeeded';
import paymentFailed from './triggers/payment-failed';
import paymentPending from './triggers/payment-pending';
import checkoutStalled from './triggers/checkout-stalled';
import checkoutRecovered from './triggers/checkout-recovered';
import paymentRefunded from './triggers/payment-refunded';
import accessCodeGenerated from './triggers/access-code-generated';
import accessCodeRedeemed from './triggers/access-code-redeemed';
import broadcastCompleted from './triggers/broadcast-completed';
import broadcastQueued from './triggers/broadcast-queued';
import accessCodeExpired from './triggers/access-code-expired';
import memberJoined from './triggers/member-joined';
import memberTrialJoined from './triggers/member-trial-joined';
import memberBanned from './triggers/member-banned';
import memberUnbanned from './triggers/member-unbanned';
import memberKicked from './triggers/member-kicked';
import memberConverted from './triggers/member-converted';
import memberChurned from './triggers/member-churned';
import memberLeadCreated from './triggers/member-lead-created';
import memberRemoved from './triggers/member-removed';
import memberResourceAdded from './triggers/member-resource-added';
import memberResourcePending from './triggers/member-resource-pending';
import memberResourceReissued from './triggers/member-resource-reissued';
import memberAccessExtended from './triggers/member-access-extended';
import memberResourceRemoved from './triggers/member-resource-removed';
import creatorTaskOpened from './triggers/creator-task-opened';
import creatorTaskCompleted from './triggers/creator-task-completed';
import recoveryIncidentOpened from './triggers/recovery-incident-opened';
import recoveryIncidentResolved from './triggers/recovery-incident-resolved';
import recoveryOperationStarted from './triggers/recovery-operation-started';
import recoveryOperationCompleted from './triggers/recovery-operation-completed';
import recoveryOperationFailed from './triggers/recovery-operation-failed';
import recoveryOperationReverted from './triggers/recovery-operation-reverted';
import recoveryReadinessChanged from './triggers/recovery-readiness-changed';
import recoveryStandbyRegistered from './triggers/recovery-standby-registered';
import recoveryStandbyRemoved from './triggers/recovery-standby-removed';
import recoveryInstallationFailedOver from './triggers/recovery-installation-failed-over';
import recoveryResourceFailedOver from './triggers/recovery-resource-failed-over';
import recoveryResourceReplaced from './triggers/recovery-resource-replaced';
import recoveryIdentityRelinked from './triggers/recovery-identity-relinked';
import memberIdentityLinked from './triggers/member-identity-linked';
import memberIdentityUnlinked from './triggers/member-identity-unlinked';
import planCreated from './triggers/plan-created';
import planUpdated from './triggers/plan-updated';
import planDeactivated from './triggers/plan-deactivated';
import planActivated from './triggers/plan-activated';
import planDeleted from './triggers/plan-deleted';
import planSyncCompleted from './triggers/plan-sync-completed';
import planSoldOut from './triggers/plan-sold-out';
import planOrderChanged from './triggers/plan-order-changed';
import passWindowScheduled from './triggers/pass-window-scheduled';
import passWindowOpened from './triggers/pass-window-opened';
import passWindowClosed from './triggers/pass-window-closed';
import passWindowCancelled from './triggers/pass-window-cancelled';
import passHolderQueued from './triggers/pass-holder-queued';
import passHolderMoved from './triggers/pass-holder-moved';
import passHolderMissed from './triggers/pass-holder-missed';
import passHolderStranded from './triggers/pass-holder-stranded';
import passSeriesPurchased from './triggers/pass-series-purchased';
import passSeriesLegCompleted from './triggers/pass-series-leg-completed';
import passSeriesCompleted from './triggers/pass-series-completed';
import passSeriesLegAdded from './triggers/pass-series-leg-added';
import passSeriesLegSubstituted from './triggers/pass-series-leg-substituted';
import passSeriesLegDropped from './triggers/pass-series-leg-dropped';
import passSeriesSeatsExhausted from './triggers/pass-series-seats-exhausted';
import passSeriesPresaleOpened from './triggers/pass-series-presale-opened';
import couponCreated from './triggers/coupon-created';
import couponUpdated from './triggers/coupon-updated';
import couponActivated from './triggers/coupon-activated';
import couponDeactivated from './triggers/coupon-deactivated';
import couponDeleted from './triggers/coupon-deleted';
import projectResourceUpdated from './triggers/project-resource-updated';
import projectPaymentMethodUpdated from './triggers/project-payment-method-updated';
import projectPaymentMethodDeleted from './triggers/project-payment-method-deleted';
import supportConversationBlocked from './triggers/support-conversation-blocked';
import supportConversationUnblocked from './triggers/support-conversation-unblocked';
import supportCannedReplyCreated from './triggers/support-canned-reply-created';
import supportCannedReplyUpdated from './triggers/support-canned-reply-updated';
import supportCannedReplyDeleted from './triggers/support-canned-reply-deleted';
import knowledgeCreated from './triggers/knowledge-created';
import knowledgeUpdated from './triggers/knowledge-updated';
import knowledgeDeleted from './triggers/knowledge-deleted';
import projectDesignPublished from './triggers/project-design-published';
import supportSettingsUpdated from './triggers/support-settings-updated';
import couponRedeemed from './triggers/coupon-redeemed';
import couponExhausted from './triggers/coupon-exhausted';
import linkCreated from './triggers/link-created';
import linkUpdated from './triggers/link-updated';
import linkArchived from './triggers/link-archived';
import sequenceCreated from './triggers/sequence-created';
import sequenceUpdated from './triggers/sequence-updated';
import sequenceDeleted from './triggers/sequence-deleted';
import sequenceEnrolled from './triggers/sequence-enrolled';
import sequenceStepSent from './triggers/sequence-step-sent';
import sequenceConverted from './triggers/sequence-converted';
import sequenceExited from './triggers/sequence-exited';
import referralProgramUpdated from './triggers/referral-program-updated';
import referralAffiliateJoined from './triggers/referral-affiliate-joined';
import referralAffiliateApproved from './triggers/referral-affiliate-approved';
import referralAffiliateSuspended from './triggers/referral-affiliate-suspended';
import referralCaptured from './triggers/referral-captured';
import referralConverted from './triggers/referral-converted';
import referralRewardEarned from './triggers/referral-reward-earned';
import referralRewardApproved from './triggers/referral-reward-approved';
import referralRewardReversed from './triggers/referral-reward-reversed';
import referralPayoutRecorded from './triggers/referral-payout-recorded';
import partnerReferralSignedUp from './triggers/partner-referral-signed-up';
import partnerReferralConverted from './triggers/partner-referral-converted';
import partnerRewardEarned from './triggers/partner-reward-earned';
import partnerRewardApproved from './triggers/partner-reward-approved';
import partnerRewardCredited from './triggers/partner-reward-credited';
import partnerRewardReversed from './triggers/partner-reward-reversed';
import partnerPayoutRecorded from './triggers/partner-payout-recorded';
import partnerApplicationApproved from './triggers/partner-application-approved';
import partnerApplicationRejected from './triggers/partner-application-rejected';
import partnerRateChanged from './triggers/partner-rate-changed';
import copilotCreditsPurchased from './triggers/copilot-credit-purchased';
import copilotCreditsGranted from './triggers/copilot-credit-granted';
import copilotCreditsLow from './triggers/copilot-credit-low';
import copilotCreditsRefunded from './triggers/copilot-credit-refunded';
import projectCreated from './triggers/project-created';
import projectUpdated from './triggers/project-updated';
import projectArchived from './triggers/project-archived';
import projectRestored from './triggers/project-restored';
import projectDeleted from './triggers/project-deleted';
import connectorInstalled from './triggers/connector-installed';
import connectorConnected from './triggers/connector-connected';
import connectorDoctorCompleted from './triggers/connector-doctor-completed';
import connectorStatusChanged from './triggers/connector-status-changed';
import connectorSettingsUpdated from './triggers/connector-settings-updated';
import connectorDisconnected from './triggers/connector-disconnected';
import connectorOutageOpened from './triggers/connector-outage-opened';
import connectorOutageClosed from './triggers/connector-outage-closed';
import connectorOutageCompensated from './triggers/connector-outage-compensated';
import connectorUninstalled from './triggers/connector-uninstalled';
import projectResourceCreated from './triggers/project-resource-created';
import projectResourceLinked from './triggers/project-resource-linked';
import projectResourceUnlinked from './triggers/project-resource-unlinked';
import projectResourceDeleted from './triggers/project-resource-deleted';
import teamCreated from './triggers/team-created';
import teamUpdated from './triggers/team-updated';
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
import groupMembersSynced from './triggers/group-members-synced';
import groupDeleted from './triggers/group-deleted';
import billingInvoiceCreated from './triggers/billing-invoice-created';
import billingInvoicePaid from './triggers/billing-invoice-paid';
import billingInvoiceOverdue from './triggers/billing-invoice-overdue';
import billingPaymentFailed from './triggers/billing-payment-failed';
import billingTrialEnding from './triggers/billing-trial-ending';
import billingGracePeriodWarning from './triggers/billing-grace-period-warning';
import billingAccountLocked from './triggers/billing-account-locked';
import billingTierUpgraded from './triggers/billing-tier-upgraded';
import billingTierDowngraded from './triggers/billing-tier-downgraded';
import billingTierCancelled from './triggers/billing-tier-cancelled';
import dropdownProjects from './triggers/dropdown-projects';
import dropdownRecoveryOperations from './triggers/dropdown-recovery-operations';
import dropdownConnectors from './triggers/dropdown-connectors';
import dropdownConnectorInstallations from './triggers/dropdown-connector-installations';
import dropdownPlans from './triggers/dropdown-plans';
import dropdownTeams from './triggers/dropdown-teams';
import dropdownMembers from './triggers/dropdown-members';
import projectResourceStatusChanged from './triggers/project-resource-status-changed';
import supportConversationOpened from './triggers/support-conversation-opened';
import supportConversationAssigned from './triggers/support-conversation-assigned';
import supportConversationResolved from './triggers/support-conversation-resolved';
import supportConversationReopened from './triggers/support-conversation-reopened';
import supportMessageReceived from './triggers/support-message-received';
import supportMessageSent from './triggers/support-message-sent';
import dropdownSupportConversations from './triggers/dropdown-support-conversations';
import dropdownSubscriptions from './triggers/dropdown-subscriptions';
import dropdownResources from './triggers/dropdown-resources';
import dropdownResourceKinds from './triggers/dropdown-resource-kinds';
import notificationReceived from './triggers/notification-received';
import dropdownWebhookEndpoints from './triggers/dropdown-webhook-endpoints';
import dropdownTokens from './triggers/dropdown-tokens';
import dropdownRoles from './triggers/dropdown-roles';
import dropdownGroups from './triggers/dropdown-groups';
import dropdownAccessCodes from './triggers/dropdown-access-codes';

import createProject from './creates/create-project';
import syncGroupMembers from './creates/sync-group-members';
import deleteGroup from './creates/delete-group';
import updateGroup from './creates/update-group';
import createGroup from './creates/create-group';
import deleteRole from './creates/delete-role';
import updateRole from './creates/update-role';
import createRole from './creates/create-role';
import cancelTeamInvitation from './creates/cancel-team-invitation';
import removeTeamMember from './creates/remove-team-member';
import updateTeamMemberRole from './creates/update-team-member-role';
import inviteTeamMember from './creates/invite-team-member';
import deleteTeam from './creates/delete-team';
import updateTeam from './creates/update-team';
import createTeam from './creates/create-team';
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
import pauseSubscription from './creates/pause-subscription';
import reactivateSubscription from './creates/reactivate-subscription';
import unpauseSubscription from './creates/unpause-subscription';
import banMember from './creates/ban-member';
import broadcastMessage from './creates/broadcast-message';
import replySupportConversation from './creates/reply-support-conversation';
import resolveSupportConversation from './creates/resolve-support-conversation';
import assignSupportConversation from './creates/assign-support-conversation';
import unbanMember from './creates/unban-member';
import unlinkMemberIdentity from './creates/unlink-member-identity';
import kickMember from './creates/kick-member';
import createResource from './creates/create-resource';
import unlinkResource from './creates/unlink-resource';
import requestResourceLink from './creates/request-resource-link';
import deleteResource from './creates/delete-resource';
import bulkGenerateAccessCodes from './creates/bulk-generate-access-codes';
import deleteAccessCode from './creates/delete-access-code';
import createWebhookEndpoint from './creates/create-webhook-endpoint';
import deleteWebhookEndpoint from './creates/delete-webhook-endpoint';
import rotateWebhookSecret from './creates/rotate-webhook-secret';
import testWebhookEndpoint from './creates/test-webhook-endpoint';
import revokeToken from './creates/revoke-token';
import createCoupon from './creates/create-coupon';
import updateCoupon from './creates/update-coupon';
import deleteCoupon from './creates/delete-coupon';
import activateCoupon from './creates/activate-coupon';
import deactivateCoupon from './creates/deactivate-coupon';
import createLink from './creates/create-link';
import updateLink from './creates/update-link';
import archiveLink from './creates/archive-link';
import updateRetentionSettings from './creates/update-retention-settings';
import createSequence from './creates/create-sequence';
import updateSequence from './creates/update-sequence';
import deleteSequence from './creates/delete-sequence';
import updateReferralProgram from './creates/update-referral-program';
import activateReferralProgram from './creates/activate-referral-program';
import deactivateReferralProgram from './creates/deactivate-referral-program';
import deleteReferralProgram from './creates/delete-referral-program';
import addReferralAffiliate from './creates/add-referral-affiliate';
import approveReferralAffiliate from './creates/approve-referral-affiliate';
import suspendReferralAffiliate from './creates/suspend-referral-affiliate';
import recordReferralPayout from './creates/record-referral-payout';
import updatePartnerPayoutDetails from './creates/update-partner-payout-details';
import acceptPartnerTerms from './creates/accept-partner-terms';
import reopenSupportConversation from './creates/reopen-support-conversation';
import blockSupportContact from './creates/block-support-contact';
import unblockSupportContact from './creates/unblock-support-contact';
import createCannedReply from './creates/create-canned-reply';
import updateCannedReply from './creates/update-canned-reply';
import deleteCannedReply from './creates/delete-canned-reply';
import updateSupportSettings from './creates/update-support-settings';
import createKnowledgeEntry from './creates/create-knowledge-entry';
import updateKnowledgeEntry from './creates/update-knowledge-entry';
import deleteKnowledgeEntry from './creates/delete-knowledge-entry';
import updatePortalDesign from './creates/update-portal-design';
import publishPortalDesign from './creates/publish-portal-design';
import discardPortalDesignDraft from './creates/discard-portal-design-draft';
import updateCopilotCreditsSettings from './creates/update-copilot-credits-settings';
import updateResource from './creates/update-resource';
import activateResource from './creates/activate-resource';
import deactivateResource from './creates/deactivate-resource';
import installConnector from './creates/install-connector';
import verifyConnectorInstallation from './creates/verify-connector-installation';
import runConnectorDoctor from './creates/run-connector-doctor';
import restoreConnectorAccess from './creates/restore-connector-access';
import updateConnectorInstallationSettings from './creates/update-connector-installation-settings';
import disconnectConnector from './creates/disconnect-connector';
import uninstallConnector from './creates/uninstall-connector';
import createPassWindow from './creates/create-pass-window';
import cancelPassWindow from './creates/cancel-pass-window';
import remindPassWindowQueue from './creates/remind-pass-window-queue';
import remindPassHolder from './creates/remind-pass-holder';
import reissueSubscriptionGrants from './creates/reissue-subscription-grants';
import completeCreatorTask from './creates/complete-creator-task';
import markNotificationRead from './creates/mark-notification-read';
import markAllNotificationsRead from './creates/mark-all-notifications-read';
import updateRecoverySettings from './creates/update-recovery-settings';
import removeStandbyInstallation from './creates/remove-standby-installation';
import requestResourceStandby from './creates/request-resource-standby';
import withdrawResourceStandbyRequest from './creates/withdraw-resource-standby-request';
import useResourceStandby from './creates/use-resource-standby';
import removeResourceStandby from './creates/remove-resource-standby';
import setResourceStandbyMirror from './creates/set-resource-standby-mirror';
import requestResourceReplacement from './creates/request-resource-replacement';
import withdrawResourceReplacementRequest from './creates/withdraw-resource-replacement-request';
import revertRecoveryOperation from './creates/revert-recovery-operation';
import nudgePendingReadmissions from './creates/nudge-pending-readmissions';
import notifyMembersOfRecovery from './creates/notify-members-of-recovery';
import startNextSeason from './creates/start-next-season';
import activatePaymentMethod from './creates/activate-payment-method';
import deactivatePaymentMethod from './creates/deactivate-payment-method';
import syncPaymentMethodPlans from './creates/sync-payment-method-plans';
import deletePaymentMethod from './creates/delete-payment-method';
import pauseWebhookEndpoint from './creates/pause-webhook-endpoint';
import resumeWebhookEndpoint from './creates/resume-webhook-endpoint';
import retryWebhookDelivery from './creates/retry-webhook-delivery';
import retryDeadWebhookDeliveries from './creates/retry-dead-webhook-deliveries';

import findProjectByHandle from './searches/find-project-by-handle';
import findPlanByName from './searches/find-plan-by-name';
import findPlanById from './searches/find-plan-by-id';
import findMemberByIdentity from './searches/find-member-by-identity';
import findMemberById from './searches/find-member-by-id';
import findSubscriptionById from './searches/find-subscription-by-id';
import listSubscriptionGrants from './searches/list-subscription-grants';
import listCreatorTasks from './searches/list-creator-tasks';
import getRecoveryReadiness from './searches/get-recovery-readiness';
import listRecoveryIncidents from './searches/list-recovery-incidents';
import listRecoveryOperations from './searches/list-recovery-operations';
import getRecoveryRollCall from './searches/get-recovery-roll-call';
import getRecoveryAllowances from './searches/get-recovery-allowances';
import getRecoverySettings from './searches/get-recovery-settings';
import getResourceStandby from './searches/get-resource-standby';
import listConnectors from './searches/list-connectors';
import getConnector from './searches/get-connector';
import listConnectorInstallations from './searches/list-connector-installations';
import getConnectorInstallation from './searches/get-connector-installation';
import getConnectorUninstallPreview from './searches/get-connector-uninstall-preview';
import listProjects from './searches/list-projects';
import getProject from './searches/get-project';
import listPlans from './searches/list-plans';
import findPassWindows from './searches/find-pass-windows';
import listSubscriptions from './searches/list-subscriptions';
import listMembers from './searches/list-members';
import listMemberIdentities from './searches/list-member-identities';
import listSupportConversations from './searches/list-support-conversations';
import findSupportConversation from './searches/find-support-conversation';
import listSupportMessages from './searches/list-support-messages';
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
import getMe from './searches/get-me';
import listNotifications from './searches/list-notifications';
import listTeamMembers from './searches/list-team-members';
import getTeamMember from './searches/get-team-member';
import listRoles from './searches/list-roles';
import getRole from './searches/get-role';
import listGroups from './searches/list-groups';
import getGroup from './searches/get-group';
import listActivity from './searches/list-activity';
import getPortalUrl from './searches/get-portal-url';
import getDeepLink from './searches/get-deep-link';
import getDashboardMetrics from './searches/get-dashboard-metrics';
import getEarningsReport from './searches/get-earnings-report';
import getConnectorAnalytics from './searches/get-connector-analytics';
import getRevenueComposition from './searches/get-revenue-composition';
import getSubscriberAnalytics from './searches/get-subscriber-analytics';
import getTransactionBreakdown from './searches/get-transaction-breakdown';
import getPlanPerformance from './searches/get-plan-performance';
import listTransactions from './searches/list-transactions';
import findCoupons from './searches/find-coupons';
import getCoupon from './searches/get-coupon';
import findLinks from './searches/find-links';
import getLink from './searches/get-link';
import getLinkFunnel from './searches/get-link-funnel';
import getRetentionSettings from './searches/get-retention-settings';
import getRetentionStats from './searches/get-retention-stats';
import findCancellationFeedback from './searches/find-cancellation-feedback';
import findRetentionActivity from './searches/find-retention-activity';
import findCheckouts from './searches/find-checkouts';
import findSequences from './searches/find-sequences';
import getSequence from './searches/get-sequence';
import findSequenceEnrollments from './searches/find-sequence-enrollments';
import getReferralProgram from './searches/get-referral-program';
import findReferralAffiliates from './searches/find-referral-affiliates';
import getReferralAffiliate from './searches/get-referral-affiliate';
import findReferrals from './searches/find-referrals';
import getReferral from './searches/get-referral';
import findReferralRewards from './searches/find-referral-rewards';
import findReferralPayouts from './searches/find-referral-payouts';
import getPartnerProgram from './searches/get-partner-program';
import findPartnerReferrals from './searches/find-partner-referrals';
import getPartnerReferral from './searches/get-partner-referral';
import findPartnerRewards from './searches/find-partner-rewards';
import findPartnerPayouts from './searches/find-partner-payouts';
import findCannedReplies from './searches/find-canned-replies';
import getCannedReply from './searches/get-canned-reply';
import getSupportSettings from './searches/get-support-settings';
import findKnowledgeEntries from './searches/find-knowledge-entries';
import getKnowledgeEntry from './searches/get-knowledge-entry';
import getPortalDesign from './searches/get-portal-design';
import getCopilotCredits from './searches/get-copilot-credits';
import findCopilotCreditsStatement from './searches/find-copilot-credits-statement';
import getPassWindow from './searches/get-pass-window';
import getWebhookEndpoint from './searches/get-webhook-endpoint';
import getWebhookDelivery from './searches/get-webhook-delivery';

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
  [subscriptionPaymentRecovered.key]: subscriptionPaymentRecovered,
  [subscriptionAccessSuspended.key]: subscriptionAccessSuspended,
  [subscriptionCancellationFeedback.key]: subscriptionCancellationFeedback,
  [subscriptionOfferTaken.key]: subscriptionOfferTaken,
  [subscriptionAccessRestored.key]: subscriptionAccessRestored,
  [subscriptionUnpaid.key]: subscriptionUnpaid,
  [subscriptionRefunded.key]: subscriptionRefunded,
  [subscriptionUpgraded.key]: subscriptionUpgraded,
  [subscriptionDowngraded.key]: subscriptionDowngraded,
  [paymentSucceeded.key]: paymentSucceeded,
  [paymentFailed.key]: paymentFailed,
  [paymentPending.key]: paymentPending,
  [checkoutStalled.key]: checkoutStalled,
  [checkoutRecovered.key]: checkoutRecovered,
  [paymentRefunded.key]: paymentRefunded,
  [accessCodeGenerated.key]: accessCodeGenerated,
  [accessCodeRedeemed.key]: accessCodeRedeemed,
  [broadcastQueued.key]: broadcastQueued,
  [broadcastCompleted.key]: broadcastCompleted,
  [accessCodeExpired.key]: accessCodeExpired,
  [memberJoined.key]: memberJoined,
  [memberTrialJoined.key]: memberTrialJoined,
  [memberBanned.key]: memberBanned,
  [memberUnbanned.key]: memberUnbanned,
  [memberKicked.key]: memberKicked,
  [memberConverted.key]: memberConverted,
  [memberChurned.key]: memberChurned,
  [memberLeadCreated.key]: memberLeadCreated,
  [memberRemoved.key]: memberRemoved,
  [memberResourceAdded.key]: memberResourceAdded,
  [memberResourcePending.key]: memberResourcePending,
  [memberResourceReissued.key]: memberResourceReissued,
  [memberAccessExtended.key]: memberAccessExtended,
  [memberResourceRemoved.key]: memberResourceRemoved,
  [creatorTaskOpened.key]: creatorTaskOpened,
  [creatorTaskCompleted.key]: creatorTaskCompleted,
  [recoveryIncidentOpened.key]: recoveryIncidentOpened,
  [recoveryIncidentResolved.key]: recoveryIncidentResolved,
  [recoveryOperationStarted.key]: recoveryOperationStarted,
  [recoveryOperationCompleted.key]: recoveryOperationCompleted,
  [recoveryOperationFailed.key]: recoveryOperationFailed,
  [recoveryOperationReverted.key]: recoveryOperationReverted,
  [recoveryReadinessChanged.key]: recoveryReadinessChanged,
  [recoveryStandbyRegistered.key]: recoveryStandbyRegistered,
  [recoveryStandbyRemoved.key]: recoveryStandbyRemoved,
  [recoveryInstallationFailedOver.key]: recoveryInstallationFailedOver,
  [recoveryResourceFailedOver.key]: recoveryResourceFailedOver,
  [recoveryResourceReplaced.key]: recoveryResourceReplaced,
  [recoveryIdentityRelinked.key]: recoveryIdentityRelinked,
  [memberIdentityLinked.key]: memberIdentityLinked,
  [memberIdentityUnlinked.key]: memberIdentityUnlinked,
  [planCreated.key]: planCreated,
  [planUpdated.key]: planUpdated,
  [planDeactivated.key]: planDeactivated,
  [planActivated.key]: planActivated,
  [planDeleted.key]: planDeleted,
  [planSyncCompleted.key]: planSyncCompleted,
  [passWindowScheduled.key]: passWindowScheduled,
  [passWindowOpened.key]: passWindowOpened,
  [passWindowClosed.key]: passWindowClosed,
  [passWindowCancelled.key]: passWindowCancelled,
  [passHolderQueued.key]: passHolderQueued,
  [passHolderMoved.key]: passHolderMoved,
  [passHolderMissed.key]: passHolderMissed,
  [passHolderStranded.key]: passHolderStranded,
  [passSeriesPurchased.key]: passSeriesPurchased,
  [passSeriesLegCompleted.key]: passSeriesLegCompleted,
  [passSeriesCompleted.key]: passSeriesCompleted,
  [passSeriesLegAdded.key]: passSeriesLegAdded,
  [passSeriesLegSubstituted.key]: passSeriesLegSubstituted,
  [passSeriesLegDropped.key]: passSeriesLegDropped,
  [passSeriesSeatsExhausted.key]: passSeriesSeatsExhausted,
  [passSeriesPresaleOpened.key]: passSeriesPresaleOpened,
  [couponCreated.key]: couponCreated,
  [linkCreated.key]: linkCreated,
  [linkUpdated.key]: linkUpdated,
  [linkArchived.key]: linkArchived,
  [sequenceCreated.key]: sequenceCreated,
  [sequenceUpdated.key]: sequenceUpdated,
  [sequenceDeleted.key]: sequenceDeleted,
  [sequenceEnrolled.key]: sequenceEnrolled,
  [sequenceStepSent.key]: sequenceStepSent,
  [sequenceConverted.key]: sequenceConverted,
  [sequenceExited.key]: sequenceExited,
  [couponUpdated.key]: couponUpdated,
  [couponActivated.key]: couponActivated,
  [couponDeactivated.key]: couponDeactivated,
  [couponDeleted.key]: couponDeleted,
  [projectResourceUpdated.key]: projectResourceUpdated,
  [projectPaymentMethodUpdated.key]: projectPaymentMethodUpdated,
  [projectPaymentMethodDeleted.key]: projectPaymentMethodDeleted,
  [supportConversationBlocked.key]: supportConversationBlocked,
  [supportConversationUnblocked.key]: supportConversationUnblocked,
  [supportCannedReplyCreated.key]: supportCannedReplyCreated,
  [supportCannedReplyUpdated.key]: supportCannedReplyUpdated,
  [supportCannedReplyDeleted.key]: supportCannedReplyDeleted,
  [knowledgeCreated.key]: knowledgeCreated,
  [knowledgeUpdated.key]: knowledgeUpdated,
  [knowledgeDeleted.key]: knowledgeDeleted,
  [supportSettingsUpdated.key]: supportSettingsUpdated,
  [couponRedeemed.key]: couponRedeemed,
  [couponExhausted.key]: couponExhausted,
  [referralProgramUpdated.key]: referralProgramUpdated,
  [referralAffiliateJoined.key]: referralAffiliateJoined,
  [referralAffiliateApproved.key]: referralAffiliateApproved,
  [referralAffiliateSuspended.key]: referralAffiliateSuspended,
  [referralCaptured.key]: referralCaptured,
  [referralConverted.key]: referralConverted,
  [referralRewardEarned.key]: referralRewardEarned,
  [referralRewardApproved.key]: referralRewardApproved,
  [referralRewardReversed.key]: referralRewardReversed,
  [referralPayoutRecorded.key]: referralPayoutRecorded,
  [partnerReferralSignedUp.key]: partnerReferralSignedUp,
  [partnerReferralConverted.key]: partnerReferralConverted,
  [partnerRewardEarned.key]: partnerRewardEarned,
  [partnerRewardApproved.key]: partnerRewardApproved,
  [partnerRewardCredited.key]: partnerRewardCredited,
  [partnerRewardReversed.key]: partnerRewardReversed,
  [partnerPayoutRecorded.key]: partnerPayoutRecorded,
  [partnerApplicationApproved.key]: partnerApplicationApproved,
  [partnerApplicationRejected.key]: partnerApplicationRejected,
  [partnerRateChanged.key]: partnerRateChanged,
  [copilotCreditsPurchased.key]: copilotCreditsPurchased,
  [copilotCreditsGranted.key]: copilotCreditsGranted,
  [copilotCreditsLow.key]: copilotCreditsLow,
  [copilotCreditsRefunded.key]: copilotCreditsRefunded,
  [projectCreated.key]: projectCreated,
  [projectUpdated.key]: projectUpdated,
  [projectDesignPublished.key]: projectDesignPublished,
  [projectArchived.key]: projectArchived,
  [projectRestored.key]: projectRestored,
  [projectDeleted.key]: projectDeleted,
  [connectorInstalled.key]: connectorInstalled,
  [connectorConnected.key]: connectorConnected,
  [connectorDoctorCompleted.key]: connectorDoctorCompleted,
  [connectorStatusChanged.key]: connectorStatusChanged,
  [connectorSettingsUpdated.key]: connectorSettingsUpdated,
  [connectorDisconnected.key]: connectorDisconnected,
  [connectorOutageOpened.key]: connectorOutageOpened,
  [connectorOutageClosed.key]: connectorOutageClosed,
  [connectorOutageCompensated.key]: connectorOutageCompensated,
  [connectorUninstalled.key]: connectorUninstalled,
  [projectResourceCreated.key]: projectResourceCreated,
  [projectResourceLinked.key]: projectResourceLinked,
  [projectResourceUnlinked.key]: projectResourceUnlinked,
  [projectResourceDeleted.key]: projectResourceDeleted,
  [teamCreated.key]: teamCreated,
  [teamUpdated.key]: teamUpdated,
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
  [groupMembersSynced.key]: groupMembersSynced,
  [groupDeleted.key]: groupDeleted,
  [billingInvoiceCreated.key]: billingInvoiceCreated,
  [billingInvoicePaid.key]: billingInvoicePaid,
  [billingInvoiceOverdue.key]: billingInvoiceOverdue,
  [billingPaymentFailed.key]: billingPaymentFailed,
  [billingTrialEnding.key]: billingTrialEnding,
  [billingGracePeriodWarning.key]: billingGracePeriodWarning,
  [billingAccountLocked.key]: billingAccountLocked,
  [billingTierUpgraded.key]: billingTierUpgraded,
  [billingTierDowngraded.key]: billingTierDowngraded,
  [billingTierCancelled.key]: billingTierCancelled,
  [dropdownProjects.key]: dropdownProjects,
  [dropdownRecoveryOperations.key]: dropdownRecoveryOperations,
  [dropdownConnectors.key]: dropdownConnectors,
  [dropdownConnectorInstallations.key]: dropdownConnectorInstallations,
  [dropdownPlans.key]: dropdownPlans,
  [dropdownTeams.key]: dropdownTeams,
  [dropdownMembers.key]: dropdownMembers,
  [projectResourceStatusChanged.key]: projectResourceStatusChanged,
  [planSoldOut.key]: planSoldOut,
  [planOrderChanged.key]: planOrderChanged,
  [supportConversationOpened.key]: supportConversationOpened,
  [supportConversationAssigned.key]: supportConversationAssigned,
  [supportConversationResolved.key]: supportConversationResolved,
  [supportConversationReopened.key]: supportConversationReopened,
  [supportMessageReceived.key]: supportMessageReceived,
  [supportMessageSent.key]: supportMessageSent,
  [dropdownSupportConversations.key]: dropdownSupportConversations,
  [dropdownSubscriptions.key]: dropdownSubscriptions,
  [dropdownResources.key]: dropdownResources,
  [dropdownResourceKinds.key]: dropdownResourceKinds,
  [notificationReceived.key]: notificationReceived,
  [dropdownWebhookEndpoints.key]: dropdownWebhookEndpoints,
  [dropdownTokens.key]: dropdownTokens,
  [dropdownRoles.key]: dropdownRoles,
  [dropdownGroups.key]: dropdownGroups,
  [dropdownAccessCodes.key]: dropdownAccessCodes,
};

const creates = {
  [syncGroupMembers.key]: syncGroupMembers,
  [deleteGroup.key]: deleteGroup,
  [updateGroup.key]: updateGroup,
  [createGroup.key]: createGroup,
  [deleteRole.key]: deleteRole,
  [updateRole.key]: updateRole,
  [createRole.key]: createRole,
  [cancelTeamInvitation.key]: cancelTeamInvitation,
  [removeTeamMember.key]: removeTeamMember,
  [updateTeamMemberRole.key]: updateTeamMemberRole,
  [inviteTeamMember.key]: inviteTeamMember,
  [deleteTeam.key]: deleteTeam,
  [updateTeam.key]: updateTeam,
  [createTeam.key]: createTeam,
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
  [reactivateSubscription.key]: reactivateSubscription,
  [unpauseSubscription.key]: unpauseSubscription,
  [pauseSubscription.key]: pauseSubscription,
  [banMember.key]: banMember,
  [broadcastMessage.key]: broadcastMessage,
  [replySupportConversation.key]: replySupportConversation,
  [resolveSupportConversation.key]: resolveSupportConversation,
  [assignSupportConversation.key]: assignSupportConversation,
  [unbanMember.key]: unbanMember,
  [unlinkMemberIdentity.key]: unlinkMemberIdentity,
  [kickMember.key]: kickMember,
  [createResource.key]: createResource,
  [unlinkResource.key]: unlinkResource,
  [requestResourceLink.key]: requestResourceLink,
  [deleteResource.key]: deleteResource,
  [bulkGenerateAccessCodes.key]: bulkGenerateAccessCodes,
  [deleteAccessCode.key]: deleteAccessCode,
  [createWebhookEndpoint.key]: createWebhookEndpoint,
  [deleteWebhookEndpoint.key]: deleteWebhookEndpoint,
  [rotateWebhookSecret.key]: rotateWebhookSecret,
  [testWebhookEndpoint.key]: testWebhookEndpoint,
  [revokeToken.key]: revokeToken,
  [createCoupon.key]: createCoupon,
  [createLink.key]: createLink,
  [updateLink.key]: updateLink,
  [archiveLink.key]: archiveLink,
  [updateRetentionSettings.key]: updateRetentionSettings,
  [createSequence.key]: createSequence,
  [updateSequence.key]: updateSequence,
  [deleteSequence.key]: deleteSequence,
  [updateCoupon.key]: updateCoupon,
  [deleteCoupon.key]: deleteCoupon,
  [activateCoupon.key]: activateCoupon,
  [deactivateCoupon.key]: deactivateCoupon,
  [updateReferralProgram.key]: updateReferralProgram,
  [activateReferralProgram.key]: activateReferralProgram,
  [deactivateReferralProgram.key]: deactivateReferralProgram,
  [deleteReferralProgram.key]: deleteReferralProgram,
  [addReferralAffiliate.key]: addReferralAffiliate,
  [approveReferralAffiliate.key]: approveReferralAffiliate,
  [suspendReferralAffiliate.key]: suspendReferralAffiliate,
  [recordReferralPayout.key]: recordReferralPayout,
  [updatePartnerPayoutDetails.key]: updatePartnerPayoutDetails,
  [acceptPartnerTerms.key]: acceptPartnerTerms,
  [reopenSupportConversation.key]: reopenSupportConversation,
  [blockSupportContact.key]: blockSupportContact,
  [unblockSupportContact.key]: unblockSupportContact,
  [createCannedReply.key]: createCannedReply,
  [updateCannedReply.key]: updateCannedReply,
  [deleteCannedReply.key]: deleteCannedReply,
  [updateSupportSettings.key]: updateSupportSettings,
  [createKnowledgeEntry.key]: createKnowledgeEntry,
  [updateKnowledgeEntry.key]: updateKnowledgeEntry,
  [deleteKnowledgeEntry.key]: deleteKnowledgeEntry,
  [updatePortalDesign.key]: updatePortalDesign,
  [publishPortalDesign.key]: publishPortalDesign,
  [discardPortalDesignDraft.key]: discardPortalDesignDraft,
  [updateCopilotCreditsSettings.key]: updateCopilotCreditsSettings,
  [updateResource.key]: updateResource,
  [activateResource.key]: activateResource,
  [deactivateResource.key]: deactivateResource,
  [installConnector.key]: installConnector,
  [verifyConnectorInstallation.key]: verifyConnectorInstallation,
  [runConnectorDoctor.key]: runConnectorDoctor,
  [restoreConnectorAccess.key]: restoreConnectorAccess,
  [updateConnectorInstallationSettings.key]: updateConnectorInstallationSettings,
  [disconnectConnector.key]: disconnectConnector,
  [uninstallConnector.key]: uninstallConnector,
  [createPassWindow.key]: createPassWindow,
  [cancelPassWindow.key]: cancelPassWindow,
  [remindPassWindowQueue.key]: remindPassWindowQueue,
  [remindPassHolder.key]: remindPassHolder,
  [reissueSubscriptionGrants.key]: reissueSubscriptionGrants,
  [completeCreatorTask.key]: completeCreatorTask,
  [markNotificationRead.key]: markNotificationRead,
  [markAllNotificationsRead.key]: markAllNotificationsRead,
  [updateRecoverySettings.key]: updateRecoverySettings,
  [removeStandbyInstallation.key]: removeStandbyInstallation,
  [requestResourceStandby.key]: requestResourceStandby,
  [withdrawResourceStandbyRequest.key]: withdrawResourceStandbyRequest,
  [useResourceStandby.key]: useResourceStandby,
  [removeResourceStandby.key]: removeResourceStandby,
  [setResourceStandbyMirror.key]: setResourceStandbyMirror,
  [requestResourceReplacement.key]: requestResourceReplacement,
  [withdrawResourceReplacementRequest.key]: withdrawResourceReplacementRequest,
  [revertRecoveryOperation.key]: revertRecoveryOperation,
  [nudgePendingReadmissions.key]: nudgePendingReadmissions,
  [notifyMembersOfRecovery.key]: notifyMembersOfRecovery,
  [startNextSeason.key]: startNextSeason,
  [activatePaymentMethod.key]: activatePaymentMethod,
  [deactivatePaymentMethod.key]: deactivatePaymentMethod,
  [syncPaymentMethodPlans.key]: syncPaymentMethodPlans,
  [deletePaymentMethod.key]: deletePaymentMethod,
  [pauseWebhookEndpoint.key]: pauseWebhookEndpoint,
  [resumeWebhookEndpoint.key]: resumeWebhookEndpoint,
  [retryWebhookDelivery.key]: retryWebhookDelivery,
  [retryDeadWebhookDeliveries.key]: retryDeadWebhookDeliveries,
};

const searches = {
  [findProjectByHandle.key]: findProjectByHandle,
  [findPlanByName.key]: findPlanByName,
  [findPlanById.key]: findPlanById,
  [findMemberByIdentity.key]: findMemberByIdentity,
  [findMemberById.key]: findMemberById,
  [findSubscriptionById.key]: findSubscriptionById,
  [listSubscriptionGrants.key]: listSubscriptionGrants,
  [listCreatorTasks.key]: listCreatorTasks,
  [getRecoveryReadiness.key]: getRecoveryReadiness,
  [listRecoveryIncidents.key]: listRecoveryIncidents,
  [listRecoveryOperations.key]: listRecoveryOperations,
  [getRecoveryRollCall.key]: getRecoveryRollCall,
  [getRecoveryAllowances.key]: getRecoveryAllowances,
  [getRecoverySettings.key]: getRecoverySettings,
  [getResourceStandby.key]: getResourceStandby,
  [listConnectors.key]: listConnectors,
  [getConnector.key]: getConnector,
  [listConnectorInstallations.key]: listConnectorInstallations,
  [getConnectorInstallation.key]: getConnectorInstallation,
  [getConnectorUninstallPreview.key]: getConnectorUninstallPreview,
  [listProjects.key]: listProjects,
  [getProject.key]: getProject,
  [listPlans.key]: listPlans,
  [findPassWindows.key]: findPassWindows,
  [listSubscriptions.key]: listSubscriptions,
  [listMembers.key]: listMembers,
  [listMemberIdentities.key]: listMemberIdentities,
  [listSupportConversations.key]: listSupportConversations,
  [findSupportConversation.key]: findSupportConversation,
  [listSupportMessages.key]: listSupportMessages,
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
  [getMe.key]: getMe,
  [listNotifications.key]: listNotifications,
  [listTeamMembers.key]: listTeamMembers,
  [getTeamMember.key]: getTeamMember,
  [listRoles.key]: listRoles,
  [getRole.key]: getRole,
  [listGroups.key]: listGroups,
  [getGroup.key]: getGroup,
  [listActivity.key]: listActivity,
  [getPortalUrl.key]: getPortalUrl,
  [getDeepLink.key]: getDeepLink,
  [getDashboardMetrics.key]: getDashboardMetrics,
  [getEarningsReport.key]: getEarningsReport,
  [getConnectorAnalytics.key]: getConnectorAnalytics,
  [getRevenueComposition.key]: getRevenueComposition,
  [getSubscriberAnalytics.key]: getSubscriberAnalytics,
  [getTransactionBreakdown.key]: getTransactionBreakdown,
  [getPlanPerformance.key]: getPlanPerformance,
  [listTransactions.key]: listTransactions,
  [findCoupons.key]: findCoupons,
  [getCoupon.key]: getCoupon,
  [findLinks.key]: findLinks,
  [getLink.key]: getLink,
  [getLinkFunnel.key]: getLinkFunnel,
  [getRetentionSettings.key]: getRetentionSettings,
  [getRetentionStats.key]: getRetentionStats,
  [findCancellationFeedback.key]: findCancellationFeedback,
  [findRetentionActivity.key]: findRetentionActivity,
  [findCheckouts.key]: findCheckouts,
  [findSequences.key]: findSequences,
  [getSequence.key]: getSequence,
  [findSequenceEnrollments.key]: findSequenceEnrollments,
  [getReferralProgram.key]: getReferralProgram,
  [findReferralAffiliates.key]: findReferralAffiliates,
  [getReferralAffiliate.key]: getReferralAffiliate,
  [findReferrals.key]: findReferrals,
  [getReferral.key]: getReferral,
  [findReferralRewards.key]: findReferralRewards,
  [findReferralPayouts.key]: findReferralPayouts,
  [getPartnerProgram.key]: getPartnerProgram,
  [findPartnerReferrals.key]: findPartnerReferrals,
  [getPartnerReferral.key]: getPartnerReferral,
  [findPartnerRewards.key]: findPartnerRewards,
  [findPartnerPayouts.key]: findPartnerPayouts,
  [findCannedReplies.key]: findCannedReplies,
  [getCannedReply.key]: getCannedReply,
  [getSupportSettings.key]: getSupportSettings,
  [findKnowledgeEntries.key]: findKnowledgeEntries,
  [getKnowledgeEntry.key]: getKnowledgeEntry,
  [getPortalDesign.key]: getPortalDesign,
  [getCopilotCredits.key]: getCopilotCredits,
  [findCopilotCreditsStatement.key]: findCopilotCreditsStatement,
  [getPassWindow.key]: getPassWindow,
  [getWebhookEndpoint.key]: getWebhookEndpoint,
  [getWebhookDelivery.key]: getWebhookDelivery,
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
