import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlayListSlide extends DDD {
  static get tag() {
    return "play-list-slide";
  }

  static get properties() {
    return {
      ...super.properties,
      topHeading: { type: String, attribute: "top-heading" },
      secondHeading: { type: String, attribute: "second-heading" },
      active: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.topHeading = "";
    this.secondHeading = "";
    this.active = false;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: none;
        }
        :host([active]) {
          display: block;
        }
        .top {
          font-size: var(--ddd-font-size-xs);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ddd-theme-primary);
          font-weight: var(--ddd-font-weight-bold);
          margin-bottom: var(--ddd-spacing-2);
        }
        .title {
          font-size: var(--ddd-font-size-xl);
          font-weight: var(--ddd-font-weight-bold);
          margin: 0 0 var(--ddd-spacing-3) 0;
        }
        .content {
          border: var(--ddd-border-sm);
          border-radius: var(--ddd-radius-lg);
          padding: var(--ddd-spacing-4);
          background: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-coalyGray);
          max-height: 180px;
          overflow: auto;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="top">${this.topHeading}</div>
      <h2 class="title">${this.secondHeading}</h2>
      <div class="content"><slot></slot></div>

      <!-- TODO: support “image mode” / richer layouts if required -->
    `;
  }
}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);