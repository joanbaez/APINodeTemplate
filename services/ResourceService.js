'use strict';
require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });
var soap = require('strong-soap').soap;
//var request = require('request');
//require('request').debug = true;



var response;
var messageResponse={};


var wsdlMetaSoapService1 = {
    endpointWsdl: 'path/to/wsdl/1/.wsdl',
    options: {
            endpoint: 'https://endpoint/Service1/v1',
            disableCache: true
        }
};

var wsdlMetaSoapService2 = {
    endpointWsdl: 'path/to/wsdl/2/.wsdl',
    options: {
            endpoint: 'https://endpoint/Service2/v1',
            disableCache: true
        }
};

var operationMetaSoapOperation1 = {
    serviceSoap: 'ServiceNameWsdl',
    portSoap: 'PortNameWsdl',
    operationSoap: 'OperationNameWsdl'
};

var operationMetaSoapOperation2 = {
    serviceSoap: 'ServiceNameWsdl',
    portSoap: 'PortNameWsdl',
    operationSoap: 'OperationNameWsdl'
};


class ResourceService {
    constructor() {
    }

    getResources(res) {
        //All business logic here
        var requestArgs = {
            service1BodyElement:{
                attribute1: 1
            }
        
        };

        var customRequestHeader = {//'SOAPAction': 'http://mx.altan/CustomersMail/v1/getCustomerEmail',
                        //Connection: 'Keep-Alive',
                        //Host: "spring-night-6859.getsandbox.com",
                        'Content-Type': 'text/xml; charset=utf-8'
                    };

        console.log('logger example');
        soapCallout(wsdlMetaSoapService1, operationMetaSoapOperation1, requestArgs, customRequestHeader, service1Handler);
    }

    getSingleResource(playerId, res) {
        //All business logic here

    }

    addResource(info, res) {
        //All business logic here

    }

    updateResource(playerId, info, res) {
        //All business logic here
    }
}




/*
 * Response message handlers
 */
var responseHandler = function (message) {
    
    /*
     * Ultimate message handler
     * 
     */
    response.send(JSON.stringify(message));
};


/*
var templateHandler = function (err, result, envelope, soapHeader, response) {
    
}
*/

var service1Handler = function (err, result, envelope, soapHeader) {
    // All business logic hear: Result first service handler

    var requestArgs = {
            service2BodyElement:{
                attribute1: 'anything'
            }
        
        };

    var customRequestHeader = {
                    'Content-Type': 'text/xml; charset=utf-8'
                };
    soapCallout(wsdlMetaSoapCustomerMail, operationMetaSoapOperation2, requestArgs, customRequestHeader, service2Handler);
};

var service2Handler = function (err, result, envelope, soapHeader) {
    // All business logic hear: Result second service handler
    responseHandler(messageResponse);
};

class ResourceService {
    constructor() {
    }

    getResources(res) {
        //All business logic here
        var requestArgs = {
            service1BodyElement:{
                attribute1: 1
            }
        
        };

        var customRequestHeader = {//'SOAPAction': 'http://mx.altan/CustomersMail/v1/getCustomerEmail',
                        //Connection: 'Keep-Alive',
                        //Host: "spring-night-6859.getsandbox.com",
                        'Content-Type': 'text/xml; charset=utf-8'
                    };

        console.log('logger example');
        soapCallout(wsdlMetaSoapService1, operationMetaSoapOperation1, requestArgs, customRequestHeader, service1Handler);
    }

    getSingleResource(playerId, res) {
        //All business logic here

    }

    addResource(info, res) {
        //All business logic here

    }

    updateResource(playerId, info, res) {
        //All business logic here
    }
}

//Don't modify
var soapCallout = function (wsdlMetaSoap, operationMetaSoap, requestData, requestHeader, callbackFunction) {
    soap.createClient(wsdlMetaSoap.endpointWsdl, wsdlMetaSoap.options, function(err, client) {
        var soapOperationCallout = client[operationMetaSoap.serviceSoap][operationMetaSoap.portSoap][operationMetaSoap.operationSoap];
        soapOperationCallout(requestData, callbackFunction, null, requestHeader);
    });
};

module.exports = new ResourceService();