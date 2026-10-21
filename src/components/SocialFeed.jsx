import { useMemo } from "react";
import { feedSection } from "../data/siteContent";
import { formatDate, formatNumber } from "../lib/format";
import Button from "./Button";
import FeedCard from "./FeedCard";
import MobileSlider from "./MobileSlider";
import { SourceMark } from "./SocialMarks";

/** Minste antall ekte innlegg før plassholderkortene droppes. */
const MIN_REAL = 3;

/**
 * Sosial feed. Tar `posts` og `channels` som props, sorterer nyeste først
 * og viser maks `limit`. Byttes til make.com-webhook uten komponentendring.
 * Finnes minst tre ekte innlegg vises bare de, rundet ned til et multiplum
 * av tre så rutenettet alltid ser ferdig ut (3, 6 eller 9 kort). Under 768 px
 * er kortene en slider kant til kant (MobileSlider), fra 768 px et rutenett.
 * Kompakt topp: kicker og tittel, «Følg oss på Facebook» som liten knapp på
 * samme rad fra 768 px, og tallene med dato på én linje under.
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
      <div className="container-site flex flex-col gap-5 md:gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="flex min-w-0 flex-col gap-2 md:gap-3">
            <p className="kicker text-brand-accent-deep">{feedSection.kicker}</p>
            <h2 className="h2-section">{feedSection.title}</h2>
            {channel && (
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-brand-muted">
                <SourceMark source="facebook" size={16} />
                <span className="font-semibold text-brand-text">
                  {formatNumber(channel.followers)} {channel.followersLabel}
                  {hasCheckins && (
                    <>
                      {" · "}
                      {formatNumber(channel.checkins)} {feedSection.checkinsSuffix}
                    </>
                  )}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {feedSection.verifiedPrefix} {formatDate(channel.verifiedAt)}
                </span>
              </p>
            )}
          </div>
          {channel && (
            <Button
              href={channel.url}
              external
              variant="facebook"
              size="xs"
              className="self-start md:shrink-0 md:self-end"
            >
              {feedSection.cta.label}
            </Button>
          )}
        </div>

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
