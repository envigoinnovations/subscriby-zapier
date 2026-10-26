import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

const CURATED_KEYS = ['preset', 'color_mode', 'accent', 'background', 'surface', 'text', 'heading', 'muted', 'tagline', 'font_display', 'font_body', 'plans_title', 'plans_subtitle', 'announcement_text', 'announcement_url', 'announcement_starts_at', 'announcement_ends_at', 'seo_indexable', 'seo_title_suffix', 'seo_description', 'featured_plan_id', 'default_locale'];

export default {
  key: 'update_portal_design',
  noun: 'Portal Design',
  display: {
    label: 'Update Portal Design',
    description:
      "Change some keys of a project's portal design in its draft; members keep seeing the published design until Publish Portal Design. Fill in only what should move: the common keys have their own fields, and any other key of the document (the lists, the wording, the pixels, the sections) goes into Other Keys as JSON. A text colour that blends into the surface or the background, a plan the project lacks or a list past its ceiling is refused naming the key.",
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      { key: 'preset', label: 'Preset', type: 'string', required: false, choices: {'classic': 'Classic', 'dark': 'Dark', 'midnight': 'Midnight', 'paper': 'Paper', 'pastel': 'Pastel', 'bold': 'Bold'}, helpText: "Recolours the six colours from the preset; a colour you fill in beside it wins. Leave blank to keep the drafted value." },
      { key: 'color_mode', label: 'Colour Mode', type: 'string', required: false, choices: {'light': 'Light', 'dark': 'Dark', 'system': 'Follow the visitor'}, helpText: "Light or dark for everyone, or the light palette switching to the dark one when the visitor asks for a dark scheme. Leave blank to keep the drafted value." },
      { key: 'accent', label: 'Accent', type: 'string', required: false, helpText: "A six-digit hex colour such as #a3e635: buttons, highlights and the chosen plan's ring. Leave blank to keep the drafted value." },
      { key: 'background', label: 'Background', type: 'string', required: false, helpText: "The page colour behind the cards, as a hex colour. Leave blank to keep the drafted value." },
      { key: 'surface', label: 'Surface', type: 'string', required: false, helpText: "The cards' colour, as a hex colour. Leave blank to keep the drafted value." },
      { key: 'text', label: 'Body Text', type: 'string', required: false, helpText: "The body text colour, as a hex colour; it must read on the surface and the background (3:1 at least). Leave blank to keep the drafted value." },
      { key: 'heading', label: 'Headings', type: 'string', required: false, helpText: "The colour of the project's name and every heading, as a hex colour, under the same contrast rule. Leave blank to keep the drafted value." },
      { key: 'muted', label: 'Captions', type: 'string', required: false, helpText: "The colour of captions and small print, as a hex colour, under the same contrast rule. Leave blank to keep the drafted value." },
      { key: 'tagline', label: 'Tagline', type: 'string', required: false, helpText: "One line under the project's name, up to 80 characters. Leave blank to keep the drafted value." },
      { key: 'font_display', label: 'Heading Face', type: 'string', required: false, helpText: "asap-condensed, inter, poppins, montserrat, space-grotesk, bebas-neue, oswald, dm-serif-display, playfair-display, lora, manrope or sora. Leave blank to keep the drafted value." },
      { key: 'font_body', label: 'Body Face', type: 'string', required: false, helpText: "The face of everything but the headings, from the same twelve. Leave blank to keep the drafted value." },
      { key: 'plans_title', label: 'Plan List Heading', type: 'string', required: false, helpText: "The heading over the plans, up to 60 characters. Leave blank to keep the drafted value." },
      { key: 'plans_subtitle', label: 'Plan List Subtitle', type: 'string', required: false, helpText: "The line under that heading, up to 120 characters. Leave blank to keep the drafted value." },
      { key: 'announcement_text', label: 'Announcement', type: 'string', required: false, helpText: "The strip across the top of the page, up to 160 characters. Leave blank to keep the drafted value." },
      { key: 'announcement_url', label: 'Announcement Link', type: 'string', required: false, helpText: "Where the strip leads, an https address. Leave blank to keep the drafted value." },
      { key: 'announcement_starts_at', label: 'Announcement Starts', type: 'datetime', required: false, helpText: "When the strip starts showing; leave blank for at once. Leave blank to keep the drafted value." },
      { key: 'announcement_ends_at', label: 'Announcement Ends', type: 'datetime', required: false, helpText: "When the strip comes down; leave blank for never. Leave blank to keep the drafted value." },
      { key: 'seo_indexable', label: 'Listed by Search Engines', type: 'boolean', required: false, helpText: "Off adds a noindex directive to the portal. Leave blank to keep the drafted value." },
      { key: 'seo_title_suffix', label: 'Title Suffix', type: 'string', required: false, helpText: "The words after the project's name in the page title, up to 60 characters. Leave blank to keep the drafted value." },
      { key: 'seo_description', label: 'Description', type: 'string', required: false, helpText: "The description search engines and shared links show, up to 160 characters. Leave blank to keep the drafted value." },
      { key: 'featured_plan_id', label: 'Featured Plan ID', type: 'string', required: false, helpText: "The plan that carries the Most popular badge, one of the project's own plan ids. Leave blank to keep the drafted value." },
      { key: 'default_locale', label: 'Default Language', type: 'string', required: false, helpText: "The language the portal's own address opens in: en, fr, es, it, hi, bn, de, pt, tr or si; it must be among the offered languages. Leave blank to keep the drafted value." },
      {
        key: 'design_json',
        label: 'Other Keys (JSON)',
        type: 'text',
        required: false,
        helpText:
          'A JSON object of any other keys of the design document, exactly as Get Portal Design returns them, such as {"perks": ["Weekly calls"], "share_networks": ["x", "telegram"]}. Keys given here win over the fields above.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const body: Record<string, unknown> = {};
      for (const key of CURATED_KEYS) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value;
        }
      }
      const extra = bundle.inputData.design_json as string | undefined;
      if (extra && extra.trim() !== '') {
        let parsed: unknown;
        try {
          parsed = JSON.parse(extra);
        } catch {
          throw new z.errors.Error('Other Keys must be a JSON object.', 'InvalidInput', 400);
        }
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
          throw new z.errors.Error('Other Keys must be a JSON object.', 'InvalidInput', 400);
        }
        Object.assign(body, parsed as Record<string, unknown>);
      }
      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/portal-design`,
        method: 'PUT',
        headers: { 'Idempotency-Key': randomUUID(), 'Content-Type': 'application/json' },
        json: body,
      });
      handleHttpError(response, z);
      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      "project_id": "7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13",
      "published": {
        "preset": "classic",
        "color_mode": "light",
        "accent": "#f43f5e",
        "accent_secondary": null,
        "background": "#e4e4e7",
        "grid": true,
        "surface": "#ffffff",
        "text": "#27272a",
        "heading": "#18181b",
        "muted": "#71717a",
        "tagline": "Weekly research notes and the members lounge",
        "social_links": [],
        "font_display": "asap-condensed",
        "font_body": "inter",
        "heading_case": "uppercase",
        "type_scale": "regular",
        "radius": "round",
        "button_style": "pill",
        "button_fill": "dark",
        "button_case": "uppercase",
        "shadow": "strong",
        "card_border": false,
        "arrangement": "sidebar_left",
        "content_width": "regular",
        "sticky_sidebar": true,
        "plan_grid": "list",
        "plan_density": "roomy",
        "plans_heading": true,
        "metrics_subscribers": true,
        "metrics_followers": true,
        "metrics_threshold": 0,
        "plans_title": null,
        "plans_subtitle": null,
        "label_login": null,
        "label_share": null,
        "label_subscribe": null,
        "checkout_title": null,
        "checkout_subtitle": null,
        "checkout_note": null,
        "success_title": null,
        "success_message": null,
        "perks_title": null,
        "perks": [],
        "faq_title": null,
        "faq": [],
        "about_name": null,
        "about_bio": null,
        "custom_button_label": null,
        "custom_button_url": null,
        "footer_refund_url": null,
        "footer_contact_url": null,
        "footer_imprint_url": null,
        "footer_line": null,
        "footer_help": true,
        "announcement_text": null,
        "announcement_url": null,
        "announcement_starts_at": null,
        "announcement_ends_at": null,
        "video_url": null,
        "gallery_title": null,
        "gallery": [],
        "testimonials_title": null,
        "testimonials": [],
        "sidebar_items": [
          {
            "key": "tagline",
            "shown": true
          },
          {
            "key": "metrics",
            "shown": true
          },
          {
            "key": "buttons",
            "shown": true
          },
          {
            "key": "description",
            "shown": true
          },
          {
            "key": "social_links",
            "shown": true
          },
          {
            "key": "footer",
            "shown": true
          }
        ],
        "content_blocks": [
          {
            "key": "perks",
            "shown": true
          },
          {
            "key": "about",
            "shown": true
          },
          {
            "key": "faq",
            "shown": true
          },
          {
            "key": "video",
            "shown": true
          },
          {
            "key": "gallery",
            "shown": true
          },
          {
            "key": "testimonials",
            "shown": true
          }
        ],
        "locale_switcher": true,
        "featured_plan_id": null,
        "coupon_box": "always",
        "share_button": true,
        "share_networks": [
          "bluesky",
          "buffer",
          "email",
          "facebook",
          "flipboard",
          "line",
          "linkedin",
          "mix",
          "pinterest",
          "reddit",
          "telegram",
          "threads",
          "tumblr",
          "x",
          "vk",
          "whatsapp",
          "xing"
        ],
        "login_button": true,
        "social_proof": false,
        "seats_badges": true,
        "seo_indexable": true,
        "seo_social_card": true,
        "pixel_meta": null,
        "pixel_ga4": null,
        "pixel_tiktok": null,
        "pixel_google_ads": null,
        "custom_css": null,
        "seo_title_suffix": null,
        "seo_description": null,
        "social_card_url": null,
        "default_locale": null,
        "locales": [
          "en",
          "fr",
          "es",
          "it",
          "hi",
          "bn",
          "de",
          "pt",
          "tr",
          "si"
        ]
      },
      "draft": {
        "preset": "midnight",
        "color_mode": "light",
        "accent": "#22d3ee",
        "accent_secondary": null,
        "background": "#0f172a",
        "grid": true,
        "surface": "#1e293b",
        "text": "#cbd5e1",
        "heading": "#f8fafc",
        "muted": "#94a3b8",
        "tagline": "Weekly research notes and the members lounge",
        "social_links": [],
        "font_display": "space-grotesk",
        "font_body": "inter",
        "heading_case": "uppercase",
        "type_scale": "regular",
        "radius": "round",
        "button_style": "pill",
        "button_fill": "dark",
        "button_case": "uppercase",
        "shadow": "strong",
        "card_border": false,
        "arrangement": "sidebar_left",
        "content_width": "regular",
        "sticky_sidebar": true,
        "plan_grid": "list",
        "plan_density": "roomy",
        "plans_heading": true,
        "metrics_subscribers": true,
        "metrics_followers": true,
        "metrics_threshold": 0,
        "plans_title": null,
        "plans_subtitle": null,
        "label_login": null,
        "label_share": null,
        "label_subscribe": null,
        "checkout_title": null,
        "checkout_subtitle": null,
        "checkout_note": null,
        "success_title": null,
        "success_message": null,
        "perks_title": null,
        "perks": [],
        "faq_title": null,
        "faq": [],
        "about_name": null,
        "about_bio": null,
        "custom_button_label": null,
        "custom_button_url": null,
        "footer_refund_url": null,
        "footer_contact_url": null,
        "footer_imprint_url": null,
        "footer_line": null,
        "footer_help": true,
        "announcement_text": null,
        "announcement_url": null,
        "announcement_starts_at": null,
        "announcement_ends_at": null,
        "video_url": null,
        "gallery_title": null,
        "gallery": [],
        "testimonials_title": null,
        "testimonials": [],
        "sidebar_items": [
          {
            "key": "tagline",
            "shown": true
          },
          {
            "key": "metrics",
            "shown": true
          },
          {
            "key": "buttons",
            "shown": true
          },
          {
            "key": "description",
            "shown": true
          },
          {
            "key": "social_links",
            "shown": true
          },
          {
            "key": "footer",
            "shown": true
          }
        ],
        "content_blocks": [
          {
            "key": "perks",
            "shown": true
          },
          {
            "key": "about",
            "shown": true
          },
          {
            "key": "faq",
            "shown": true
          },
          {
            "key": "video",
            "shown": true
          },
          {
            "key": "gallery",
            "shown": true
          },
          {
            "key": "testimonials",
            "shown": true
          }
        ],
        "locale_switcher": true,
        "featured_plan_id": null,
        "coupon_box": "always",
        "share_button": true,
        "share_networks": [
          "bluesky",
          "buffer",
          "email",
          "facebook",
          "flipboard",
          "line",
          "linkedin",
          "mix",
          "pinterest",
          "reddit",
          "telegram",
          "threads",
          "tumblr",
          "x",
          "vk",
          "whatsapp",
          "xing"
        ],
        "login_button": true,
        "social_proof": false,
        "seats_badges": true,
        "seo_indexable": true,
        "seo_social_card": true,
        "pixel_meta": null,
        "pixel_ga4": null,
        "pixel_tiktok": null,
        "pixel_google_ads": null,
        "custom_css": null,
        "seo_title_suffix": null,
        "seo_description": null,
        "social_card_url": null,
        "default_locale": null,
        "locales": [
          "en",
          "fr",
          "es",
          "it",
          "hi",
          "bn",
          "de",
          "pt",
          "tr",
          "si"
        ]
      },
      "has_draft": true,
      "draft_updated_at": "2026-10-26T16:12:45+00:00",
      "published_at": "2026-10-20T09:30:00+00:00",
      "preview_url": "https://my.subscriby.net/research-premium?preview=7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13&expires=1793030400&signature=4b8f…"
    },
  },
} satisfies Create;
