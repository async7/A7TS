/// <reference path="../framework/a7/collections/icollection.ts" />
/// <reference path="../framework/a7/collections/collection.ts" />
/// <reference path="../framework/a7/decorators/injectable.ts" />
/// <reference path="../framework/a7/services/service.ts" />
/// <reference path="../models/Widget.ts" />

module Services {
 
	@a7.injectable()
    export class WidgetsService extends A7.Services.Service implements Interfaces.IWidgetsService {

        constructor() {
            super();

			this._url = '/api/widgets';
        }

	   
        GetById(id: number): JQueryPromise<Models.Widget>{
            var url = this._url + '/{id}';
            url = url.replace(/{id}/gi, id === null ? '' : id.toString());
            return A7.Http.HttpClient.Get(url);
        }

		
    }

}

module Services.Interfaces {

	export interface IWidgetsService {
		GetById: (id: number) => JQueryPromise<Models.Widget>;
		
		OnCreate: <T>(fnHandler: (event: JQueryEventObject, model: T) => void ) => void;
		OnUpdate: <T>(fnHandler: (event: JQueryEventObject, model: T) => void ) => void;         
		OnDelete: <T>(fnHandler: (event: JQueryEventObject, model: T) => void ) => void;
		OnModified: <T>(fnHandler: (event: JQueryEventObject, model: T, eventType: string) => void) => void;
	}

}