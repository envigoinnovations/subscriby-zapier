import { Bundle, ZObject } from "zapier-platform-core";

/**
 * The subset of Zapier's field schema these helpers use.
 *
 * Declared locally because `PlainInputField` is not exported from the package's
 * public entry point, and without an annotation TypeScript widens every
 * `type: "string"` literal to `string`, which the Create/Search types reject.
 */
export type PlanFieldType =
  | "string"
  | "text"
  | "integer"
  | "number"
  | "boolean"
  | "datetime";

export interface PlanInputField {
  key: string;
  label?: string;
  type?: PlanFieldType;
  required?: boolean;
  list?: boolean;
  default?: string;
  helpText?: string;
  choices?: Record<string, string>;
  altersDynamicFields?: boolean;
  children?: PlanInputField[];
}

/**
 * The three shapes a Subscriby plan can take.
 *
 * The API is a discriminated union: `kind` names exactly one nested object that
 * accompanies it, and sending a block that does not match the kind is refused.
 * These fields mirror that, so what a Zap builds is what the API accepts.
 */
export const PLAN_KIND_FIELD: PlanInputField = {
  key: "kind",
  label: "Plan Kind",
  type: "string",
  required: true,
  default: "subscription",
  altersDynamicFields: true,
  choices: {
    subscription: "Recurring Subscription — access starts at payment, renews on a cycle",
    pass: "Time-Limited Pass — one dated access window per purchase",
    pass_series: "Pass Series — a season ticket over many of your pass plans' windows",
  },
  helpText:
    "Decides which fields appear below. A pass sells one scheduled window; a series sells a slate of windows that already exist on your pass plans.",
};

/**
 * Fields every kind carries.
 *
 * `resources` is required on every kind except a series, whose own resources are
 * an optional lounge — each window in a series grants that window's plan's
 * channels, so a series with none still delivers what was sold.
 */
export const sharedPlanFields = (kind: string, required: boolean): PlanInputField[] => [
  {
    key: "name",
    label: "Name",
    type: "string",
    required,
    helpText: "5-255 chars; unique per project.",
  },
  {
    key: "currency_id",
    label: "Currency ID",
    type: "string",
    required,
    helpText:
      "UUID from /v1/currencies. Must be supported by an active payment method on the project.",
  },
  {
    key: "price",
    label: "Price",
    type: "number",
    required,
    helpText:
      kind === "pass_series"
        ? "What the WHOLE series costs. The buyer pays this once and every pass on the slate is included."
        : kind === "pass"
          ? "What ONE access window costs. A pass is bought outright for its window; nothing renews."
          : "Decimal, min 0.",
  },
  {
    key: "resources",
    label: "Resource IDs",
    type: "string",
    list: true,
    required: required && kind !== "pass_series",
    helpText:
      kind === "pass_series"
        ? "OPTIONAL on a series. Anything linked here is a lounge the holder keeps for the whole span — each pass in the series already grants its own plan's resources."
        : "One or more project_resource UUIDs. A plan with no linked resource cannot be redeemed.",
  },
  {
    key: "description",
    label: "Description",
    type: "text",
    required: false,
    helpText: "Max 1000 chars; HTML is filtered server-side.",
  },
  {
    key: "active",
    label: "Active",
    type: "boolean",
    required: false,
    helpText: "Defaults to true. Set false to create as draft.",
  },
  {
    key: "newcomers_only",
    label: "Newcomers Only",
    type: "boolean",
    required: false,
    helpText:
      "Only users with no prior subscription on this project can purchase. Mutually exclusive with Customers Only and Churned Only.",
  },
  {
    key: "customers_only",
    label: "Customers Only",
    type: "boolean",
    required: false,
    helpText:
      "Only users with at least one prior subscription can purchase. Mutually exclusive with Newcomers Only and Churned Only.",
  },
  {
    key: "churned_only",
    label: "Churned Only",
    type: "boolean",
    required: false,
    helpText:
      "Only users whose last subscription has ended can purchase. Mutually exclusive with Newcomers Only and Customers Only.",
  },
  {
    key: "single_use",
    label: "Single-Use Purchase",
    type: "boolean",
    required: false,
    helpText: "Subscribers can only purchase this plan once.",
  },
  {
    key: "access_codes_only",
    label: "Access Codes Only",
    type: "boolean",
    required: false,
    helpText: "Plan can only be redeemed via an access code.",
  },
];

