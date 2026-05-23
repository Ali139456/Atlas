"use client";

import Image from "next/image";
import { useState } from "react";
import { corporateVideo } from "@/lib/site-content";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-7 w-7">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const { youtubeId, thumbnail } = corporateVideo;

  return (
    <section id="video" className="relative section-pad overflow-hidden">
      <div className="blob w-[420px] h-[320px] right-0 top-0 bg-purple-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="video-layout">
          <div className="video-copy section-intro">
            <p className="eyebrow-pill">{corporateVideo.eyebrow}</p>
            <h2 className="display-lg section-title text-white">
              {corporateVideo.title}{" "}
              <span className="text-gradient-neon">{corporateVideo.titleAccent}</span>
            </h2>
            <p className="mt-4 text-[var(--muted)]">{corporateVideo.description}</p>
          </div>
          <div className="video-frame glass-strong">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title="Corporate profile video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="video-poster"
                onClick={() => setPlaying(true)}
                aria-label="Play corporate profile video"
              >
                <Image
                  src={thumbnail}
                  alt="Corporate profile video thumbnail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="video-poster-img object-cover"
                  priority
                />
                <span className="video-poster-overlay" aria-hidden />
                <span className="video-play-btn">
                  <PlayIcon />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
