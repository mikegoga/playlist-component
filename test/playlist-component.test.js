import { html, fixture, expect } from '@open-wc/testing';
import "../playlist-component.js";

describe("PlaylistComponent test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <playlist-component
        title="title"
      ></playlist-component>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
