import type { PrecacheEntry, RouteMatchCallbackOptions, SerwistGlobalConfig } from "serwist";
import { NetworkFirst, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const isNavigationRequest = ({ request }: RouteMatchCallbackOptions): boolean => request.mode === "navigate";

const isStaticAssetRequest = ({ request, url }: RouteMatchCallbackOptions): boolean => {
  const isSameOrigin = url.origin === self.location.origin;
  if (!isSameOrigin) return false;

  return (
    request.destination === "script"
    || request.destination === "style"
    || request.destination === "image"
    || request.destination === "font"
    || url.pathname.startsWith("/_next/static/")
  );
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      matcher: isNavigationRequest,
      handler: new NetworkFirst({
        cacheName: "pages-network-first",
        networkTimeoutSeconds: 6,
      }),
    },
    {
      matcher: isStaticAssetRequest,
      handler: new NetworkFirst({
        cacheName: "assets-network-first",
        networkTimeoutSeconds: 4,
      }),
    },
  ],
});

serwist.addEventListeners();
