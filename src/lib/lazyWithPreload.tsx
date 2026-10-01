import { lazy, type ComponentType } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PreloadableComponent<T extends ComponentType<any>> = T & {
  preload: () => Promise<unknown>;
};

/**
 * Like React.lazy, but exposes preload(). Once the module has loaded, the
 * component renders synchronously, so a preloaded route never suspends.
 */
export function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
): PreloadableComponent<T> {
  let loaded: T | undefined;
  let promise: Promise<{ default: T }> | undefined;

  const load = () => {
    if (!promise) {
      promise = factory().then(
        (mod) => {
          loaded = mod.default;
          return mod;
        },
        (error) => {
          promise = undefined;
          throw error;
        },
      );
    }
    return promise;
  };

  const Lazy = lazy(load);

  const Component = (props: any) => {
    const Target = (loaded ?? Lazy) as ComponentType<any>;
    return <Target {...props} />;
  };

  return Object.assign(Component, { preload: load }) as unknown as PreloadableComponent<T>;
}
