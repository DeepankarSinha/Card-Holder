export interface ILogger {
    /**
     * Logs message of type info.
     * @param message Message to log.
     */
    info(message: string): void;

    /**
     * Logs message of type debug.
     * @param message Message to log.
     */
    debug(message: string): void;

    /**
     * Logs message of type error.
     * @param message Message to log.
     */
    error(message: string): void;

}