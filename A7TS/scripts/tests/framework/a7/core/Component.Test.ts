/// <reference path="../../../../declarations/jasmine/jasmine.d.ts" />
/// <reference path="../../../assets/components/testform.ts" />
/// <reference path="../../../../src/framework/a7/configuration/configurationmanager.ts" />
/// <reference path="../../../../src/framework/a7/configuration/configurationfile.ts" />

describe('A Component', () =>  {

    beforeAll(() => {
        var config = <A7.Configuration.ConfigurationFile>{
            EnableLogging: true,  
            Components: []  
        }
    });
     
    it('should set config options on construction', () => {   
        var testForm = new Tests.Components.TestForm(); 
        expect(A7.Configuration.ConfigurationManager.AppConfiguration.Components[0].Selector).toEqual('TestForm', A7.Configuration.ConfigurationManager.AppConfiguration.Components[0]);
    }); 

     
});