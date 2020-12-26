import 'react-app-polyfill/ie11'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import styled from 'styled-components'
import { useState, useCallback } from 'react'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { ScrollDirection, useScrollDirection } from '../../dist'
import { Container, CssBaseline, StylesProvider } from '@material-ui/core'
import { BrowserRouter, Switch, Route, useLocation, Link } from 'react-router-dom'

const RootContainer = styled(Container)`
  padding-top: 100px;
  display: grid;
  grid-row-gap: 100px;
`

const ButtonsPane = styled.div`
  display: flex;
  justify-content: center;
  background: white;
  padding-top: 100px;
  padding-bottom: 100px;
  border-bottom: solid 4px lightgray;
`

const ScrollContainerWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`

const ScrollContainer = styled.div`
  height: 600px;
  width: 1200px;
  border: solid 4px lightgray;
  overflow-y: scroll;
  overflow-x: scroll;
  padding: 20px;
  position: relative;
`

const ScrollableElementRoot = styled.div`
  display: grid;
  grid-row-gap: 40px;
`

const LongPane = styled.div`
  width: 5000px;
  height: 5000px;
`

const AbsoluteCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
`

const FixedCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
`

const Heading = styled.div`
  display: flex;
  justify-content: center;
  font-size: 50px;
`

const DirectionText = styled.div.attrs({
  'aria-label': 'Direction text',
})`
  display: flex;
  justify-content: center;
  font-size: 50px;
  min-width: 10px;
  min-height: 10px;
`

const WindowScrollingRoot = styled.div`
  position: absolute;
`

function App() {
  return (
    <StylesProvider injectFirst>
      <BrowserRouter>
        <CssBaseline />
        <AppDetails />
      </BrowserRouter>
    </StylesProvider>
  )
}

function AppDetails() {
  const location = useLocation()
  const [path, setPath] = useState(location.pathname)
  const handlePathChange = (_, newPath) => {
    if (newPath) setPath(newPath)
  }
  return (
    <>
      <ButtonsPane>
        <ToggleButtonGroup
          value={path}
          onChange={handlePathChange}
          aria-label="Scrolling type"
          exclusive>
          <ToggleButton value="/" aria-label="element" component={Link} to="/">
            Element scrolling
          </ToggleButton>
          <ToggleButton value="/window" aria-label="window" component={Link} to="/window">
            Window scrolling
          </ToggleButton>
        </ToggleButtonGroup>
      </ButtonsPane>

      <Switch>
        <Route path="/window">
          <WindowScrolling />
        </Route>
        <Route path="/">
          <ElementScrolling />
        </Route>
      </Switch>
    </>
  )
}

function WindowScrolling() {
  const { scrollDirection } = useScrollDirection()

  return (
    <WindowScrollingRoot aria-label="Window example">
      <LongPane />
      <FixedCentered>
        <DirectionText>{scrollDirection}</DirectionText>
      </FixedCentered>
    </WindowScrollingRoot>
  )
}

function ElementScrolling() {
  return (
    <RootContainer>
      <WithScrollTargetRef />
      <WithSuppliedTarget />
    </RootContainer>
  )
}

function WithScrollTargetRef() {
  const { scrollDirection, scrollTargetRef } = useScrollDirection()
  return (
    <ScrollableElement
      heading="Using the `scrollTargetRef`"
      aria-label="scrollTargetRef example"
      scrollDirection={scrollDirection}
      scrollTargetRef={scrollTargetRef}
    />
  )
}

function WithSuppliedTarget() {
  const [scrollTargetRef, target] = useCallbackRef()
  const { scrollDirection } = useScrollDirection(target)
  return (
    <ScrollableElement
      heading="Using a supplied target element"
      aria-label="Supplied target example"
      scrollDirection={scrollDirection}
      scrollTargetRef={scrollTargetRef}
    />
  )
}

interface ScrollableElementProps {
  heading: string
  scrollTargetRef: any
  scrollDirection: ScrollDirection
  [key: string]: any
}

function ScrollableElement({
  heading,
  scrollTargetRef,
  scrollDirection,
  ...otherProps
}: ScrollableElementProps) {
  return (
    <ScrollableElementRoot {...otherProps}>
      <Heading>{heading}</Heading>
      <ScrollContainerWrapper>
        <ScrollContainer ref={scrollTargetRef} aria-label="Scrollable element">
          <LongPane />
        </ScrollContainer>
        <AbsoluteCentered>
          <DirectionText>{scrollDirection}</DirectionText>
        </AbsoluteCentered>
      </ScrollContainerWrapper>
    </ScrollableElementRoot>
  )
}

function useCallbackRef() {
  const [value, setValue] = React.useState<any>()
  const ref = useCallback((node: HTMLElement) => {
    if (node !== null) setValue(node)
  }, [])
  return [ref, value]
}

ReactDOM.render(<App />, document.getElementById('root'))
