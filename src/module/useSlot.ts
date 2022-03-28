import { createElement, cloneElement, Fragment, ReactNode } from "react";
import { Children } from "react";

const useSlot = (children: ReactNode) => {
  const slots = Children.toArray(children).reduce<
    Partial<Record<string, ReturnType<typeof Children.toArray>>>
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

  return ({
    name = "default",
    data,
    children
  }: {
    name?: string;
    data?: unknown;
    children?: ReactNode;
  }) => {
    let slot = slots[name];

    if (data && slot) {
      slot = slot.map((child) =>
        typeof child === "object" && "props" in child
          ? cloneElement(child, {}, child.props.children(data))
          : child
      );
    }
    return createElement(Fragment, {}, slot ?? children);
  };
};

export default useSlot;
