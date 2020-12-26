import { useScrollDirection } from '../useScrollDirection'
import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks'
import {
  isBrowser,
  getScrollTop,
  getScrollLeft,
  addScrollListener,
  removeScrollListener,
} from '../domUtils'

jest.mock('../domUtils', () => ({
  isBrowser: jest.fn(() => true),
  getScrollTop: jest.fn(() => 0),
  getScrollLeft: jest.fn(() => 0),
  addScrollListener: jest.fn(),
  removeScrollListener: jest.fn(),
}))

function mockListener(fn: jest.Mock) {
  const api = {
    listener: () => null,
  }
  fn.mockImplementation((listener) => {
    api.listener = listener
  })
  return api
}

export function mockGetScrollTop(value: number) {
  ;(getScrollTop as jest.Mock).mockReturnValue(value)
}

export function mockGetScrollLeft(value: number) {
  ;(getScrollLeft as jest.Mock).mockReturnValue(value)
}

export function mockRemoveScrollListener() {
  return mockListener(removeScrollListener as jest.Mock)
}

export function mockAddScrollListener() {
  return mockListener(addScrollListener as jest.Mock)
}

export function mockIsBrowser(result = true) {
  ;(isBrowser as jest.Mock).mockReturnValue(result)
}

interface ScenarioOptions {
  target?: HTMLElement
  isBrowser?: boolean
  scrollTopAfterScroll?: number
  scrollTopBeforeScroll?: number
  scrollLeftAfterScroll?: number
  scrollLeftBeforeScroll?: number
}

function mockScenario({
  target,
  isBrowser = true,
  scrollTopBeforeScroll = 0,
  scrollTopAfterScroll = 0,
  scrollLeftBeforeScroll = 0,
  scrollLeftAfterScroll = 0,
}: ScenarioOptions = {}) {
  let hook: RenderHookResult<unknown, ReturnType<typeof useScrollDirection>>

  mockIsBrowser(isBrowser)
  mockGetScrollTop(scrollTopBeforeScroll)
  mockGetScrollLeft(scrollLeftBeforeScroll)
  mockRemoveScrollListener()
  const scroll = mockAddScrollListener()

  const scenario = {
    scrollListener: scroll.listener,
    getHook() {
      return hook!
    },
    renderHook() {
      hook = renderHook(() => useScrollDirection(target))
      scenario.scrollListener = scroll.listener
      return scenario
    },
    scroll() {
      mockGetScrollTop(scrollTopAfterScroll)
      mockGetScrollLeft(scrollLeftAfterScroll)
      act(() => {
        scroll.listener()
      })
      return scenario
    },
    unmount() {
      hook!.unmount()
      return scenario
    },
    async waitForNextUpdate() {
      await hook!.waitForNextUpdate()
      return scenario
    },
    shouldReportAsNotScrolling() {
      expect(hook!.result.current.isScrolling).toBe(false)
      expect(hook!.result.current.isScrollingX).toBe(false)
      expect(hook!.result.current.isScrollingY).toBe(false)
      expect(hook!.result.current.isScrollingUp).toBe(false)
      expect(hook!.result.current.isScrollingDown).toBe(false)
      expect(hook!.result.current.isScrollingLeft).toBe(false)
      expect(hook!.result.current.isScrollingRight).toBe(false)
      expect(hook!.result.current.scrollDirection).toBe(null)
      return scenario
    },
    shouldReportAsScrollingUp() {
      expect(hook!.result.current.isScrolling).toBe(true)
      expect(hook!.result.current.isScrollingX).toBe(false)
      expect(hook!.result.current.isScrollingY).toBe(true)
      expect(hook!.result.current.isScrollingUp).toBe(true)
      expect(hook!.result.current.isScrollingDown).toBe(false)
      expect(hook!.result.current.isScrollingLeft).toBe(false)
      expect(hook!.result.current.isScrollingRight).toBe(false)
      expect(hook!.result.current.scrollDirection).toBe('UP')
      return scenario
    },
    shouldReportAsScrollingDown() {
      expect(hook!.result.current.isScrolling).toBe(true)
      expect(hook!.result.current.isScrollingX).toBe(false)
      expect(hook!.result.current.isScrollingY).toBe(true)
      expect(hook!.result.current.isScrollingUp).toBe(false)
      expect(hook!.result.current.isScrollingDown).toBe(true)
      expect(hook!.result.current.isScrollingLeft).toBe(false)
      expect(hook!.result.current.isScrollingRight).toBe(false)
      expect(hook!.result.current.scrollDirection).toBe('DOWN')
      return scenario
    },
    shouldReportAsScrollingRight() {
      expect(hook!.result.current.isScrolling).toBe(true)
      expect(hook!.result.current.isScrollingX).toBe(true)
      expect(hook!.result.current.isScrollingY).toBe(false)
      expect(hook!.result.current.isScrollingUp).toBe(false)
      expect(hook!.result.current.isScrollingDown).toBe(false)
      expect(hook!.result.current.isScrollingLeft).toBe(false)
      expect(hook!.result.current.isScrollingRight).toBe(true)
      expect(hook!.result.current.scrollDirection).toBe('RIGHT')
      return scenario
    },
    shouldReportAsScrollingLeft() {
      expect(hook!.result.current.isScrolling).toBe(true)
      expect(hook!.result.current.isScrollingX).toBe(true)
      expect(hook!.result.current.isScrollingY).toBe(false)
      expect(hook!.result.current.isScrollingUp).toBe(false)
      expect(hook!.result.current.isScrollingDown).toBe(false)
      expect(hook!.result.current.isScrollingLeft).toBe(true)
      expect(hook!.result.current.isScrollingRight).toBe(false)
      expect(hook!.result.current.scrollDirection).toBe('LEFT')
      return scenario
    },
    shouldDeregisterScrollListener() {
      expect(removeScrollListener).toHaveBeenCalledWith(scroll.listener, undefined)
    },
  }

  return scenario
}