/**
 * Cycle, trial and renewal — only on an ordinary subscription.
 */
const billingFields = (required: boolean): PlanInputField[] => [
  {
    key: "billing_cycle",
    label: "Billing Cycle",
    type: "string",
    required,
    choices: {
      day: "Day",
      week: "Week",
      month: "Month",
      year: "Year",
      lifetime: "Lifetime",
    },
  },
  {
    key: "billing_cycle_count",
    label: "Cycle Count",
    type: "integer",
    required,
    default: "1",
    helpText: "1-99. Must be 1 when Billing Cycle is Lifetime.",
  },
  {
    key: "recurring",
    label: "Recurring",
    type: "boolean",
    required: false,
    helpText: "Defaults to true. Crypto / platform currencies require this to be false.",
  },
  {
    key: "disabled_renewal",
    label: "Disabled Renewal",
    type: "boolean",
    required: false,
    helpText: "Let subscribers use the plan once but not auto-renew.",
  },
  { key: "trial_days", label: "Trial Days", type: "integer", required: false, helpText: "0-365." },
  {
    key: "trial_cardless",
    label: "Cardless Trial",
    type: "boolean",
    required: false,
    helpText: "Let subscribers start a trial without a payment method on file.",
  },
];

/**
 * A pass plan's own schedule.
 *
 * `slots` is a line-item group rather than a plain list: each slot carries its
 * own day, time and duration, and a `list: true` string field yields `string[]`,
 * which cannot express an array of objects.
 */
const passFields = (required: boolean): PlanInputField[] => [
  {
    key: "pass_timezone",
    label: "Schedule Timezone",
    type: "string",
    required,
    helpText:
      "IANA zone, e.g. America/New_York. Slot times are local wall-clock in this zone and hold steady across daylight saving. Legacy names are resolved, so Asia/Calcutta is stored as Asia/Kolkata.",
  },
  {
    key: "pass_schedule_mode",
    label: "Schedule Mode",
    type: "string",
    required: false,
    default: "repeating",
    choices: {
      repeating: "Repeating — generate windows from the slots below",
      fixed: "Fixed — place each window by hand",
    },
  },
  {
    key: "pass_recurrence",
    label: "Repeats",
    type: "string",
    required: false,
    choices: { daily: "Daily", weekly: "Weekly", monthly: "Monthly" },
    helpText:
      "Decides which slot fields apply: weekly uses Weekday, monthly uses Day of Month, daily uses neither.",
  },
  {
    key: "pass_recurrence_ends_at",
    label: "Stop Generating After",
    type: "datetime",
    required: false,
    helpText: "Optional. When window generation stops.",
  },
  {
    key: "pass_sales_cutoff_minutes",
    label: "Stop Selling (minutes)",
    type: "integer",
    required: false,
    helpText:
      "Close sales this many minutes before the moment the anchor below names. Omit to sell right up to the window opening.",
  },
  {
    key: "pass_sales_cutoff_anchor",
    label: "Cutoff Anchor",
    type: "string",
    required: false,
    choices: {
      before_start: "Minutes before a window STARTS — nothing sells once it is running",
      before_end: "Minutes before a window ENDS — keeps selling while it runs",
    },
    helpText:
      "Before End lets a buyer join a session already in progress, with access still ending when that window closes. It requires at least 5 minutes and must be under the shortest slot duration.",
  },
  {
    key: "pass_slots",
    label: "Access Windows",
    required: false,
    children: [
      {
        key: "weekday",
        label: "Weekday",
        type: "integer",
        required: false,
        helpText: "0-6, 0 = Sunday. Weekly recurrence only.",
      },
      {
        key: "day_of_month",
        label: "Day of Month",
        type: "integer",
        required: false,
        helpText: "1-31. Monthly only. 29-31 skip months that lack the day.",
      },
      {
        key: "start_time",
        label: "Starts At",
        type: "string",
        required: true,
        helpText: "HH:MM local wall-clock in the schedule timezone, e.g. 19:00.",
      },
      {
        key: "duration_minutes",
        label: "Lasts (minutes)",
        type: "integer",
        required: true,
        helpText:
          "Each window carries its own length, so one plan can mix a 3-hour and a 14-hour window.",
      },
    ],
    helpText: "Sending these REPLACES the whole schedule. Windows customers already bought keep their original times.",
  },
];

