/// <reference path="../A7.Collection.ts" />
/// <reference path="../../../declarations/jquery.d.ts" />
/// <reference path="A7.Cache.ICacheProvider.ts" />

module A7 {
    export module Cache {
            export class BrowserCache implements ICacheProvider {

            private _cache: any[] = [];

                Get<T>(key: string, fn: () => JQueryPromise<T>): JQueryPromise<T> {

                var dfd = $.Deferred<T>();

                if (!this._cache[key]) {
                    $.when(fn()).done((value) => {
                        this._cache[key] = value;
                        dfd.resolve(this._cache[key]);
                    });
                } else {
                    dfd.resolve(this._cache[key]);
                }

                return dfd.promise();

            }

            Remove(key: string) {
                delete this._cache[key];
            }

            RemoveByStartsWith(keyStartsWith: string) {
                var removeKeys = new A7.Collection();

                for (var key in this._cache) {
                    if (key.indexOf(keyStartsWith) == 0) removeKeys.Add(key);
                }

                removeKeys.ForEach((key) => {
                    delete this._cache[key];
                });

            }

            Flush() {
                this._cache = [];
            }
        }
    }
}
