/// <reference path="ilistiterator.ts" />

namespace A7.Collections {

    export abstract class ICollection<T> {
        Select: <TResult>(iterator: IListIterator<T, TResult>) => ICollection<TResult>;
        Where: (iterator: (x: T) => boolean) => ICollection<T>;
        ForEach: (iterator: IListIterator<T, void>) => void;
        OrderByProperty: (propertyName: string, direction: string) => ICollection<T>;
        OrderByIterator: (iterator: (x: T) => any) => ICollection<T>;
        Pluck: <TResult>(propertyName: string) => ICollection<TResult>;
        Reduce: <TResult>(iterator: (prev: TResult, curr: T) => TResult, memo: TResult) => ICollection<TResult>;
        Any: (iterator?: (x: T) => boolean) => boolean;
        Contains: (value: T) => boolean;
        First: (iterator: (x: T) => boolean) => T;
        Count:() => number;
        Reverse: () => ICollection<T>;
        Union: (list: T[]) => ICollection<T>;
        Length:() => number;
        Item: (index: number) => T;
        Push: (item: T) => void;
        Add: (item: T) => void;
        ToArray: () => T[];
        Take: (count: number) => ICollection<T>;
        GroupBy: (key: string) => { [key: string]: T[] };
        Sum: (key: string) => number;
        Unique: () => ICollection<T>;
    }

}