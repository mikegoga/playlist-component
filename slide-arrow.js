import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

export class SlideArrow extends DDD {
  static get tag() {
    return "slide-arrow";
  }

  static get properties() {
    return {
      ...super.properties,
      direction: { type: String },
      disabled: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.direction = "next";
    this.disabled = false;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        button {
          width: 56px;
          height: 56px;
          border-radius: 999px;
          border: 3px solid #0d67be;
          background: transparent;
          color: #0d67be;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: transform 0.15s ease, opacity 0.15s ease, background 0.15s ease;
        }

        button:hover {
          background: rgba(13, 103, 190, 0.08);
        }

        button:focus-visible {
          outline: 3px solid rgba(13, 103, 190, 0.25);
          outline-offset: 4px;
        }

        .glyph {
          font-size: 2rem;
          line-height: 1;
          font-weight: 700;
          transform: translateY(-1px);
        }

        :host([disabled]) button {
          opacity: 0.35;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          button {
            width: 48px;
            height: 48px;
          }

          .glyph {
            font-size: 1.65rem;
          }
        }

        @media (max-width: 520px) {
          button {
            width: 44px;
            height: 44px;
            border-width: 2px;
          }

          .glyph {
            font-size: 1.45rem;
          }
        }
      `
    ];
  }

  _fire() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent("play-list-arrow", {
        bubbles: true,
        composed: true,
        detail: { direction: this.direction }
      })
    );
  }

  render() {
    const label = this.direction === "prev" ? "Previous slide" : "Next slide";
    const glyph = this.direction === "prev" ? "‹" : "›";

    return html`
      <button type="button" aria-label="${label}" @click=${this._fire}>
        <span class="glyph" aria-hidden="true">${glyph}</span>
      </button>
    `;
  }
}

globalThis.customElements.define(SlideArrow.tag, SlideArrow);