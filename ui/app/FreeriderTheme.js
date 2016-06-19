import { blue500, blue700, blue300, deepOrangeA400, deepOrangeA200, deepOrangeA100, deepOrangeA700,
    white, darkBlack, fullBlack, grey300 } from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator'

const commonSettings = {
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: blue300,
    accent1Color: deepOrangeA400,
    accent2Color: deepOrangeA100,
    accent3Color: deepOrangeA700,
    accent4Color: deepOrangeA200,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: blue500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
}

function componentSettings(common) {
  return {}
}

const FreeriderTheme = {
  commonSettings: commonSettings,
  componentSettings: componentSettings(commonSettings)
}

export default FreeriderTheme
