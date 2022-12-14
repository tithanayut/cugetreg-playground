import { Theme, TypographyVariant } from '@mui/material'
import { TypographyStyleOptions } from '@mui/material/styles/createTypography'

const baseTypographyVariantOptions: Record<TypographyVariant, TypographyStyleOptions> = {
  h1: {
    letterSpacing: 0,
    lineHeight: 'normal',
    fontSize: 40,
    fontWeight: 700,
  },
  h2: {
    letterSpacing: 0,
    lineHeight: 'normal',
    fontSize: 28,
    fontWeight: 700,
  },
  h3: {
    letterSpacing: 0,
    lineHeight: 'normal',
    fontSize: 24,
    fontWeight: 700,
  },
  h4: {
    letterSpacing: 0,
    lineHeight: 36,
    fontSize: 20,
    fontWeight: 700,
  },
  h5: {
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 18,
    fontWeight: 700,
  },
  h6: {
    letterSpacing: 0.15,
    lineHeight: 24,
    fontSize: 14,
    fontWeight: 500,
  },
  subtitle1: {
    letterSpacing: 0.15,
    lineHeight: 24,
    fontSize: 14,
    fontWeight: 500,
  },
  subtitle2: {
    letterSpacing: 0.1,
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 500,
  },
  body1: {
    letterSpacing: 0.5,
    lineHeight: 24,
    fontFamily: 'ChulaCharasNew',
    fontSize: 16,
    fontWeight: 400,
    fontFeatureSettings: '"liga" on',
  },
  body2: {
    letterSpacing: 0.25,
    lineHeight: 20,
    fontFamily: 'ChulaCharasNew',
    fontSize: 14,
    fontWeight: 400,
    fontFeatureSettings: '"liga" on',
  },
  button: {
    letterSpacing: 1.25,
    lineHeight: 28,
    fontSize: 12,
    fontWeight: 400,
    textTransform: 'uppercase',
  },
  caption: {
    letterSpacing: 0.4,
    lineHeight: 16,
    fontSize: 10,
    fontWeight: 400,
  },
  overline: {
    letterSpacing: 0.4,
    lineHeight: 16,
    fontSize: 8,
    fontWeight: 400,
    textTransform: 'uppercase',
  },
}

const mobileTypographyVariantOptions: Record<TypographyVariant, TypographyStyleOptions> = {
  h1: {},
  h2: {},
  h3: {},
  h4: {},
  h5: {},
  h6: {},
  subtitle1: {
    lineHeight: 24,
    fontSize: 12,
  },
  subtitle2: {
    lineHeight: 24,
    fontSize: 9,
  },
  body1: {
    lineHeight: 20,
    fontSize: 12,
  },
  body2: {
    lineHeight: 20,
    fontSize: 12,
  },
  button: {
    lineHeight: 28,
    fontSize: 10,
  },
  caption: {
    fontSize: 8,
  },
  overline: {},
}

const overrideMuiTypography = (defaultTheme: Theme): Theme => {
  const { breakpoints, typography } = defaultTheme
  const { pxToRem } = typography

  function convertToRem(options: TypographyStyleOptions) {
    if (typeof options.fontSize === 'number') {
      options.fontSize = pxToRem(options.fontSize as number)
    }
    if (typeof options.lineHeight === 'number') {
      options.lineHeight = pxToRem(options.lineHeight as number)
    }
  }

  Object.keys(baseTypographyVariantOptions).forEach((key: string) => {
    const variant = key as TypographyVariant
    const { ...baseStyle } = baseTypographyVariantOptions[variant]
    const { ...mobileStyle } = mobileTypographyVariantOptions[variant]
    convertToRem(baseStyle)
    convertToRem(mobileStyle)
    Object.assign(typography[variant], {
      ...baseStyle,
      [breakpoints.down('md')]: mobileStyle,
    })
  })

  return defaultTheme
}

export { overrideMuiTypography }
