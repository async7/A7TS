﻿/// <reference path="../../../../declarations/jasmine/jasmine.d.ts" />
/// <reference path="../../../assets/components/testform.ts" />
/// <reference path="../../../../src/framework/a7/configuration/configurationmanager.ts" />
/// <reference path="../../../../src/framework/a7/configuration/configurationfile.ts" />
/// <reference path="../../../assets/components/configcomponent.ts" />
/// <reference path="../../../assets/components/configanddecoratorcomponent.ts" />

describe('A Component Option', () => { 

    beforeEach((done) => { 
        var componentsConfig = [ 
            <A7.Configuration.ComponentOptions>{ Name: 'ConfigComponent', Selector: '#configSelector', LoadViewOnInit: false, ViewUrl: 'ConfigViewUrl' },
            <A7.Configuration.ComponentOptions>{ Name: 'ConfigAndDecoratorComponent', Selector: '#configAndDecoratorSelector', LoadViewOnInit: false, ViewUrl: 'ConfigAndDecoratorViewUrl' }
        ];
         
        A7.Configuration.ConfigurationManager.Initialize(<A7.Configuration.ConfigurationFile>{
            EnableLogging: true,  
            Components: componentsConfig  
        }).then(done);   
    }); 
       
    it('should have only 3 in the config', () => { 
        var componentOptions = A7.Configuration.ConfigurationManager.GetAllComponentOptions();
        expect(componentOptions.Count()).toEqual(3, componentOptions); 
    });
    
    it('should override component decorator options with config', () => {  
        var configAndDecoratorComponent = A7.Configuration.ConfigurationManager.GetComponentOptions('ConfigAndDecoratorComponent');
    
        expect(configAndDecoratorComponent.Selector).toEqual('#configAndDecoratorSelector');
        expect(configAndDecoratorComponent.ViewUrl).toEqual('ConfigAndDecoratorViewUrl'); 
    }); 
     
    it('should autocreate component options when config not found', () => {
        var componentOptions = A7.Configuration.ConfigurationManager.GetComponentOptions('TestForm');
       
        expect(componentOptions).toBeDefined();
        expect(componentOptions.Selector).toBeDefined(); 
        expect(componentOptions.LoadViewOnInit).toEqual(true);
    });  


    it('should autoresolve selector when not in config or decorator', () => {
        var kernel = new inversify.Kernel();

        kernel.bind<Services.ITestService>(Services.ITestService).to(Services.TestService);
        kernel.bind<Tests.Components.TestForm>(Tests.Components.TestForm).toSelf();

        var testForm = kernel.get(Tests.Components.TestForm),
            componentOptions = A7.Configuration.ConfigurationManager.GetComponentOptions('TestForm');

        expect(componentOptions.Selector).toEqual('#testForm');
    });


});