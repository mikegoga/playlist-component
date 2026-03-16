import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

export class SlideIndicator extends DDD {
  static get tag() {
    return "slide-indicator";
  }

  static get properties() {
    return {
      ...super.properties,
      count: { type: Number },
      index: { type: Number }
    };
  }

  constructor() {
    super();
    this.count = 0;
    this.index = 0;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .dots {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        button {
          width: 11px;
          height: 11px;
          border-radius: 999px;
          border: 0;
          padding: 0;
          background: rgba(24, 52, 95, 0.25);
          cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease, background 0.15s ease;
        }

        button:hover {
          transform: scale(1.08);
        }

        button[aria-current="true"] {
          background: #0d67be;
        }

        button:focus-visible {
          outline: 3px solid rgba(13, 103, 190, 0.22);
          outline-offset: 3px;
        }

        @media (max-width: 520px) {
          .dots {
            gap: 10px;
          }

          button {
            width: 10px;
            height: 10px;
          }
        }
      `
    ];
  }

  _pick(i) {
    this.dispatchEvent(
      new CustomEvent("play-list-index-changed", {
        bubbles: true,
        composed: true,
        detail: { index: i }
      })
    );
  }

  render() {
    return html`
      <div class="dots" role="tablist" aria-label="Slide selector">
        ${Array.from({ length: this.count }).map(
          (_, i) => html`
            <button
              type="button"
              role="tab"
              aria-label="Go to slide ${i + 1}"
              aria-current="${i === this.index}"
              @click=${() => this._pick(i)}
            ></button>
          `
        )}
      </div>
    `;
  }
}

globalThis.customElements.define(SlideIndicator.tag, SlideIndicator);