
namespace A7.Logging {

    export abstract class ILogger {

        constructor() {

        }

        assert: (test?: boolean, message?: string, ...optionalParams: any[]) => void;
        clear: () => void;
        count: (countTitle?: string) => void;
        debug: (message?: string, ...optionalParams: any[]) => void;
        dir: (value?: any, ...optionalParams: any[]) => void;
        dirxml: (value: any) => void;
        error: (message?: any, ...optionalParams: any[]) => void;
        group: (groupTitle?: string) => void;
        groupCollapsed: (groupTitle?: string) => void;
        groupEnd: () => void;
        info: (message?: any, ...optionalParams: any[]) => void;
        log: (message?: any, ...optionalParams: any[]) => void;
        msIsIndependentlyComposed: (element: Element) => boolean;
        profile: (reportName?: string) => void;
        profileEnd: () => void;
        select: (element: Element) => void;
        time: (timerName?: string) => void;
        timeEnd: (timerName?: string) => void;
        trace: (message?: any, ...optionalParams: any[]) => void;
        warn: (message?: any, ...optionalParams: any[]) => void;
        
    }

}