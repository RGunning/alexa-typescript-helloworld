
import { ErrorHandler } from 'ask-sdk';

export const ErrorHandlerIntent: ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput,  error) {
    console.log(`Error handled: ${error.message}`);
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    sessionAttributes.repromptSpeech = requestAttributes.t("ERROR_MESSAGE");
    sessionAttributes.speakOutput = requestAttributes.t("ERROR_MESSAGE");

    //saving speakOutput to attributes, so we can use it to repeat
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .getResponse();
  },
};