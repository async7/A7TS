/// <reference path="../framework/a7/collections/icollection.ts" />
/// <reference path="../framework/a7/collections/collection.ts" />
/// <reference path="../models/user.ts" />
/// <reference path="../framework/a7/decorators/injectable.ts" />

namespace Services {
    
    export abstract class ITestService {
        GetUsers: () => A7.Collections.ICollection<Models.User>;
    }

    @a7.injectable()
    export class TestService implements ITestService {

        GetUsers() {
            return new A7.Collections.Collection([
                <Models.User>{ UserName: 'bdylan', FirstName: 'Bob', LastName: 'Dylan' },
                <Models.User>{ UserName: 'jlenon', FirstName: 'John', LastName: 'Lenon' },
                <Models.User>{ UserName: 'jdenver', FirstName: 'John', LastName: 'Denver' }
            ]);
        }

    }

}