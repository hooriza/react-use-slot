import MyComponent from './MyComponent';
import { Fragment } from "../module";

const App = () => {
  return (
    <div className="App">
      <MyComponent>
        <h1 className="foo" slot="header">H1 in <code>header</code> slot</h1>
        <h1>H1 in <code>default</code> slot</h1>
        <h2>H2 in <code>default</code> slot</h2>
        <Fragment slot="header">
          Fragment in <code>header</code> slot
        </Fragment>
        {1234}
        hello
        <h2 slot="world">
          H2 in <code>world</code> slot
        </h2>
        world
        <strong>strong in <code>default</code> slot</strong>
        <div>div in <code>default</code> slot</div>
        <li slot="listitem">
          {(item: string) => <Fragment>{item}</Fragment>}
        </li>
      </MyComponent>
    </div>
  );
}

export default App;
