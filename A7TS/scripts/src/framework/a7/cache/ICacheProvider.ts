/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Cache {

    export abstract class ICacheProvider {
        Get: <T>(key: string, fn: () => JQueryPromise<T>) => JQueryPromise<T>;
        Remove: (key: string) => void;
        RemoveByStartsWith: (keyStartsWith: string) => void;
        Flush: () => void;
    }

}

