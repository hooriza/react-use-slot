import renderer from "react-test-renderer";
import { useSlot } from ".";

test("FancyButton", () => {
  const FancyButton: React.FC = ({ children }) => {
    const Slot = useSlot(children);
    return (
      <button className="fancy-btn">
        <Slot />
      </button>
    );
  };

  expect(
    renderer.create(<FancyButton>Click me!</FancyButton>)
  ).toMatchSnapshot();
});

test("SubmitButton", () => {
  const SubmitButton: React.FC = ({ children }) => {
    const Slot = useSlot(children);
    return (
      <button type="submit">
        <Slot>Submit</Slot>
      </button>
    );
  };

  expect(renderer.create(<SubmitButton />)).toMatchSnapshot();
  expect(renderer.create(<SubmitButton>Save</SubmitButton>)).toMatchSnapshot();
});

test("SubmitButton", () => {
  const MyComponent: React.FC = ({ children }) => {
    const Slot = useSlot(children);

    return (
      <div className="my-component">
        <header>
          <Slot name="header" />
        </header>
        <main className="content">
          <Slot />
        </main>
        <footer>
          <Slot name="footer" />
        </footer>
      </div>
    );
  };

  expect(
    renderer.create(
      <MyComponent>
        <div slot="header">HEADER</div>
        <p slot="footer">FOOTER</p>
        CONTENT
      </MyComponent>
    )
  ).toMatchSnapshot();
});

test("List", () => {
  const List: React.FC = ({ children }) => {
    const Slot = useSlot(children);
    const dataList = ["foo", "bar", "baz"];

    return (
      <>
        <header>
          <Slot name="header" />
        </header>
        <ul>
          {dataList.map((data) => (
            <Slot name="item" />
          ))}
        </ul>
      </>
    );
  };

  expect(
    renderer.create(
      <List>
        <h1 slot="header">Title</h1>
        <li slot="item">How to show data??</li>
      </List>
    )
  ).toMatchSnapshot();
});

test("List with data", () => {
  const List: React.FC = ({ children }) => {
    const Slot = useSlot(children);
    const dataList = ["foo", "bar", "baz"];

    return (
      <>
        <header>
          <Slot name="header" />
        </header>
        <ul>
          {dataList.map((data) => (
            <Slot key={data} name="item" data={data} />
          ))}
        </ul>
      </>
    );
  };

  expect(
    renderer.create(
      <List>
        <h1 slot="header">Title</h1>
        <li slot="item">{(data: string) => data}</li>
      </List>
    )
  ).toMatchSnapshot();
});
