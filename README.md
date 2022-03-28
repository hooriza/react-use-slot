# react-use-slot

> Inspired by https://vuejs.org/guide/components/slots.html

## Usage

### Installation
```
$ npm install react-use-slot
```

### Write your code
```jsx
import useSlot from 'react-use-slot';

const App = () => (
  <MyComponent>
    <div slot="header">HEADER</div>
    <p slot="footer">FOOTER</p>
    CONTENT
  </MyComponent>
);

const MyComponent = ({ children }) => {
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
      </header>
      <button>
        <Slot name="button">
          fallback
        </Slot>
      </button>
    </div>
  );
};
```

### Result
```html
<div class="my-component">
  <header>
    <div>HEADER</div>
  </header>
  <main class="content">
    CONTENT
  </main>
  <footer>
    <p>FOOTER</p>
  </footer>
  <button>
    fallback
  </button>
</div>
```

## To avoid react warning with `React.Fragment`

Using the `slot` attribute with `React.Fragment` will cause a warning.

```jsx
import React from 'react';

// Warning: Invalid prop `slot` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.
<React.Fragment slot="foo">Foo</React.Fragment>
```

This warning doesn't affect the behavior,
but if you want the warning not to be raised, import the `Fragment` from `react-use-slot` and use it.

```jsx
import { Fragment } from 'react-use-slot';

<Fragment slot="foo">Foo</Fragment>
```