/**
 * A season ticket's slate, its rules and its seat position.
 */
const seriesFields = (): PlanInputField[] => [
  {
    key: "series_window_ids",
    label: "Pass Window IDs",
    type: "string",
    list: true,
    required: false,
    helpText:
      "UUIDs of windows that ALREADY EXIST on your pass plans — a series never creates any. Get them from the Find Pass Windows search. Needs at least two, unless a rule below will supply them.",
  },
  {
    key: "series_prevent_overlaps",
    label: "Prevent Overlapping Passes",
    type: "boolean",
    required: false,
    helpText:
      "Defaults to true. Refuses to take in a window that clashes with one already on the slate, so holders are never handed two things at the same time.",
  },
  {
    key: "series_seat_cap",
    label: "Seat Limit",
    type: "integer",
    required: false,
    helpText: "How many people may hold this series at once. Leave empty for unlimited. Zero is refused.",
  },
  {
    key: "series_sales_cutoff_minutes",
    label: "Stop Selling (minutes)",
    type: "integer",
    required: false,
    helpText: "Measured against the WHOLE season, not one window.",
  },
  {
    key: "series_sales_cutoff_anchor",
    label: "Cutoff Anchor",
    type: "string",
    required: false,
    choices: {
      before_start: "Minutes before the FIRST pass opens — nobody buys a season already underway",
      before_end: "Minutes before the LAST pass ends — keeps selling mid-season",
    },
    helpText:
      "Mid-season buyers pay the full price for whatever is left. Nothing is prorated, and passes that have already run are never issued to them.",
  },
  {
    key: "series_successor_plan_id",
    label: "Next Series Plan ID",
    type: "string",
    required: false,
    helpText:
      "Another Pass Series on the same project. When this season's last pass finishes, its holders are invited to buy that one first. A series cannot lead to itself.",
  },
  {
    key: "series_presale_hours",
    label: "Holders Buy First For (hours)",
    type: "integer",
    required: false,
    helpText: "1-8760. How long the next season is held for existing holders before general sale.",
  },
  {
    key: "series_blackout_window_ids",
    label: "Excluded Window IDs",
    type: "string",
    list: true,
    required: false,
    helpText: "Windows a rule matches but you want permanently excluded from the slate.",
  },
  {
    key: "series_rules",
    label: "Automatic Inclusion Rules",
    required: false,
    children: [
      {
        key: "source_plan_id",
        label: "Source Pass Plan ID",
        type: "string",
        required: true,
        helpText: "Must be a Time-Limited Pass plan on this project.",
      },
      {
        key: "kind",
        label: "Rule Type",
        type: "string",
        required: true,
        choices: {
          date_range: "Every Pass Starting in a Period",
          next_n: "The Next Few Passes",
        },
      },
      { key: "from_at", label: "Watch From", type: "datetime", required: false },
      { key: "to_at", label: "Watch Until", type: "datetime", required: false },
      {
        key: "take",
        label: "Number of Passes to Take",
        type: "integer",
        required: false,
        helpText:
          "REQUIRED when the rule type is The Next Few Passes. A count rule takes that many and then stops — it never tops itself back up.",
      },
    ],
    helpText:
      "Rules keep working after the save: a matching window scheduled later is added to the slate AND granted to everyone already holding the series, at no charge. Handpicked window IDs never grow on their own.",
  },
];

/**
 * The fields for whichever kind the Zap has chosen.
 *
 * Zapier re-runs this whenever `kind` changes because that field carries
 * `altersDynamicFields`, so a builder only ever sees the fields their chosen
 * kind actually accepts.
 */
