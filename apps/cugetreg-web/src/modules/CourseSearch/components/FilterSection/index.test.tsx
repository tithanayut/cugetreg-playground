import { DayOfWeekEnum, GenEdTypeEnum } from '@thinc-org/chula-courses'
import { shallow } from 'enzyme'

import { ResponsiveDialog } from '@web/common/components/ResponsiveDialog'
import { Analytics } from '@web/common/context/Analytics/components/Analytics'
import { DAY_FILTER, GENED_FILTER } from '@web/common/context/Analytics/constants'

import { Button, StickyPaper } from './styled'

describe('FilterSection', () => {
  const MOCK_HASTAG = true
  const MOCK_QUERY = 'query'

  const mockUseMediaQuery = jest.fn()
  const mockUseFilterBar = jest.fn(() => ({
    checkboxes: [],
  }))
  const mockUseHasTags = jest.fn(() => MOCK_HASTAG)
  const mockHandleClose = jest.fn()
  const mockUseTheme = jest.fn(() => ({
    breakpoints: {
      up: jest.fn(() => MOCK_QUERY),
    },
  }))

  jest.doMock('@mui/material/useMediaQuery', () => mockUseMediaQuery)
  jest.doMock('./hooks/useFilterBar', () => ({ useFilterBar: mockUseFilterBar }))
  jest.doMock('../TagList', () => ({ useHasTags: mockUseHasTags }))
  jest.doMock('@mui/material', () => ({
    ...(jest.requireActual('@mui/material') as any),
    useTheme: mockUseTheme,
  }))

  afterEach(() => {
    jest.clearAllMocks()
  })

  it.each`
    matchSmallScreen | isExpandFilter
    ${true}          | ${true}
    ${true}          | ${false}
    ${false}         | ${true}
    ${false}         | ${false}
  `(
    'Should matched snapshot correctly when matchSmallScreen=$matchSmallScreen and isExpandFilter=$isExpandFilter',
    async ({ matchSmallScreen, isExpandFilter }) => {
      const { FilterSection } = await import('.')
      const mockHandleClose = jest.fn()
      mockUseMediaQuery.mockReturnValue(matchSmallScreen)

      const wrapper = shallow(<FilterSection open={isExpandFilter} handleClose={mockHandleClose} />)

      expect(mockUseMediaQuery).toBeCalledWith(MOCK_QUERY)
      expect(mockUseTheme).toBeCalledTimes(1)
      expect(mockUseHasTags).toBeCalledTimes(1)
      expect(mockUseFilterBar).toBeCalledTimes(2)
      expect(mockUseFilterBar).toHaveBeenNthCalledWith(
        1,
        [
          {
            label: '???????????????????????????',
            value: GenEdTypeEnum.SC,
          },
          {
            label: '???????????????????????????',
            value: GenEdTypeEnum.SO,
          },
          {
            label: '??????????????????????????????',
            value: GenEdTypeEnum.HU,
          },
          {
            label: '?????????????????????',
            value: GenEdTypeEnum.IN,
          },
          {
            label: '?????????????????? GenEd',
            value: GenEdTypeEnum.NO,
          },
        ],
        'genEdTypes'
      )
      expect(mockUseFilterBar).toHaveBeenNthCalledWith(
        2,
        [
          {
            label: '???????????????????????????',
            value: DayOfWeekEnum.Monday,
          },
          {
            label: '???????????????????????????',
            value: DayOfWeekEnum.Tuesday,
          },
          {
            label: '??????????????????',
            value: DayOfWeekEnum.Wednesday,
          },
          {
            label: '?????????????????????????????????',
            value: DayOfWeekEnum.Thursday,
          },
          {
            label: '????????????????????????',
            value: DayOfWeekEnum.Friday,
          },
          {
            label: '????????????????????????',
            value: DayOfWeekEnum.Saturday,
          },
          {
            label: '??????????????????????????????',
            value: DayOfWeekEnum.Sunday,
          },
        ],
        'dayOfWeeks'
      )

      if (!matchSmallScreen) {
        expect(wrapper.find(ResponsiveDialog).prop('onClose')).toBe(mockHandleClose)
        expect(wrapper.find(Button).prop('onClick')).toBe(mockHandleClose)
      }
      if (matchSmallScreen && isExpandFilter) {
        expect(wrapper.find(StickyPaper).prop('hasTags')).toBe(MOCK_HASTAG)
      }
      expect(wrapper).toMatchSnapshot()
    }
  )

  it.each`
    matchSmallScreen | isExpandFilter
    ${true}          | ${true}
    ${false}         | ${true}
    ${false}         | ${false}
  `(
    'Should render CheckboxGroup of GenEds correctly when when matchSmallScreen=$matchSmallScreen and isExpandFilter=$isExpandFilter',
    async ({ matchSmallScreen, isExpandFilter }) => {
      const { FilterSection } = await import('.')
      mockUseMediaQuery.mockReturnValue(matchSmallScreen)

      const wrapper = shallow(<FilterSection open={isExpandFilter} handleClose={mockHandleClose} />)
        .find(Analytics)
        .findWhere((n) => n.prop('elementName') === GENED_FILTER)
        .renderProp('children')({ log: () => {} })
      expect(wrapper).toMatchSnapshot()
    }
  )

  it.each`
    matchSmallScreen | isExpandFilter
    ${true}          | ${true}
    ${false}         | ${true}
    ${false}         | ${false}
  `(
    'Should render CheckboxGroup of days correctly when matchSmallScreen=$matchSmallScreen and isExpandFilter=$isExpandFilter',
    async ({ matchSmallScreen, isExpandFilter }) => {
      const { FilterSection } = await import('.')
      mockUseMediaQuery.mockReturnValue(matchSmallScreen)

      const wrapper = shallow(<FilterSection open={isExpandFilter} handleClose={mockHandleClose} />)
        .find(Analytics)
        .findWhere((n) => n.prop('elementName') === DAY_FILTER)
        .renderProp('children')({ log: () => {} })
      expect(wrapper).toMatchSnapshot()
    }
  )
})
