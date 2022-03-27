import { createElement, Fragment as ReactFragment } from "react";

const Fragment = ({ children }: Parameters<typeof ReactFragment>[0]) => {
  return createElement(ReactFragment, {}, children);
};

export default Fragment;
