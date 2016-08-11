/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Cache {

    export interface ICacheProvider {
        Get<T>(key: string, fn: () => JQueryPromise<T>): JQueryPromise<T>;
        Remove(key: string);
        RemoveByStartsWith(keyStartsWith: string);
        Flush();
    }

}

