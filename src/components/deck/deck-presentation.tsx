"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { slides } from "./slides";
import TerrainBackground from "./terrain-background";



function animateCountup(el: HTMLElement) {
  const target = parseFloat(el.dataset.cuTarget ?? "0");
  const prefix = el.dataset.cuPrefix ?? "";
  const suffix = el.dataset.cuSuffix ?? "";
  const decimals = parseInt(el.dataset.cuDecimals ?? "0", 10);
  const duration = 1400;
  const startTime = performance.now();
  function tick(now: number) {
    const p = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + (target * ease).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function splitChars(el: Element) {
  const text = el.textContent ?? "";
  el.textContent = "";
  Array.from(text).forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "ch";
    span.style.setProperty("--ch-i", String(i));
    span.textContent = ch;
    el.appendChild(span);
  });
}

export default function DeckPresentation() {
  const [current, setCurrent] = useState(0);
  const [introDismissed, setIntroDismissed] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const copy = {
    introKicker: "▸ MITS · 2026",
    loading: "Loading...",
    enter: "Click to enter",
    skip: "Skip",
  };

  const goTo = useCallback((i: number) => {
    if (i < 0 || i >= slides.length) return;
    setCurrent(i);

    // Synchronously request native fullscreen for demo video slides (Slide 8, index 7)
    if (i === 7) {
      setTimeout(() => {
        const frame = document.getElementById("s8-video-frame");
        if (frame && !document.fullscreenElement) {
          frame.requestFullscreen().catch(() => {});
        }
      }, 0);
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

  const dismissIntro = useCallback(() => {
    const video = introVideoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIntroDismissed(true);
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const navigateToHomePageIntro = useCallback(() => {
    window.open(`https://mits.io`, "_blank", "noopener,noreferrer");
  }, []);

  const handleIntroVideoEnded = useCallback(() => {
    const video = introVideoRef.current;
    if (!video) return;
    const timer = setTimeout(() => {
      video.currentTime = 0;
      const playPromise = video.play();
      playPromise?.catch(() => {});
    }, 20000); // Wait 20 seconds before looping
    timers.current.push(timer);
  }, []);

  useEffect(() => {
    if (introDismissed || !introReady) return;
    const video = introVideoRef.current;
    if (!video) return;

    const playPromise = video.play();
    playPromise?.catch(() => {});
  }, [introDismissed, introReady]);

  useEffect(() => {
    if (introDismissed) return;
    const video = introVideoRef.current;
    if (!video) return;

    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      setIntroReady(true);
      return;
    }

    video.load();
  }, [introDismissed]);

  // UX Safety Net: Force the preloader to resolve after 3 seconds in case video fails or gets blocked by browser autoplay policies
  useEffect(() => {
    if (introDismissed || introReady) return;
    const timer = setTimeout(() => {
      setIntroReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [introDismissed, introReady]);

  // Scale to fit screen
  useEffect(() => {
    if (!introDismissed) return;

    const scale = () => {
      if (!stageRef.current) return;
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      const x = (window.innerWidth - 1920 * s) / 2;
      const y = (window.innerHeight - 1080 * s) / 2;
      stageRef.current.style.transform = `translate(${x}px,${y}px) scale(${s})`;
    };
    scale();
    window.addEventListener("resize", scale);
    return () => window.removeEventListener("resize", scale);
  }, [introDismissed]);

  // Char split on mount
  useEffect(() => {
    if (!introDismissed) return;
    document.querySelectorAll("[data-split-chars]").forEach(splitChars);
  }, [introDismissed]);

  // Keyboard navigation
  useEffect(() => {
    if (!introDismissed) return;

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(current + 1);
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        goTo(current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [introDismissed, current, goTo]);

  // Touch navigation
  useEffect(() => {
    if (!introDismissed) return;

    let tx = 0;
    let ty = 0;
    const onTouchStart = (e: TouchEvent) => {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - tx;
      const dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        goTo(dx < 0 ? current + 1 : current - 1);
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [introDismissed, current, goTo]);

  // Countup on slide change
  useEffect(() => {
    if (!introDismissed) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    const slide = stageRef.current?.children.item(
      current,
    ) as HTMLElement | null;
    if (!slide) return;
    slide.querySelectorAll("[data-countup]").forEach((el) => {
      const id = setTimeout(() => animateCountup(el as HTMLElement), 700);
      timers.current.push(id);
    });
  }, [current, introDismissed]);

  return (
    <>
      {!introDismissed && (
        <div className={`app-intro${introReady ? " app-intro-ready" : ""}`}>
          <video
            ref={introVideoRef}
            className={`app-intro-video${introReady ? " app-intro-video-ready" : ""}`}
            src="/assets/landing_video.mp4"
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setIntroReady(true)}
            onCanPlayThrough={() => setIntroReady(true)}
            onEnded={handleIntroVideoEnded}
          />
          <div
            className={`app-intro-loader${introReady ? " app-intro-loader-hidden" : ""}`}
          >
            <div className="app-intro-loader-kicker">{copy.introKicker}</div>
            <div className="app-intro-loader-center">
              <div className="app-intro-loader-subtitle"> MITS </div>
            </div>
            <div className="app-intro-loader-status">{copy.loading}</div>
          </div>

          {introReady && (
            <>
              <div className="app-intro-shade" />
              <div className="app-intro-controls">
                <button className="app-intro-enter" onClick={dismissIntro}>
                  {copy.enter}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {introDismissed && (
        <>
          <div className="stage-wrap">
            <TerrainBackground current={current} />
            <div ref={stageRef} className="deck-stage">
              {slides.map((Slide, index) => (
                <Slide
                  key={index}
                  isActive={current === index}
                  locale="en"
                  onAdvance={() => goTo(index + 1)}
                />
              ))}
            </div>
          </div>

          <div className="deck-progress-wrap">
            <div
              className="deck-progress"
              style={{ width: `${(current / (slides.length - 1)) * 100}%` }}
            />
          </div>

          <div className="deck-nav-bar ">
            <button className="deck-nav-btn" onClick={() => goTo(current - 1)}>
              ←
            </button>
            <span className="deck-nav-counter">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <button className="deck-nav-btn" onClick={() => goTo(current + 1)}>
              →
            </button>
          </div>
        </>
      )}
    </>
  );
}
