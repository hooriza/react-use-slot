# react-use-slot

> Inspired by https://vuejs.org/guide/components/slots.html

## Usage

### Installation
```
$ npm install react-use-slot
```

### Write your code
```jsx
import { Fragment, useSlot } from 'react-use-slot';

const App = () => (
  <MyComponent>
    <div slot="header">HEADER</div>
    <Fragment slot="footer">FOOTER</Fragment>
    CONTENT
  </MyComponent>
);

const MyComponent = ({ children }) => {
  const Slot = useSlot(children);

  return (
    <div className="my-component">
      <header><Slot name="header" /></header>
      <section className="content">
        <Slot />
      </section>
      <footer><Slot name="footer" /></header>
    </div>
  );
};
```

### Result
```html
<div class="my-component">
  <header>HEADER</header>
  <section class="content">CONTENT</section>
  <footer>FOOTER</footer>
</div>
```
