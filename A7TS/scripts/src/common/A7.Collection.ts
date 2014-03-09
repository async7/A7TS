/// <reference path="../../declarations/underscore.d.ts" />

module A7 {

    export interface ICollection<T> {
        Select<TResult>(iterator: IListIterator<T, TResult>): ICollection<TResult>;
        Where<TResult>(iterator: (x: T) => boolean): ICollection<T>;
        ForEach(iterator: IListIterator<T, void >): void;
        OrderByProperty(propertyName: string, direction: string): ICollection<T>;
        OrderByIterator(iterator: (x: T) => any): ICollection<T>;
        Pluck<TResult>(propertyName: string): ICollection<TResult>;
        Reduce<TResult>(iterator: (prev: TResult, curr: T) => TResult, memo: TResult): ICollection<TResult>;
        Any(iterator?: (x: T) => boolean): boolean;
        Contains(value: T): boolean;
        First(iterator: (x: T) => boolean): T;
        Count(): number;
        Reverse(): ICollection<T>
        Length(): number;
        Item(index: number): T;
        Push(item: T): void;
        Add(item: T): void;
        ToArray(): T[];
    }

    export interface IList<T> {
        [index: number]: T;
        length: number;
    }

    export interface IListIterator<T, TResult> {
        (value: T, index: number, list?: IList<T>): TResult;
    }

    export class Collection<T> {

        private _collection: T[];

        constructor(collection: T[] = []) {
            this._collection = collection;
        }
        
        Select<TResult>(iterator: IListIterator<T, TResult>): ICollection<TResult> {
            return new Collection<TResult>(_.map(this._collection, iterator) || []);
        }

        Where<TResult>(iterator: (x: T) => boolean): ICollection<TResult> {
            return new Collection(_.filter(this._collection, iterator) || []);
        }

        ForEach(iterator: IListIterator<T, void >): void {
            _.forEach(this._collection, iterator);
        }

        OrderByProperty(propertyName: string, direction: string = 'asc'): ICollection<T> {
            this._collection = _.sortBy(this._collection, propertyName);        
            if (direction == 'desc') this._collection.reverse();
            return this;
        }

        OrderByIterator(iterator: (x: T) => any): ICollection<T> {
            this._collection = _.sortBy(this._collection, iterator);
            return this;
        }

        Pluck<TResult>(propertyName: string): ICollection<TResult> {
            return new Collection(_.pluck(this._collection, propertyName) || []);
        }

        Reduce<TResult>(iterator: (prev: TResult, curr: T) => TResult, memo: TResult): ICollection<TResult> {
            return new Collection(_.reduce(this._collection, iterator, memo) || []);
        }

        Any(iterator?: (x: T) => boolean): boolean{
            return _.some(this._collection, iterator);
        }

        Contains(value: T): boolean {
            return _.contains(this._collection, value);
        }

        First(iterator: (x: T) => boolean): T {
            return _.find(this._collection, iterator);
        }

        Reverse(): ICollection<T> {
            return new Collection(this._collection.reverse());
        }

        //alias: for Count
        Length(): number {
            return this.Count();
        }

        Count(): number {
            return this._collection.length;
        }

        Item(index: number): T {
            return this._collection[index];
        }

        Push(item: T) {
            this._collection.push(item);
        }

        //alias: for Push
        Add(item: T) {
            this.Push(item);
        }

        ToArray(): T[]{
            return this._collection;
        }

    }

}