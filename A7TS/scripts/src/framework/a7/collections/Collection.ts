/// <reference path="../../../../declarations/underscore/underscore.d.ts" />

namespace A7.Collections {

    export class Collection<T> implements ICollection<T> {

        private _collection: T[];

        constructor(collection: T[] = []) {
            this._collection = collection;
        }
        
        Select<TResult>(iterator: IListIterator<T, TResult>): ICollection<TResult> {
            return new Collection<TResult>(_.map(this._collection, iterator) || []);
        }

        Where(iterator: (x: T) => boolean): ICollection<T> {
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

        Reduce<TResult>(iterator: (prev: TResult, curr: T) => TResult, memo: TResult): TResult {
            return _.reduce(this._collection, iterator, memo);
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

        Union(list: T[]): ICollection<T> {
            return new Collection(_.union(this._collection, list));
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

        Take(count: number): ICollection<T>
        {
            return new Collection(_.take(this._collection, count));
        }

        GroupBy(key: string): { [key: string]: T[] }
        {
            var result = _.groupBy(this._collection, key);
            return result;
        }

        Sum(key: string): number
        {
            var val = 0;
            _.each(this._collection, (elem, index) =>
            {
                val += elem[key];
            });
            return val;
        }

        Unique(): ICollection<T> {
            return new Collection(_.uniq(this._collection));
        }
    }

}