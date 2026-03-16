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
          width: 100%;
        }

        :host([active]) {
          display: block;
        }

        .wrap {
          max-width: 820px;
          padding: var(--ddd-spacing-4) var(--ddd-spacing-2);
        }

        .top {
          color: #0d67be;
          font-size: clamp(0.95rem, 1.2vw, 1.2rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: var(--ddd-spacing-3);
        }

        .title {
          margin: 0;
          color: #1f4690;
          font-weight: 800;
          line-height: 0.98;
          font-size: clamp(2.7rem, 6vw, 5.4rem);
          margin-bottom: var(--ddd-spacing-5);
        }

        .accent-line {
          width: 104px;
          height: 3px;
          background: #26a7f2;
          margin-bottom: var(--ddd-spacing-4);
          border-radius: 999px;
        }

        .content {
          max-width: 640px;
          max-height: 220px;
          overflow: auto;
          color: #18345f;
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          line-height: 1.5;
          padding-right: var(--ddd-spacing-2);
        }

        .content ::slotted(p) {
          margin-top: 0;
          margin-bottom: var(--ddd-spacing-3);
        }

        .content ::slotted(ul),
        .content ::slotted(ol) {
          margin-top: 0;
          margin-bottom: var(--ddd-spacing-3);
          padding-left: 1.25rem;
        }

        .content ::slotted(*) {
          color: inherit;
        }

        @media (max-width: 768px) {
          .wrap {
            max-width: 100%;
            padding: var(--ddd-spacing-2) 0;
          }

          .title {
            margin-bottom: var(--ddd-spacing-4);
          }

          .content {
            max-width: 100%;
            max-height: 180px;
          }
        }

        @media (max-width: 520px) {
          .top {
            margin-bottom: var(--ddd-spacing-2);
          }

          .title {
            line-height: 1.02;
          }

          .accent-line {
            width: 84px;
            margin-bottom: var(--ddd-spacing-3);
          }

          .content {
            max-height: 160px;
            font-size: 1rem;
          }
        }
      `
    ];
  }

  render() {
    return html`
      <div class="wrap">
        <div class="top">${this.topHeading}</div>
        <h2 class="title">${this.secondHeading}</h2>
        <div class="accent-line"></div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);