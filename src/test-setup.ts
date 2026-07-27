import "@testing-library/jest-dom";

// jsdom doesn't implement IntersectionObserver; provide a minimal mock so
// components using the useInView hook (scroll-reveal animations) can render.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = () => undefined;
  unobserve = () => undefined;
  disconnect = () => undefined;
  takeRecords = () => [];
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// jsdom doesn't implement Element.scrollTo/scrollBy; provide no-op stubs so
// components using native scroll (e.g. the promo carousel) can render.
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = function () {};
}
if (!Element.prototype.scrollBy) {
  Element.prototype.scrollBy = function () {};
}
