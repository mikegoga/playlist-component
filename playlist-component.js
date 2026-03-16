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
      loop: { type: Boolean, reflect: true },
      slidesCount: { type: Number }
    };
  }

  constructor() {
    super();
    this.index = 0;
    this.loop = true;
    this.slidesCount = 0;
  }

  firstUpdated() {
    const slot = this.shadowRoot.querySelector("slot");
    if (slot) {
      slot.addEventListener("slotchange", () => this._syncSlides());
    }
    this._syncSlides();
  }

  updated(changedProps) {
    if (changedProps.has("index")) {
      this._syncSlides();
    }
  }

  _getSlides() {
    return Array.from(this.querySelectorAll(":scope > play-list-slide"));
  }

  _syncSlides() {
    const slides = this._getSlides();
    this.slidesCount = slides.length;

    if (this.slidesCount === 0) {
      this.index = 0;
      return;
    }

    if (this.index < 0) this.index = 0;
    if (this.index > this.slidesCount - 1) this.index = this.slidesCount - 1;

    slides.forEach((slide, i) => {
      slide.active = i === this.index;
    });
  }

  _onIndexChanged(e) {
    const next = Number(e.detail?.index);
    if (Number.isFinite(next)) {
      this.index = next;
    }
  }

  _onArrow(e) {
    const dir = e.detail?.direction;
    if (dir === "prev") this._prev();
    if (dir === "next") this._next();
  }

  _prev() {
    if (this.slidesCount === 0) return;

    if (this.index === 0) {
      if (this.loop) {
        this.index = this.slidesCount - 1;
      }
    } else {
      this.index -= 1;
    }
  }

  _next() {
    if (this.slidesCount === 0) return;

    if (this.index === this.slidesCount - 1) {
      if (this.loop) {
        this.index = 0;
      }
    } else {
      this.index += 1;
    }
  }

  _disablePrev() {
    return !this.loop && this.index === 0;
  }

  _disableNext() {
    return !this.loop && this.index === this.slidesCount - 1;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          max-width: 1200px;
          margin: 0 auto;
        }

        .frame {
          position: relative;
          border: var(--ddd-border-sm);
          border-radius: var(--ddd-radius-xl, 20px);
          padding: var(--ddd-spacing-6);
          background: #eef2f5;
          box-shadow: var(--ddd-boxShadow-sm);
          overflow: hidden;
        }

        /* subtle background pattern */
        .frame::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.25;
          background-image:
            repeating-linear-gradient(
              165deg,
              transparent 0px,
              transparent 34px,
              rgba(255, 255, 255, 0.65) 34px,
              rgba(255, 255, 255, 0.65) 36px,
              transparent 36px,
              transparent 120px
            );
        }

        .row {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 64px minmax(0, 1fr) 64px;
          align-items: center;
          gap: var(--ddd-spacing-4);
          min-height: 420px;
        }

        .center {
          min-width: 0;
          width: 100%;
        }

        .dots {
          margin-top: var(--ddd-spacing-4);
          display: flex;
          justify-content: flex-start;
        }

        @media (max-width: 768px) {
          :host {
            max-width: 100%;
          }

          .frame {
            padding: var(--ddd-spacing-4);
          }

          .row {
            grid-template-columns: 48px minmax(0, 1fr) 48px;
            gap: var(--ddd-spacing-2);
            min-height: 320px;
          }
        }

        @media (max-width: 520px) {
          .frame {
            padding: var(--ddd-spacing-3);
          }

          .row {
            grid-template-columns: 44px minmax(0, 1fr) 44px;
          }
        }
      `
    ];
  }

  render() {
    return html`
      <div
        class="frame"
        @play-list-index-changed=${this._onIndexChanged}
        @play-list-arrow=${this._onArrow}
      >
        <div class="row">
          <slide-arrow
            direction="prev"
            ?disabled=${this._disablePrev()}
          ></slide-arrow>

          <div class="center">
            <slot></slot>

            <div class="dots">
              <slide-indicator
                .count=${this.slidesCount}
                .index=${this.index}
              ></slide-indicator>
            </div>
          </div>

          <slide-arrow
            direction="next"
            ?disabled=${this._disableNext()}
          ></slide-arrow>
        </div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(PlaylistComponent.tag, PlaylistComponent);