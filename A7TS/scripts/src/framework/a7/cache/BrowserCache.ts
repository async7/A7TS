/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../collections/collection.ts" />
/// <reference path="../decorators/injectable.ts" />

namespace A7.Cache {

    @a7.injectable()
    export class BrowserCache implements ICacheProvider {

        private _cache: any[] = [];

        Get<T>(key: string, fn: () => JQueryPromise<T>): JQueryPromise<T> {

            if (!this._cache[key])
                this._cache[key] = fn();
            return this._cache[key];

        }

        Remove(key: string) {
            delete this._cache[key];
        }

        RemoveByStartsWith(keyStartsWith: string) {
            var removeKeys = new A7.Collections.Collection();

            for (var key in this._cache) {
                if (key.indexOf(keyStartsWith) == 0) removeKeys.Add(key);
            }

            removeKeys.ForEach((key) => {
                delete this._cache[<any>key];
            });

        }

        Flush() {
            this._cache = [];
        }
    }
}

