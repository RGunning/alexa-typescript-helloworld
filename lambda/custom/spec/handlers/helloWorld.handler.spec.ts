import {} from "jasmine";

import { HelloWorldIntentHandler } from "../../src/handlers/helloWorld.handler";

import { JsonProvider } from "../mocks/JsonProvider";
import { ResponseFactory, AttributesManagerFactory, HandlerInput } from "ask-sdk";
import { IntentRequest } from "ask-sdk-model";

describe("HelloWorldIntentHandler", () => {
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
    it("Should handle IntentRequest only", () => {
      expect(HelloWorldIntentHandler.canHandle(handlerInput)).toBe(true);

      handlerInput.requestEnvelope.request.type = "LaunchRequest";
      expect(HelloWorldIntentHandler.canHandle(handlerInput)).toBe(false);
    });

    it("Should handle only handle HelloWorldIntent intent requests", () => {
      expect(HelloWorldIntentHandler.canHandle(handlerInput)).toBe(true);

      (<IntentRequest>handlerInput.requestEnvelope.request).intent.name = "WrongIntent";
      expect(HelloWorldIntentHandler.canHandle(handlerInput)).toBe(false);
    });
  });

  describe("handle()", () => {
    let translate;
    let handleResponse;

    beforeEach(() => {
      translate = jasmine.createSpy("translate").and.callFake(function(args) {
        return args;
      });

      handlerInput.attributesManager = AttributesManagerFactory.init({ requestEnvelope: handlerInput.requestEnvelope });
      handlerInput.attributesManager.setRequestAttributes({ t: translate });
      handleResponse = HelloWorldIntentHandler.handle(handlerInput);
    });

    it("should return translation for HELLO_WORLD", () => {
      expect(translate).toHaveBeenCalled();
      expect(translate).toHaveBeenCalledWith("HELLO_WORLD");
    });

    it('should return speach output',()=>{
      expect(handleResponse.outputSpeech.type).toBe('SSML');
      expect(handleResponse.outputSpeech.ssml).toBe('<speak>HELLO_WORLD</speak>');
    })

    it('should return display card output',()=>{
      expect(handleResponse.card.type).toBe('Simple');
      expect(handleResponse.card.title).toBe('HELLO_WORLD');
      expect(handleResponse.card.content).toBe('HELLO_WORLD');
    })

  });
})