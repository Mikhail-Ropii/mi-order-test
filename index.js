import { registerRootComponent } from "expo";
import { polyfillWebCrypto } from "expo-standard-web-crypto";
import { registerTranslation } from "react-native-paper-dates";

registerTranslation("en", {
  save: "Зберегти",
  selectSingle: "Виберіть дату",
  selectMultiple: "Виберіть дати",
  selectRange: "Оберіть період",
  notAccordingToDateFormat: (inputFormat) =>
    `Формат дати має бути ${inputFormat}`,
  mustBeHigherThan: (date) => `Має бути пізніше чим ${date}`,
  mustBeLowerThan: (date) => `Має бути раніше чим ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Має бути в діапазоні між ${startDate} - ${endDate}`,
  dateIsDisabled: "День не дозволений",
  previous: "Раніше",
  next: "Наступне",
  typeInDate: "Type in date",
  pickDateFromCalendar: "Виберіть дату у календарі",
  close: "Закрити",
});

polyfillWebCrypto();

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
