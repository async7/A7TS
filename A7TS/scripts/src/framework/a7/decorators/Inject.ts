/// <reference path="../../../../declarations/inversify/inversify.d.ts" />

namespace a7 {

    export function inject(serviceIdentifier: any) {
        return inversify.inject(serviceIdentifier);
    }
}