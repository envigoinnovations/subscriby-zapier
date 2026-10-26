import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_portal_design',
  noun: 'Portal Design',
  display: {
    label: 'Get Portal Design',
    description:
      "Retrieve a project's portal design: the document members see, the draft being edited when there is one, when each last moved, and a signed address that previews the draft for ten minutes. Every key of the fourteen sections comes back in the shape Update Portal Design takes.",
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
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/portal-design`,
      });
      handleHttpError(response, z);
      const data = (response.data as { data?: Record<string, unknown> }).data;
      return data ? [data] : [];
    },
    sample: {
      "project_id": "7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13",
      "published": {
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
      "draft": null,
      "has_draft": false,
      "draft_updated_at": null,
      "published_at": "2026-10-26T16:40:08+00:00",
      "preview_url": "https://my.subscriby.net/research-premium?preview=7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13&expires=1793032000&signature=9c1d…"
    },
  },
} satisfies Search;
