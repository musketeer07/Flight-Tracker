var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var expect  = require('chai').expect;
var request = require('request');
var flight_iata = 'SU1133';
var airport_iata = 'CLT';
var airline_iata = 'EK';
var arr_iata = 'SVO';
var dep_iata = 'KEJ';


chai.use(chaiHttp);


describe('Flight-Tracker', function() {

  it('should list all airports at /api/airports', function(done) {
    request('http://localhost:5000/api/airports' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
  });
  
});