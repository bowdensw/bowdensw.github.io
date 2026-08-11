/**
 * `copyValue` overrides what lands on the clipboard when the displayed text is
 * formatted for reading rather than pasting.
 */
export type Channel = {
  key: string;
  icon: "mail" | "phone" | "github" | "linkedin";
  label: string;
  value: string;
  copyValue?: string;
  href: string;
  external?: boolean;
};

export const channels: Channel[] = [
  {
    key: "email",
    icon: "mail",
    label: "Email",
    value: "spencerbowden337@gmail.com",
    href: "mailto:spencerbowden337@gmail.com",
  },
  {
    key: "phone",
    icon: "phone",
    label: "Phone",
    value: "(513) 503-9631",
    copyValue: "5135039631",
    href: "tel:+15135039631",
  },
  {
    key: "github",
    icon: "github",
    label: "GitHub",
    value: "github.com/bowdensw",
    href: "https://github.com/bowdensw",
    external: true,
  },
  {
    key: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/spencer-bowden-93b2b8254",
    href: "https://www.linkedin.com/in/spencer-bowden-93b2b8254/",
    external: true,
  },
];
