
namespace A7.Logging {

    export module LogManager {

        export function GetLogger(loggerName: string): ILogger {
            //Fix for < IE9 missing console
            if (typeof console == "undefined" || typeof console.log == "undefined") {
                return new EmptyLogger();
            } else {
                //Manually turn off console logging by changing this to return an instance of EmptyLogger                             
                return new ConsoleLogger(loggerName);
            }
        }

    }

}