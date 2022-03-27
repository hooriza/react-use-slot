declare module "react-use-slot" {
  export const Fragment: typeof import('./lib').Fragment;
  export const useSlot: typeof import('./lib').useSlot;
  export default useSlot;
}

declare namespace JSX {
  interface IntrinsicAttributes {
    slot?: string;
  }
}
