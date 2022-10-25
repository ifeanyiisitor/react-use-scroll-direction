# react-use-scroll-direction
A react hook for detecting the scroll direction of the scrolling window or target element

```tsx
import { useScrollDirection } from 'react-use-scroll-direction'

function SomeComponent () {
  const { 
    isScrolling,
    isScrollingX,
    isScrollingY,
    isScrollingUp, 
    isScrollingDown,
    isScrollingLeft,
    isScrollingRight,
    scrollDirection,
  } = useScrollDirection()

  console.log(scrollDirection) // -> UP | DOWN | LEFT | RIGHT | null

  return (
    <div>
      {isScrolling ? 'Scrolling' : 'Not scrolling'}
      {isScrollingX && 'Scrolling horizontally'}
      {isScrollingY && 'Scrolling vertically'}
      {isScrollingUp && "Up"}
      {isScrollingDown && "Down"}
      {isScrollingLeft && "Left"}
      {isScrollingRight && "Right"}
    </div>
  )
}
```

It's possible for the scroll direction to be `null` and this occurs when the view port or target element stops being scrolled. 
Hence why the hook returns an object with properties for determining each direction. Just because we are not scrolling down,
doesn't mean that we are scrolling up.

## Installation

```bash
npm install react-use-scroll-direction
```

## Usage

### Detecting the scroll direction on the window

```tsx
import { useScrollDirection } from 'react-use-scroll-direction'

function SomeComponent () {
  const { isScrollingUp } = useScrollDirection()

  return (
    <div>
      {isScrollingUp && "Up"}
    </div>
  )
}
```

### Detecting the scroll direction of a target element


```tsx
import { useScrollDirection } from 'react-use-scroll-direction'

function SomeComponent () {
  const { isScrollingUp, scrollTargetRef } = useScrollDirection()

  return (
    <div>
      {isScrollingUp && "Up"}
      <ScrollableElement ref={scrollTargetRef}>
        <SomeLongContent />
      </ScrollableElement>
    </div>
  )
}
```

Or if you already have a reference to a target element, you can supply it as an arg
as follows:

```js
useScrollDirection(targetElement)
```
