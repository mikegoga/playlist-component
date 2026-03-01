/**
 * Copyright 2026 mikegoga
 * @license Apache-2.0, see LICENSE for full text.
 */

import { LitElement, html, css } from "lit";
import { DDDsuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./slide-indicator.js";
import "./slide-arrow.js";
import "./play-list-slide.js";

export class PlaylistComponent extends DDDsuper(I18NMixin(LitElement)) {
  static get tag() {
    return "playlist-component";
  }

  static get properties() {
    return {
      ...super.properties,
      index: { type: Number, reflect: true },
      loop: { type: Boolean, reflect: true }, // if false: disable at ends; if true: wrap around
      slidesCount: { type: Number }
    };
  }

  constructor() {
    super();
    this.index = 0;
    this.loop = true;
    this.slidesCount = 0;

    // TODO: add keyboard support (ArrowLeft/ArrowRight) for accessibility
    // TODO: add focus management (keep focus on dots/arrow clicked)
  }

  firstUpdated() {
    // Count slides after first render
    this._syncSlides();

    // Recount slides if Light DOM changes (slotchange)
    const slot = this.shadowRoot.querySelector("slot");
    slot?.addEventListener("slotchange", () => this._syncSlides());
  }

  updated(changedProps) {
    if (changedProps.has("index")) {
      // TODO: clamp index here (already partially done in _syncSlides)
      this._syncSlides();
    }
  }

  _getSlides() {
    return Array.from(this.querySelectorAll(":scope > play-list-slide"));
  }

  _syncSlides() {
    const slides = this._getSlides();
    this.slidesCount = slides.length;

    // Clamp index safely
    if (this.slidesCount === 0) {
      this.index = 0;
      return;
    }
    if (this.index < 0) this.index = 0;
    if (this.index > this.slidesCount - 1) this.index = this.slidesCount - 1;

    // Mark active slide
    // TODO (next week): rely on <play-list-slide active> styling (already supported in play-list-slide.js stub)
    slides.forEach((s, i) => (s.active = i === this.index));
  }

  // Events from children  

  _onDotIndexChange(e) {
    // Expected event: "play-list-index-changed" with detail: { index }
    const next = Number(e.detail?.index);
    if (Number.isFinite(next)) this.index = next;

    // TODO: announce slide change for screen readers via aria-live
  }

  _onArrow(e) {
    // Expected event: "play-list-arrow" with detail: { direction: "prev" | "next" }
    const dir = e.detail?.direction;

    // TODO (next week): implement wrap OR disable behavior cleanly
    if (dir === "prev") this._prev();
    if (dir === "next") this._next();
  }

  _prev() {
    if (this.slidesCount === 0) return;

    if (this.index === 0) {
      // TODO: if loop=false, do nothing and visually disable prev button
      // TODO: if loop=true, wrap to last slide
      this.index = this.loop ? this.slidesCount - 1 : 0;
    } else {
      this.index -= 1;
    }
  }

  _next() {
    if (this.slidesCount === 0) return;

    if (this.index === this.slidesCount - 1) {
      // TODO: if loop=false, do nothing and visually disable next button
      // TODO: if loop=true, wrap to first slide
      this.index = this.loop ? 0 : this.slidesCount - 1;
    } else {
      this.index += 1;
    }
  }

  _prevDisabled() {
    // TODO: wire into <slide-arrow> disabled state
    return !this.loop && this.index === 0;
  }

  _nextDisabled() {
    // TODO: wire into <slide-arrow> disabled state
    return !this.loop && this.index === this.slidesCount - 1;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .frame {
          position: relative;
          border: var(--ddd-border-sm);
          border-radius: var(--ddd-radius-lg);
          padding: var(--ddd-spacing-6);
          background: var(--ddd-theme-accent);
          box-shadow: var(--ddd-boxShadow-sm);
        }

        .row {
          display: grid;
          grid-template-columns: 48px 1fr 48px;
          gap: var(--ddd-spacing-4);
          align-items: center;
        }

        .center {
          min-width: 0;
        }

        .dots {
          margin-top: var(--ddd-spacing-3);
        }

        /* Mobile-friendly */
        @media (max-width: 650px) {
          .frame {
            padding: var(--ddd-spacing-4);
          }
          .row {
            grid-template-columns: 44px 1fr 44px;
          }
        }

        .devNote {
          margin-top: var(--ddd-spacing-3);
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-slateGray);
        }
      `
    ];
  }

  render() {
    return html`
      <div
        class="frame"
        @play-list-index-changed=${this._onDotIndexChange}
        @play-list-arrow=${this._onArrow}
      >
        <div class="row">
          <!-- TODO: disable state should reflect loop behavior -->
          <slide-arrow direction="prev" ?disabled=${this._prevDisabled()}></slide-arrow>

          <div class="center">
            <!-- Active slide is shown by play-list-slide [active] styles -->
            <slot></slot>

            <div class="dots">
              <!-- TODO: slide-indicator will render dots based on count and highlight current -->
              <slide-indicator .count=${this.slidesCount} .index=${this.index}></slide-indicator>
            </div>

            <div class="devNote">
              Update checkpoint: index=${this.index}, slides=${this.slidesCount}.
              <!-- TODO: remove this debug line in final -->
            </div>
          </div>

          <slide-arrow direction="next" ?disabled=${this._nextDisabled()}></slide-arrow>
        </div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(PlaylistComponent.tag, PlaylistComponent);