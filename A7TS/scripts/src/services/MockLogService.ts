/// <reference path="../common/A7.Service.ts" />
/// <reference path="../common/a7.collection.ts" />
/// <reference path="../models/Log.ts" />
/// <reference path="logservice.ts" />

module Services {

    export class MockLogService extends A7.Service implements Interfaces.ILogService {

        constructor(url = 'api/log') {
            super(url);
        }

        Get(onlyLatestLog: boolean = false): JQueryPromise<A7.ICollection<Models.Log>> {
            var deferred = $.Deferred();

            var logs: Models.Log[] = [
                <Models.Log>{
                    Id: 1,
                    GlobalId: 'xxxGUIDxxx',
                    Source: 'Sample TS Application',
                    LogType: 'Info',
                    Message: 'This is a sample logging message',
                    Context: null,
                    PostedDate: '2014-3-11T22:15:52.597'
                },
                <Models.Log>{
                    Id: 2,
                    GlobalId: 'xxxGUIDxxx',
                    Source: 'Sample TS Application',
                    LogType: 'Error',
                    Message: 'I know you didn\'t divide by zero',
                    Context: null,
                    PostedDate: '2014-3-11T22:15:52.597'
                }
            ];

            deferred.resolve(new A7.Collection(logs));

            return deferred.promise();
        }
    }

}