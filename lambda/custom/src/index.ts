import * as Alexa from 'ask-sdk';

import { LaunchHandler } from './handlers/launch.handler';
import { ErrorHandlerIntent } from './handlers/error.handler';
import { HelpHandler } from './handlers/help.handler';
import { ExitHandler } from "./handlers/exit.handler";
import { RepeatHandler } from "./handlers/repeat.handler";
import { SessionEndedHandler } from "./handlers/sessionEnd.handler";
import { HelloWorldIntentHandler } from "./handlers/helloWorld.handler";

import { LocalizationInterceptor } from './interceptors/Localization.interceptor';

/* LAMBDA SETUP */
const skillBuilder: Alexa.StandardSkillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchHandler,
    HelloWorldIntentHandler,
    HelpHandler,
    RepeatHandler,
    ExitHandler,
    SessionEndedHandler,
  )
  .addRequestInterceptors(
    LocalizationInterceptor
  )
  .addErrorHandlers(ErrorHandlerIntent)
  .lambda();

