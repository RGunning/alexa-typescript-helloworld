import { RequestHandler } from "ask-sdk";

export const LaunchHandler: RequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    sessionAttributes.speakOutput = requestAttributes.t(
      "responses:WELCOME_MESSAGE",
      requestAttributes.t("responses:SKILL_NAME")
    );
    sessionAttributes.repromptSpeech = requestAttributes.t("responses:WELCOME_REPROMPT");


    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .getResponse();
  }
};
