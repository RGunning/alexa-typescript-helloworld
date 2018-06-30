import {} from 'jasmine';

import { LaunchHandler } from "../../src/handlers/launch.handler";
import { LocalizationInterceptor } from "../../src/interceptors/Localization.interceptor";

import { JsonProvider } from "../mocks/JsonProvider";
import { ResponseFactory, AttributesManagerFactory, HandlerInput } from "ask-sdk";

describe("LaunchHandler", () => {
  let response;
  let handlerInput: HandlerInput = {
    requestEnvelope: JsonProvider.requestEnvelope(),
    attributesManager: null,
    serviceClientFactory: null,
    responseBuilder: ResponseFactory.init(),
    context: null
  };

  beforeEach(() => {
    handlerInput.requestEnvelope.request.type = "LaunchRequest";
  });

  describe("canHandle()", () => {
    it("Should handle launchRequests Only", () => {
      expect(LaunchHandler.canHandle(handlerInput)).toBe(true);

      handlerInput.requestEnvelope.request.type = "IntentRequest";
      expect(LaunchHandler.canHandle(handlerInput)).toBe(false);
    });
  });
  describe("handle()", () => {
    let translate;
    let handleResponse;

    beforeAll(() => {
      handlerInput.requestEnvelope.session.attributes = { mockKey: "mockValue" };

      translate = jasmine.createSpy("translate").and.callFake(function(args) {
        return args;
      });

      handlerInput.attributesManager = AttributesManagerFactory.init({ requestEnvelope: handlerInput.requestEnvelope });
      handlerInput.attributesManager.setRequestAttributes({ t: translate });
      handleResponse = LaunchHandler.handle(handlerInput);
    });

    it("should call translate", () => {
      expect(translate).toHaveBeenCalled();
    });

    it("should run 4 translations", () => {
      expect(translate.calls.count()).toEqual(3);
    });

    it("should return responseBuilder", () => {
      const expectResponse = ResponseFactory.init()
        .speak('responses:WELCOME_MESSAGE')
        .reprompt('responses:WELCOME_REPROMPT')
        .getResponse();

      expect(handleResponse).not.toBeUndefined();
      expect(handleResponse).toEqual(expectResponse);
    });

  });
});
