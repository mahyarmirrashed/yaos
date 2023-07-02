import { PLUGIN_NAME } from "@/utils/constants";

import { LogLevels, consola } from "consola";

const logger = consola.create({ level: LogLevels.debug }).withTag(PLUGIN_NAME);

export default logger;
