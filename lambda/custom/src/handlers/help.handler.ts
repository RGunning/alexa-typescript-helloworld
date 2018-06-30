
import { listIntents } from "../data/listIntents";
import { getRandomItem } from "../helpers/randomItem.helper";

export const HelpHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const item = requestAttributes.t("intents:" + getRandomItem(listIntents)); // Get translation for a random intent

    sessionAttributes.speakOutput = requestAttributes.t("HELP_MESSAGE", item);
    sessionAttributes.repromptSpeech = requestAttributes.t("HELP_REPROMPT", item);

    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .getResponse();
  }
};
