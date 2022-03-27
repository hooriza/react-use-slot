import { createElement, cloneElement, Fragment, ReactNode } from "react";
import { Children } from "react";

const useSlot = (children: ReactNode) => {
  const slots = Children.toArray(children).reduce<
    Record<string, ReturnType<typeof Children.toArray>>
  >((slots, child) => {
    if (typeof child === "object" && "props" in child && child.props.slot) {
      const slotName = child.props.slot;
      return {
        ...slots,
        [slotName]: [
          ...(slots[slotName] ?? []),
          cloneElement(child, { slot: undefined })
        ]
      };
    }

    return {
      ...slots,
      default: [...(slots["default"] ?? []), child]
    };
  }, {});

  return ({ name = "default" }: { name?: string }) =>
    createElement(Fragment, {}, slots[name]);
};

export default useSlot;
