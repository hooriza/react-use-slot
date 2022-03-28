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
      <fieldset>
        <legend>fallback</legend>
        <Slot name="fallback">
          fallback
        </Slot>
      </fieldset>
      <fieldset>
        <legend>loop</legend>
        <ul>
          {['foo', 'bar', 'baz'].map((item, index) => {
            return <Slot key={index} name="listitem" data={item} />;
          })}
        </ul>
      </fieldset>
    </div>
  );
};

export default MyComponent;
