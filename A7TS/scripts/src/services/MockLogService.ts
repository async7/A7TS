/// <reference path="../common/A7.Service.ts" />
/// <reference path="../common/a7.collection.ts" />
/// <reference path="../models/Log.ts" />

module Services {

    export class MockLogService extends A7.Service implements Interfaces.ILogService {

        constructor(url = 'api/log') {
            super(url);
        }

        Get(onlyLatestLog: boolean = false): JQueryPromise<A7.ICollection<Models.Log>> {
            var deferred = $.Deferred();

            var logs: Models.Log[] = [
                <Models.Log>{
                    GlobalId: 1,
                    Source: 'Sample TS Application',
                    LogType: 'Info',
                    Message: 'This is a sample message',
                    Context: null,
                    PostedDate: '20140310'
                }
            ];

            deferred.resolve(new A7.Collection(logs));

            return deferred.promise();
        }
    }

}