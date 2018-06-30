import {} from "jasmine";

import { ErrorHandlerIntent } from "../../src/handlers/error.handler";

import { JsonProvider } from "../mocks/JsonProvider";
import { ResponseFactory, AttributesManagerFactory, HandlerInput } from "ask-sdk";
import { IntentRequest } from "ask-sdk-model";

describe("ErrorHandlerIntent", () => {
  let handlerInput: HandlerInput = {
    requestEnvelope: JsonProvider.requestEnvelope(),
    attributesManager: null,
    serviceClientFactory: null,
    responseBuilder: ResponseFactory.init(),
    context: null
  };
  beforeEach(() => {
    let request: IntentRequest = {
      type: "IntentRequest",
      requestId: null,
      timestamp: null,
      locale: null,
      dialogState: "STARTED",
      intent: JsonProvider.intent()
    };

    request.intent.name = "HelloWorldIntent";

    handlerInput.requestEnvelope.request = request;
  });

  describe("canHandle()", () => {
    it("Should handle Everything", () => {
      expect(ErrorHandlerIntent.canHandle(handlerInput, new Error())).toBe(true);
      handlerInput.requestEnvelope.request.type = "LaunchRequest";
      expect(ErrorHandlerIntent.canHandle(handlerInput, new Error())).toBe(true);
      (<IntentRequest>handlerInput.requestEnvelope.request).intent.name = "WrongIntent";
      expect(ErrorHandlerIntent.canHandle(handlerInput,new Error())).toBe(true);
    });
  });

  describe("handle()", () => {
    let translate;

    beforeEach(() => {
      translate = jasmine.createSpy("translate").and.callFake(function(args) {
        return args;
      });

      handlerInput.attributesManager = AttributesManagerFactory.init({ requestEnvelope: handlerInput.requestEnvelope });
      handlerInput.attributesManager.setRequestAttributes({ t: translate });
      ErrorHandlerIntent.handle(handlerInput,new Error());
    });

    it("should return translation for ERROR_MESSAGE", () => {
      expect(translate).toHaveBeenCalled();
      expect(translate).toHaveBeenCalledWith("ERROR_MESSAGE");
    });

  });
});
