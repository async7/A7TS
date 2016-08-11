/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Cache {
    export class NoCache implements ICacheProvider {

        Get<T>(key: string, fn: () => JQueryPromise<T>): JQueryPromise<T> {
            return fn();
        }

        Remove(key: string) {
        }

        RemoveByStartsWith(keyStartsWith: string) {
        }

        Flush() {
        }
    }
}

