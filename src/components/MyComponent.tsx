import { ReactNode } from "react";
import useSlot from "../module";

const MyComponent = ({ children }: { children: ReactNode }) => {
  const Slot = useSlot(children);

  return (
    <div>
      <fieldset>
        <legend>header</legend>
        <Slot name="header" />
      </fieldset>
      <fieldset>
        <legend>world</legend>
        <Slot name="world" />
      </fieldset>
      <fieldset>
        <legend>default</legend>
        <Slot />
      </fieldset>
    </div>
  );
};

export default MyComponent;
