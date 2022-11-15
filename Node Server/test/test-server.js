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
  it('should list all airlines at /api/airlines', function(done) {
    request('http://localhost:5000/api/airlines' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
  });
  it('should list all flights at /api/flights', function(done) {
    request('http://localhost:5000/api/flights' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
  });
  it('should list flight by iata at /api/flights/${flight_iata}', function(done) {
    url = 'http://localhost:5000/api/flights/'+`${flight_iata}`;
    request( url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
  });
  it('should list flight by FILTER at /api/flights/${flight_iata}', function(done) {
    url = 'http://localhost:5000/api/flights/';
    url = url+`?arr_iata=${arr_iata}&dep_iata=${dep_iata}`;
    //http://localhost:5000/api/flights/?arr_iata=SVO&dep_iata=KEJ
    request(url , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
  });
  it('should list airports by iata at /api/airports/DFW', function(done) {
    request('http://localhost:5000/api/airports/DFW' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
  });
  it('should list airlines by iata at /api/airlines/EK', function(done) {
    request('http://localhost:5000/api/airlines/EK' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
  });
});
