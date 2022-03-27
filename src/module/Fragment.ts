import { createElement, Fragment as ReactFragment } from "react";

const Fragment = ({ children, ...props }: Parameters<typeof ReactFragment>[0]) => {
    console.log({ type: ReactFragment });
    return createElement(ReactFragment, {}, children);
};
export default Fragment;
