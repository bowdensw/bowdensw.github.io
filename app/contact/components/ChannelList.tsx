"use client";

import { Check, Copy, ExternalLink, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/Brand";
import { useCopy } from "@/lib/useCopy";
import { cn } from "@/lib/utils";
import { channels } from "../data/channels";

const icons = {
  mail: Mail,
  phone: Phone,
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

const focusRing =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-contact-deep focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export default function ChannelList() {
  const { copiedKey, copy } = useCopy();

  return (
    // min-w-0 because this is a grid item, and grid items size to their
    // content by default — without it the long LinkedIn URL widens the page.
    <ul className="flex min-w-0 flex-col rounded-xl border border-paper bg-surface shadow-card">
      {channels.map((channel, index) => {
        const Icon = icons[channel.icon];
        const copied = copiedKey === channel.key;

        return (
          <li
            key={channel.key}
            className={cn(
              "flex items-center gap-5 px-6 py-5 transition-colors duration-150 sm:px-7 sm:py-7",
              index > 0 && "border-t border-paper",
              copied && "bg-contact/8",
            )}
          >
            <Icon
              aria-hidden="true"
              className="size-5 shrink-0 text-contact-deep"
            />

            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[13px] font-bold tracking-[0.05em] text-contact-deep uppercase">
                {channel.label}
              </p>
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "flex min-w-0 items-center gap-2 text-lg text-ink hover:text-contact-deep active:text-contact",
                  focusRing,
                )}
              >
                {/* min-w-0 as well as truncate: a flex child's automatic
                    minimum size is its content, so it would refuse to shrink. */}
                <span className="min-w-0 truncate">{channel.value}</span>
                {channel.external && (
                  <ExternalLink
                    aria-hidden="true"
                    className="size-4 shrink-0"
                  />
                )}
                <span className="sr-only">
                  {channel.external ? "(opens in a new tab)" : ""}
                </span>
              </a>
            </div>

            <button
              type="button"
              onClick={() =>
                copy(channel.key, channel.copyValue ?? channel.value)
              }
              className={cn(
                "shrink-0 cursor-pointer p-1 transition-transform duration-150 hover:scale-110 active:scale-95",
                copied ? "text-music-deep" : "text-ink-soft",
                focusRing,
              )}
            >
              {copied ? (
                <Check aria-hidden="true" className="size-4" />
              ) : (
                <Copy aria-hidden="true" className="size-4" />
              )}
              <span className="sr-only">
                {copied ? `${channel.label} copied` : `Copy ${channel.label}`}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
