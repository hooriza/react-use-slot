# react-use-slot

> Inspired by https://vuejs.org/guide/components/slots.html

## Installation
```
$ npm install react-use-slot
```

## Slot Content and Outlet

```jsx
<FancyButton>
  Click me! <!-- slot content -->
</FancyButton>
```
```jsx
const FancyButton = ({ children }) => {
  const Slot = useSlot(children);
  return (
    <button className="fancy-btn">
      <Slot />
    </button>
  );
}
```

The final rendered DOM

```html
<button class="fancy-btn">
  Click me!
</button>
```

Frankly, you don't need to use `react-use-slot` for this purpose.
You can write `FancyButton` component just like below.

```jsx
const FancyButton = ({ children }) => {
  return (
    <button className="fancy-btn">
      {children}
    </button>
  );
}
```

Well.. How about next case?

## Fallback Content

You can place the fallback content inside `Slot` tag

```jsx
const SubmitButton = ({ children }) => {
  const Slot = useSlot(children);
  return (
    <button type="submit">
      <Slot>Submit</Slot>
    </button>
  );
}
```

When you use `SubmitButton` that has no content

```jsx
<SubmitButton />
```

This will render the fallback content, "Submit".

```html
<button type="submit">Submit</button>
```

Or use it with content

```jsx
<SubmitButton>Save</SubmitButton>
```

it's rendered DOM

```html
<button type="submit">Save</button>
```

Hmm... You don't need to use this package for this purpose either.
You can write just like below. React is powerful enough.

```jsx
const FancyButton = ({ children }) => {
  return (
    <button className="fancy-btn">
      {children ?? 'Save'}
    </button>
  );
}
```

Last. What about the following cases?

## Named Slots

Finally, there are why you need `react-use-slot` from here.

```jsx
<MyComponent>
  <div slot="header">HEADER</div>
  <p slot="footer">FOOTER</p>
  CONTENT
</MyComponent>
```
```jsx
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
    </div>
  );
};
```

This will render below DOM

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
</div>
```

## Scoped Slots

There are cases when the parent scope needs data provided from the child.

In this case, how to show the data with slot?

```jsx
const List = () => {
  const Slot = useSlot();
  const dataList = ['foo', 'bar', 'baz'];

  return (
    <>
      <header><Slot name="header" /></header>
      <ul>
        {dataList.map((data) => <Slot name="item" />)}
      </ul>
    </>
  )
}
```
```jsx
<List>
  <h1 slot="header">Title</h1>
  <li slot="item">How to show data??</li>
</List>
```

You can do it like below.

```jsx
const List = () => {
  const Slot = useSlot();
  const dataList = ['foo', 'bar', 'baz'];

  return (
    <>
      <header><Slot name="header" /></header>
      <ul>
        {dataList.map((data) => (
          <Slot key={data} name="item" data={data} />)
        )}
      </ul>
    </>
  )
}
```
```jsx
<List>
  <h1 slot="header">Title</h1>
  <li slot="item">{(data) => data}</li>
</List>
```

This will render below DOM

```html
<header><h1>Title</h1></header>
<ul>
  <li>foo</li>
  <li>bar</li>
  <li>baz</li>
</ul>
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