describe('Given `useScrollDirection`', () => {
  describe('By default', () => {
    it('should monitor scroll on the `document`', () => {
      const { unmount, scrollListener } = mockScenario({
        scrollTopBeforeScroll: 10,
        scrollTopAfterScroll: 20,
      })
        .renderHook()
        .scroll()

      expect(getScrollTop).toBeCalledWith(undefined)
      expect(addScrollListener).toBeCalledWith(scrollListener, undefined)

      unmount()

      expect(removeScrollListener).toBeCalledWith(scrollListener, undefined)
    })
  })

  describe('When targeting and `element`', () => {
    it('should monitor scroll on the element', () => {
      const target = document.createElement('div')
      const { unmount, scrollListener } = mockScenario({
        target,
        scrollTopBeforeScroll: 10,
        scrollTopAfterScroll: 20,
      })
        .renderHook()
        .scroll()

      expect(getScrollTop).toBeCalledWith(target)
      expect(addScrollListener).toBeCalledWith(scrollListener, target)

      unmount()

      expect(removeScrollListener).toBeCalledWith(scrollListener, target)
    })
  })

  describe('When not in browser', () => {
    it('should do nothing', () => {
      mockScenario({
        isBrowser: false,
        scrollTopBeforeScroll: 10,
        scrollTopAfterScroll: 20,
      })
        .renderHook()
        .scroll()
        .shouldReportAsNotScrolling()
    })
  })

  describe('When in browser', () => {
    describe('When scrolling down', () => {
      it('should return `DOWN`', () => {
        mockScenario({
          scrollTopBeforeScroll: 10,
          scrollTopAfterScroll: 20,
        })
          .renderHook()
          .scroll()
          .shouldReportAsScrollingDown()
      })
    })

    describe('When scrolling up', () => {
      it('should report as scrolling `UP`', () => {
        mockScenario({
          scrollTopBeforeScroll: 20,
          scrollTopAfterScroll: 10,
        })
          .renderHook()
          .scroll()
          .shouldReportAsScrollingUp()
      })
    })

    describe('When scrolling right', () => {
      it('should return `RIGHT`', () => {
        mockScenario({
          scrollLeftBeforeScroll: 0,
          scrollLeftAfterScroll: 10,
        })
          .renderHook()
          .scroll()
          .shouldReportAsScrollingRight()
      })
    })

    describe('When scrolling left', () => {
      it('should return `LEFT`', () => {
        mockScenario({
          scrollLeftBeforeScroll: 30,
          scrollLeftAfterScroll: 20,
        })
          .renderHook()
          .scroll()
          .shouldReportAsScrollingLeft()
      })
    })

    describe('When unmounted', () => {
      it('should deregister scroll listener', () => {
        mockScenario({
          scrollTopBeforeScroll: 20,
          scrollTopAfterScroll: 10,
        })
          .renderHook()
          .unmount()
          .shouldDeregisterScrollListener()
      })
    })
  })
})
