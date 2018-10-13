'use strict';
const app = require('../server');
const chai = require('chai');
const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Express static', function () {
  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('404 handler', function() {

  it('should respond with 404 when given a bad path', function(){
    return chai.request(app)
      .get('/DOESNOTEXT')
      .then(res => expect(res).to.have.status(404));
  });
});

describe('GET api/notes', function(){
  it('should return all notes in array of objects with id title and content', function(){
    return chai
      .request(app)
      .get('/api/notes')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        res.body.forEach((item) =>{
          expect(item).to.have.all.deep.keys('id', 'title', 'content');
        });
      });
  });
  it('should return 200 and array of 10',function(){
    return chai 
      .request(app)
      .get('/api/notes?searchTerm=cats')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(10);

      });
  });
  it('should return array length 0 on bad searchTerm',function(){
    return chai
      .request(app)
      .get('/api/notes?searchTerm=pissants')
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(0);
      });
  });
});


describe('POST api/notes', function(){
  const newItem = {title: '7 ways to dance the duggie', content: '1,2,3,4,5,6,7'};
  it('should create and return a new item with location header when provided valid data', function(){
    return chai
      .request(app)
      .post('/api/notes')
      .send(newItem)
      .then(function(res){
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.deep.keys(['id','title','content']);
      });
  });
  it('should return a 404 error with missing title', function(){
    const emptyObj = {};
    return chai
      .request(app)
      .post('/api/notes')
      .send(emptyObj)
      .then(function(res){
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Missing `title` in request body');
      });
  });
});

describe('PUT api/notes', function(){
  const updateData = {title: '7 cats to call your mom', content: 'here they are:'};
  it('should update item with new data', function(){
    return chai
      .request(app)
      .get('/api/notes')
      .then(function(res){
        updateData.id = res.body[0].id;
        return chai
          .request(app)
          .put(`/api/notes/${updateData.id}`)
          .send(updateData);
      })
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.deep.equal(updateData);
      });
  });
});

describe('DELETE api/notes/:id', function(){
  it('should remove item at id from from list', function(){
    return chai
      .request(app)
      .get('/api/notes')
      .then(function(res){
        const id = res.body[0].id;
        return chai
          .request(app)
          .delete(`/api/notes/${id}`);
      })
      .then(function(res){
        expect(res).to.have.status(204);
      });
  });
});
