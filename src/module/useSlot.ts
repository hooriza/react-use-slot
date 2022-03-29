import { createElement, cloneElement, Fragment, ReactNode } from "react";
import { Children } from "react";

interface SlotProps {
  name?: string;
  data?: unknown;
  children?: ReactNode;
}

const createSlot = (
  slots: Partial<Record<string, ReturnType<typeof Children.toArray>>>
) => ({
  name = "default",
  data,
  children
}: SlotProps) => {
  let slot = slots[name];

  if (typeof data !== 'undefined' && slot) {

    slot = slot.map((child) => {
      if (typeof child === "object" && "props" in child) {
        if (process.env.NODE_ENV === 'development' && typeof child.props.children !== 'function') {
          throw new Error(`The children of a component using "${name}" slot must be a function`);
        }
        return cloneElement(child, {}, child.props.children(data));
      }
      return child;
    });
  }

  return createElement(Fragment, {}, slot ?? children);
};

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

  return createSlot(slots);
};

export default useSlot;
