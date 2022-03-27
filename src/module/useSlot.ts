import { createElement, Fragment, ReactNode } from "react";
import { Children } from "react";

declare namespace JSX {
  interface IntrinsicAttributes {
    slot?: string;
  }
}

const useSlot = (children: ReactNode) => {
  const slots = Children.toArray(children).reduce<
    Record<string, ReturnType<typeof Children.toArray>>
  >((slots, child) => {
    const slotName: string =
      typeof child === "object" && "props" in child && child.props.slot
        ? child.props.slot
        : "default";

    return {
      ...slots,
      [slotName]: [...(slots[slotName] ?? []), child]
    };
  }, {});

  return ({ name = 'default' }: { name?: string }) =>
    createElement(Fragment, {}, slots[name]);
};

export default useSlot;
