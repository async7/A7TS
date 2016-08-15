
namespace A7.Logging {

    export class ConsoleLogger implements ILogger {

        private _loggerName: string;

        constructor(loggerName?: string) {            
            this._loggerName = loggerName;
        }

        private getMessagePrefix(): string {
            return this._loggerName ? "[" + this._loggerName + "] " : '';
        }

        assert(test?: boolean, message?: string, ...optionalParams: any[]): void {
            console.assert(test, this.getMessagePrefix() + (message || ''), optionalParams);
        }
        clear(): void {
            console.clear();
        }      
        count(countTitle?: string): void {
            console.count(this.getMessagePrefix() + (countTitle || ''));
        }
        debug(message?: string, ...optionalParams: any[]): void {
            console.debug(this.getMessagePrefix() + (message || ''));
        }
        dir(value?: any, ...optionalParams: any[]): void {
            console.dir(value, optionalParams);
        }
        dirxml(value: any): void {
            console.dirxml(value);
        }
        error(message?: any, ...optionalParams: any[]): void {
            console.error(this.getMessagePrefix() + message, optionalParams);
        }
        group(groupTitle?: string): void {
            console.group(this.getMessagePrefix() + groupTitle || '');
        }
        groupCollapsed(groupTitle?: string): void {
            console.groupCollapsed(this.getMessagePrefix() + groupTitle || '');
        }
        groupEnd(): void {
            console.groupEnd();
        }
        info(message?: any, ...optionalParams: any[]): void {
            console.info(this.getMessagePrefix() + (message || ''), optionalParams);
        }
        log(message?: any, ...optionalParams: any[]): void {
            console.log(this.getMessagePrefix() + (message || ''), optionalParams);
        }
        msIsIndependentlyComposed(element: Element): boolean {
            return console.msIsIndependentlyComposed(element);
        }
        profile(reportName?: string): void {
            console.profile(this.getMessagePrefix() + (reportName || ''));
        }
        profileEnd(): void {
            console.profileEnd();
        }
        select(element: Element): void {
            console.select(element);
        }
        time(timerName?: string): void {
            console.time(this.getMessagePrefix() + (timerName || ''))
        }
        timeEnd(timerName?: string): void {
            console.timeEnd(this.getMessagePrefix() + (timerName || ''));
        }
        trace(message?: any, ...optionalParams: any[]): void {
            console.trace(this.getMessagePrefix() + (message || ''), optionalParams);
        }
        warn(message?: any, ...optionalParams: any[]): void {
            console.warn(this.getMessagePrefix() + (message || ''), optionalParams);
        }

    }

}