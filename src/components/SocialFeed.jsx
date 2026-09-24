import { useMemo } from "react";
import { feedSection } from "../data/siteContent";
import { formatDate, formatNumber } from "../lib/format";
import Button from "./Button";
import FeedCard from "./FeedCard";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

/**
 * Sosial feed. Tar `posts` og `channels` som props, sorterer nyeste først
 * og viser maks `limit`. Byttes til make.com-webhook uten komponentendring.
 */
export default function SocialFeed({ posts = [], channels = [], limit = 6, id = "feed" }) {
  const channel = channels.find((c) => c.platform === "facebook") || channels[0];

  const visible = useMemo(() => {
    const sorted = [...posts].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });
    return sorted.slice(0, limit);
  }, [posts, limit]);

  if (!visible.length) return null;

  return (
    <section id={id} className="section-pad bg-brand-bg text-brand-text">
      <div className="container-site flex flex-col gap-8 md:gap-10">
        <SectionHeader
          tone="light"
          kicker={feedSection.kicker}
          title={feedSection.title}
          aside={
            <div className="flex flex-col gap-3 md:items-end">
              <p className="max-w-[420px] text-base leading-relaxed text-brand-muted md:text-right md:text-[17px]">
                {feedSection.lead}
              </p>
              {channel && (
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold text-brand-muted md:justify-end">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="Facebook" size={15} strokeWidth={2} />
                    {formatNumber(channel.followers)} {channel.followersLabel}
                  </span>
                  {channel.checkins !== undefined && channel.checkins !== null && (
                    <span>
                      {formatNumber(channel.checkins)} {feedSection.checkinsSuffix}
                    </span>
                  )}
                  <span className="font-normal">
                    ({feedSection.verifiedPrefix} {formatDate(channel.verifiedAt)})
                  </span>
                </p>
              )}
              {channel && (
                <Button href={channel.url} external variant="dark" size="sm" arrow>
                  {feedSection.cta.label}
                </Button>
              )}
            </div>
          }
        />

        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {visible.map((post, index) => (
            <Reveal as="li" key={post.id} delay={(index % 3) * 60}>
              <FeedCard post={post} channelName={channel?.name || post.platform} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
