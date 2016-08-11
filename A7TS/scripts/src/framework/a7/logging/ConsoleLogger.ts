
namespace A7.Logging {

    export class ConsoleLogger implements ILogger {

        private _loggerName: string;
        private _messagePrefix: string;

        constructor(loggerName?: string) {
            this._loggerName = loggerName;
            this._messagePrefix = loggerName ? "[" + loggerName + "] " : '';
        }
    
        assert(test?: boolean, message?: string, ...optionalParams: any[]): void {
            console.assert(test, this._messagePrefix + (message || ''), optionalParams);
        }
        clear(): void {
            console.clear();
        }      
        count(countTitle?: string): void {
            console.count(this._messagePrefix + (countTitle || ''));
        }
        debug(message?: string, ...optionalParams: any[]): void {
            console.debug(this._messagePrefix + (message || ''));
        }
        dir(value?: any, ...optionalParams: any[]): void {
            console.dir(value, optionalParams);
        }
        dirxml(value: any): void {
            console.dirxml(value);
        }
        error(message?: any, ...optionalParams: any[]): void {
            console.error(this._messagePrefix + message, optionalParams);
        }
        group(groupTitle?: string): void {
            console.group(this._messagePrefix + groupTitle || '');
        }
        groupCollapsed(groupTitle?: string): void {
            console.groupCollapsed(this._messagePrefix + groupTitle || '');
        }
        groupEnd(): void {
            console.groupEnd();
        }
        info(message?: any, ...optionalParams: any[]): void {
            console.info(this._messagePrefix + (message || ''), optionalParams);
        }
        log(message?: any, ...optionalParams: any[]): void {
            console.log(this._messagePrefix + (message || ''), optionalParams);
        }
        msIsIndependentlyComposed(element: Element): boolean {
            return console.msIsIndependentlyComposed(element);
        }
        profile(reportName?: string): void {
            console.profile(this._messagePrefix + (reportName || ''));
        }
        profileEnd(): void {
            console.profileEnd();
        }
        select(element: Element): void {
            console.select(element);
        }
        time(timerName?: string): void {
            console.time(this._messagePrefix + (timerName || ''))
        }
        timeEnd(timerName?: string): void {
            console.timeEnd(this._messagePrefix + (timerName || ''));
        }
        trace(message?: any, ...optionalParams: any[]): void {
            console.trace(this._messagePrefix + (message || ''), optionalParams);
        }
        warn(message?: any, ...optionalParams: any[]): void {
            console.warn(this._messagePrefix + (message || ''), optionalParams);
        }

    }

}