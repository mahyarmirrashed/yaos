import { LogLevels, consola } from "consola";

const logger = consola.create({ level: LogLevels.debug }).withTag("YAOS");

export default logger;
