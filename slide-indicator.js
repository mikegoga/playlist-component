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
        .dots {
          display: flex;
          gap: var(--ddd-spacing-2);
        }
        button {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 0;
          background: var(--ddd-theme-default-slateGray);
          opacity: 0.35;
          cursor: pointer;
        }
        button[aria-current="true"] {
          background: var(--ddd-theme-primary);
          opacity: 1;
        }
      `
    ];
  }

  _pick(i) {
    // This is the key “custom event bubbling” 
    this.dispatchEvent(
      new CustomEvent("play-list-index-changed", {
        bubbles: true,
        composed: true,
        detail: { index: i }
      })
    );

    // TODO: add keyboard support (Enter/Space) and roving tabindex
  }

  render() {
    return html`
      <div class="dots" role="tablist" aria-label="Slide selector">
        ${Array.from({ length: this.count }).map(
          (_, i) => html`
            <button
              type="button"
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