export const planFieldsForKind = (required: boolean) => {
  return async (_z: ZObject, bundle: Bundle): Promise<PlanInputField[]> => {
    const kind = (bundle.inputData?.kind as string) ?? "subscription";

    const blockFields =
      kind === "pass" ? passFields(required) : kind === "pass_series" ? seriesFields() : billingFields(required);

    return [...sharedPlanFields(kind, required), ...blockFields];
  };
};

/**
 * Assemble the nested body the API expects from Zapier's flat input.
 *
 * Zapier input is flat by nature — a Zap builder maps one field at a time — so
 * the nesting happens here rather than being imposed on the person building the
 * Zap. Only keys belonging to the chosen kind are ever sent, which is what keeps
 * the API's block-matches-kind check from ever firing.
 */
export const buildPlanBody = (inputData: Record<string, unknown>): Record<string, unknown> => {
  const kind = (inputData.kind as string) ?? "subscription";
  const body: Record<string, unknown> = { kind };

  const put = (key: string, value: unknown) => {
    if (value !== undefined && value !== null && value !== "") {
      body[key] = value;
    }
  };

  for (const key of ["name", "currency_id", "price", "description", "active", "resources"]) {
    put(key, inputData[key]);
  }

  const eligibility: Record<string, unknown> = {};
  for (const key of [
    "newcomers_only",
    "customers_only",
    "churned_only",
    "single_use",
    "access_codes_only",
  ]) {
    const value = inputData[key];
    if (value !== undefined && value !== null && value !== "") {
      eligibility[key] = value;
    }
  }
  if (Object.keys(eligibility).length > 0) {
    body.eligibility = eligibility;
  }

  if (kind === "subscription") {
    const billing: Record<string, unknown> = {};
    for (const key of [
      "billing_cycle",
      "billing_cycle_count",
      "recurring",
      "disabled_renewal",
      "trial_days",
      "trial_cardless",
    ]) {
      const value = inputData[key];
      if (value !== undefined && value !== null && value !== "") {
        billing[key] = value;
      }
    }
    if (Object.keys(billing).length > 0) {
      body.billing = billing;
    }

    return body;
  }

  if (kind === "pass") {
    const pass: Record<string, unknown> = {};
    const map: Record<string, string> = {
      pass_timezone: "timezone",
      pass_schedule_mode: "schedule_mode",
      pass_recurrence: "recurrence",
      pass_recurrence_ends_at: "recurrence_ends_at",
      pass_sales_cutoff_minutes: "sales_cutoff_minutes",
      pass_sales_cutoff_anchor: "sales_cutoff_anchor",
    };

    for (const [from, to] of Object.entries(map)) {
      const value = inputData[from];
      if (value !== undefined && value !== null && value !== "") {
        pass[to] = value;
      }
    }

    const slots = inputData.pass_slots;
    if (Array.isArray(slots) && slots.length > 0) {
      pass.slots = slots;
    }

    if (Object.keys(pass).length > 0) {
      body.pass = pass;
    }

    return body;
  }

  const series: Record<string, unknown> = {};
  const map: Record<string, string> = {
    series_prevent_overlaps: "prevent_overlaps",
    series_seat_cap: "seat_cap",
    series_sales_cutoff_minutes: "sales_cutoff_minutes",
    series_sales_cutoff_anchor: "sales_cutoff_anchor",
    series_successor_plan_id: "successor_plan_id",
    series_presale_hours: "presale_hours",
  };

  for (const [from, to] of Object.entries(map)) {
    const value = inputData[from];
    if (value !== undefined && value !== null && value !== "") {
      series[to] = value;
    }
  }

  for (const [from, to] of [
    ["series_window_ids", "window_ids"],
    ["series_blackout_window_ids", "blackout_window_ids"],
    ["series_rules", "rules"],
  ] as const) {
    const value = inputData[from];
    if (Array.isArray(value) && value.length > 0) {
      series[to] = value;
    }
  }

  if (Object.keys(series).length > 0) {
    body.pass_series = series;
  }

  return body;
};
