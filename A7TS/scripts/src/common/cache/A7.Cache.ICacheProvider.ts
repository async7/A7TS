/// <reference path="../../../declarations/jquery.d.ts" />

module A7 {
    export module Cache {
        export interface ICacheProvider {
            Get<T>(key: string, fn: () => JQueryPromise<T>): JQueryPromise<T>;
            Remove(key: string);
            RemoveByStartsWith(keyStartsWith: string);
            Flush();
        }
    }
}