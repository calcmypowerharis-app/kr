"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { ZoomIn, ZoomOut, RotateCcw, X } from "lucide-react";

interface ZoomableArticleImageProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  aspectRatio?: "video" | "square" | "auto";
  objectFit?: "cover" | "contain";
  className?: string;
  children: React.ReactNode;
}

export default function ZoomableArticleImage({
  src,
  alt,
  title,
  caption,
  aspectRatio = "video",
  objectFit = "cover",
  className = "",
  children,
}: ZoomableArticleImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const didDragRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Touch tracking for pinch-to-zoom and drag
  const initialTouchDistanceRef = useRef<number | null>(null);
  const initialScaleRef = useRef(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleOpen = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => {
      const next = Math.min(4, Math.round((prev + 0.5) * 10) / 10);
      return next;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const next = Math.max(1, Math.round((prev - 0.5) * 10) / 10);
      if (next <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0" || e.key === "r" || e.key === "R") {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose, handleZoomIn, handleZoomOut, handleReset]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.25 : -0.25;
    setScale((prev) => {
      const next = Math.min(4, Math.max(1, Math.round((prev + delta) * 100) / 100));
      if (next <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      return next;
    });
  };

  // Double click / tap toggle
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) {
      handleReset();
    } else {
      setScale(2);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Mouse dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // primary click only
    setIsDragging(true);
    didDragRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        didDragRef.current = true;
      }

      if (scale > 1) {
        const maxPanX = (window.innerWidth * (scale - 1)) / 1.5;
        const maxPanY = (window.innerHeight * (scale - 1)) / 1.5;

        const nextX = dragStartRef.current.posX + dx;
        const nextY = dragStartRef.current.posY + dy;

        setPosition({
          x: Math.max(-maxPanX, Math.min(maxPanX, nextX)),
          y: Math.max(-maxPanY, Math.min(maxPanY, nextY)),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scale]);

  // Touch handlers (pan and pinch zoom)
  const getTouchDistance = (t1: React.Touch, t2: React.Touch) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      didDragRef.current = false;
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        posX: position.x,
        posY: position.y,
      };
      initialTouchDistanceRef.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      initialTouchDistanceRef.current = getTouchDistance(e.touches[0], e.touches[1]);
      initialScaleRef.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && scale > 1) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        didDragRef.current = true;
      }

      const maxPanX = (window.innerWidth * (scale - 1)) / 1.5;
      const maxPanY = (window.innerHeight * (scale - 1)) / 1.5;

      const nextX = dragStartRef.current.posX + dx;
      const nextY = dragStartRef.current.posY + dy;

      setPosition({
        x: Math.max(-maxPanX, Math.min(maxPanX, nextX)),
        y: Math.max(-maxPanY, Math.min(maxPanY, nextY)),
      });
    } else if (e.touches.length === 2 && initialTouchDistanceRef.current !== null) {
      const currentDist = getTouchDistance(e.touches[0], e.touches[1]);
      const factor = currentDist / initialTouchDistanceRef.current;
      const nextScale = Math.min(4, Math.max(1, Math.round(initialScaleRef.current * factor * 100) / 100));
      setScale(nextScale);
      if (nextScale <= 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    initialTouchDistanceRef.current = null;
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicked on backdrop and not dragged
    if (!didDragRef.current && (e.target === viewportRef.current || (e.target as HTMLElement).id === "lightbox-backdrop")) {
      handleClose();
    }
  };

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "auto"
      ? "aspect-auto"
      : "aspect-video";

  const bgClass = objectFit === "contain" ? "bg-slate-50" : "bg-slate-100";

  return (
    <>
      <figure className="space-y-2">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleOpen}
          aria-label={title ? `Click to zoom: ${title}` : "Click to zoom image in full-screen viewer"}
          className={`group relative w-full ${aspectClass} rounded-2xl overflow-hidden ${bgClass} border border-slate-200 shadow-sm block text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-zoom-in ${className}`.trim()}
        >
          {children}

          {/* Hover / Tap Zoom Badge */}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-950/95 text-white text-xs font-medium backdrop-blur-md transition-all shadow-md group-hover:scale-105 pointer-events-none">
            <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
            <span>Click to zoom</span>
          </span>
        </button>

        {caption && (
          <figcaption className="text-xs text-slate-500 text-center">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox Modal Portal */}
      {isOpen &&
        mounted &&
        createPortal(
          <div
            id="lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Full-screen image viewer"
            className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md select-none touch-none"
            onClick={handleBackdropClick}
            onWheel={handleWheel}
          >
            {/* Top Bar */}
            <div className="relative z-20 flex items-center justify-between p-3 sm:p-4 text-white">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate max-w-[200px] sm:max-w-md">
                  {title || caption || alt}
                </span>
                <span className="hidden md:inline-block text-xs text-slate-400">
                  (Scroll to zoom, drag to pan, Esc to close)
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close image viewer"
                className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 shadow-lg backdrop-blur-md transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewport Area */}
            <div
              ref={viewportRef}
              className={`relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-4 ${
                scale > 1
                  ? isDragging
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : "cursor-zoom-in"
              }`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onDoubleClick={handleDoubleClick}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                draggable={false}
                className="max-w-full max-h-full object-contain select-none will-change-transform"
                style={{
                  transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
                  transition: isDragging ? "none" : "transform 0.15s ease-out",
                }}
              />
            </div>

            {/* Bottom Floating Control Bar */}
            <div className="relative z-20 pb-4 sm:pb-6 flex justify-center">
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md text-white">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={scale <= 1}
                  aria-label="Zoom out"
                  className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-35 disabled:hover:bg-transparent transition text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <span className="text-xs sm:text-sm font-semibold px-2 min-w-[3.25rem] text-center text-slate-200 select-none">
                  {Math.round(scale * 100)}%
                </span>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={scale >= 4}
                  aria-label="Zoom in"
                  className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-35 disabled:hover:bg-transparent transition text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="h-4 w-px bg-slate-700 mx-1" />

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={scale === 1 && position.x === 0 && position.y === 0}
                  aria-label="Reset zoom"
                  title="Reset zoom"
                  className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-35 disabled:hover:bg-transparent transition text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close viewer"
                  title="Close viewer"
                  className="p-2 rounded-full hover:bg-slate-800 transition text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
