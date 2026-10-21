import { useMemo } from "react";
import { feedSection } from "../data/siteContent";
import { formatDate, formatNumber } from "../lib/format";
import Button from "./Button";
import FeedCard from "./FeedCard";
import MobileSlider from "./MobileSlider";
import SectionHeader from "./SectionHeader";
import { SourceMark } from "./SocialMarks";

/** Minste antall ekte innlegg før plassholderkortene droppes. */
const MIN_REAL = 3;

/**
 * Sosial feed. Tar `posts` og `channels` som props, sorterer nyeste først
 * og viser maks `limit`. Byttes til make.com-webhook uten komponentendring.
 * Finnes minst tre ekte innlegg vises bare de, rundet ned til et multiplum
 * av tre så rutenettet alltid ser ferdig ut (3, 6 eller 9 kort). Under 768 px
 * er kortene en slider med prikker (MobileSlider), fra 768 px et rutenett.
 */
export default function SocialFeed({ posts = [], channels = [], limit = 6, id = "feed" }) {
  const channel = channels.find((c) => c.platform === "facebook") || channels[0];

  const visible = useMemo(() => {
    const real = posts.filter((p) => !p.placeholder);
    const pool = real.length >= MIN_REAL ? real : posts;
    const sorted = [...pool].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });
    const count = Math.min(limit, sorted.length);
    const rounded = count >= 3 ? Math.floor(count / 3) * 3 : count;
    return sorted.slice(0, rounded);
  }, [posts, limit]);

  if (!visible.length) return null;

  const hasCheckins = channel?.checkins !== undefined && channel?.checkins !== null;

  return (
    <section id={id} className="section-pad bg-brand-bg text-brand-text">
      <div className="container-site flex flex-col gap-8 md:gap-10">
        <SectionHeader
          tone="light"
          kicker={feedSection.kicker}
          title={feedSection.title}
          lead={feedSection.lead}
          actions={
            channel && (
              <>
                <p className="flex flex-col gap-1">
                  <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-text">
                    <SourceMark source="facebook" size={20} />
                    <span>
                      {formatNumber(channel.followers)} {channel.followersLabel}
                      {hasCheckins && (
                        <>
                          {" · "}
                          {formatNumber(channel.checkins)} {feedSection.checkinsSuffix}
                        </>
                      )}
                    </span>
                  </span>
                  <span className="text-[13px] text-brand-muted">
                    {feedSection.verifiedPrefix} {formatDate(channel.verifiedAt)}
                  </span>
                </p>
                <Button
                  href={channel.url}
                  external
                  variant="facebook"
                  size="sm"
                  className="w-full md:w-auto"
                >
                  {feedSection.cta.label}
                </Button>
              </>
            )
          }
        />

        <MobileSlider
          items={visible}
          label={feedSection.listLabel}
          renderItem={(post) => (
            <FeedCard post={post} channelName={channel?.name || post.platform} />
          )}
        />
      </div>
    </section>
  );
}
