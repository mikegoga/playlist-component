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
        button {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: var(--ddd-border-sm);
          background: var(--ddd-theme-default-white);
          box-shadow: var(--ddd-boxShadow-sm);
          cursor: pointer;
        }
        :host([disabled]) button {
          opacity: 0.45;
          cursor: not-allowed;
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

    // TODO: support keyboard activation explicitly if needed (button already does Enter/Space)
  }

  render() {
    const glyph = this.direction === "prev" ? "‹" : "›";
    const label = this.direction === "prev" ? "Previous slide" : "Next slide";
    return html`
      <button type="button" aria-label="${label}" @click=${this._fire}>
        ${glyph}
      </button>
    `;
  }
}

globalThis.customElements.define(SlideArrow.tag, SlideArrow);