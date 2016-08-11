/// <reference path="ilist.ts" />

namespace A7.Collections {

    export interface IListIterator<T, TResult> {
        (value: T, index: number, list?: IList<T>): TResult;
    }

}