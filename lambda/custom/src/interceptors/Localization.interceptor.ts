import * as i18next from "i18next";

import * as Backend from "i18next-sync-fs-backend";
import * as postProcessor from "i18next-sprintf-postprocessor";
import { RequestInterceptor } from "ask-sdk";

export const LocalizationInterceptor: RequestInterceptor = {
  process(handlerInput) {
    const options: i18next.InitOptions = {
      lng: handlerInput.requestEnvelope.request.locale,
      overloadTranslationOptionHandler: postProcessor.overloadTranslationOptionHandler,
      returnObjects: true,
      fallbackLng: "en",
      ns: [
        "responses", 
        "intents"
      ],
      defaultNS: "responses",
      initImmediate: false,
      backend: {
        // path where resources get loaded from
        loadPath: __dirname + "/../../locales/{{lng}}/{{ns}}.json",

        // path to post missing resources
        addPath: __dirname + "/../../locales/{{lng}}/{{ns}}.missing.json",

        // jsonIndent to use when storing json files
        jsonIndent: 2
      },
      debug: false
    };

    let localizationClient: i18next.i18n;

    localizationClient = i18next
      .use(postProcessor)
      .use(Backend)
      .init(options);

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function(key: string | string[], ...options: Array<i18next.TranslationOptions<object> | any>) {
      return localizationClient.t(key, ...options);
    };
    attributes.localizationClient = localizationClient;
  }
};
