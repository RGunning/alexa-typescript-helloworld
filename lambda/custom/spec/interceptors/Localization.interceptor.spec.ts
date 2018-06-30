import {} from "jasmine";

import { LocalizationInterceptor } from "../../src/interceptors/Localization.interceptor";

import { JsonProvider } from "../mocks/JsonProvider";
import { ResponseFactory, AttributesManagerFactory, HandlerInput } from "ask-sdk";
import { i18n } from "i18next";

describe("LocalizationInterceptor", () => {
  let handlerInput: HandlerInput = {
    requestEnvelope: JsonProvider.requestEnvelope(),
    attributesManager: AttributesManagerFactory.init({ requestEnvelope: JsonProvider.requestEnvelope() }),
    serviceClientFactory: null,
    responseBuilder: ResponseFactory.init(),
    context: null
  };

  describe("process()", () => {
    describe("creates translator", () => {
      let requestAttributes;
      beforeAll(() => {
        requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      });
      it("should create translate attribute", () => {
        expect(requestAttributes.hasOwnProperty("t")).toBe(false);
        LocalizationInterceptor.process(handlerInput);
        expect(requestAttributes.hasOwnProperty("t")).toBe(true);
      });
    });
    describe("fetches translation", () => {
      let requestAttributes;
      beforeAll(() => {
        LocalizationInterceptor.process(handlerInput);
        requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      });

      beforeEach(()=>{
        (<i18n>requestAttributes.localizationClient).changeLanguage("en");
      })

      it("should return translation for WELCOME_MESSAGE", () => {
        expect(requestAttributes.localizationClient.exists("WELCOME_MESSAGE")).toBe(true);
        expect(requestAttributes.localizationClient.exists("responses:WELCOME_MESSAGE")).toBe(true);

        expect(requestAttributes.t("WELCOME_MESSAGE")).toBe(
          "Welcome to undefined."
        );
        expect(requestAttributes.t("responses:WELCOME_MESSAGE")).toBe(
          "Welcome to undefined."
        );

        (<i18n>requestAttributes.localizationClient).changeLanguage("en-GB");
        expect(requestAttributes.t("WELCOME_MESSAGE")).toBe(
          "Good Morning, Welcome to undefined."
        );

        (<i18n>requestAttributes.localizationClient).changeLanguage("en-US");
        expect(requestAttributes.t("WELCOME_MESSAGE")).toBe(
          "Howdy, Welcome to undefined."
        );
      });

      it("should return translation for intent HELLO_WORLD", () => {
        expect(requestAttributes.localizationClient.exists("intents:HELLO_WORLD")).toBe(true);
        expect(requestAttributes.t("intents:HELLO_WORLD")).toBe("Hello World Intent");
      });

      it("should accept overloads or objects", () => {
        expect(requestAttributes.t("WELCOME_MESSAGE", "hello world",)).toBe(
          "Welcome to hello world."
        );
        expect(
          requestAttributes.t("WELCOME_MESSAGE", {
            postProcess: "sprintf",
            sprintf: ["hello world"]
          })
        ).toBe(
          "Welcome to hello world."
        );
      });
    });
  });
});
