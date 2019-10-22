const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const Chat = require('../model/chat');

const should = chai.should();
chai.use(chaiHttp);

describe('chats',function() {

    Chat.collection.drop();

    it('Seharusnya dapat menambahkan chat baru', function (done) {
        chai.request(server).
        post('/api/chat/').
        send({'name':'Steve','chat':'This is Steve Chat'}).
        end(function (err,res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.success.should.equal(true);
            res.body.message.should.equal('data have been added');
            res.body.data.name.should.equal('Steve');
            res.body.data.chat.should.equal('This is Steve Chat');
            done();
        })
    })

    it('Seharusnya dapat menampilkan list chat', function (done) {
        chai.request(server).
        get('/api/chat/').
        end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('chat');
            res.body[0].name.should.equal('Steve');
            res.body[0].chat.should.equal('This is Steve Chat');
            done();
        })
    })

    it('Seharusnya dapat menghapus chat dengan id tertentu', function (done) {
        chai.request(server).
        get('/api/chat/').
        end(function (err,res) {
            let id = res.body[0]._id;
            chai.request(server).
            delete('/api/chat/'+id).
            end(function (err,res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal('data has been deleted');
                res.body.data._id.should.equal(id);
                res.body.data.name.should.equal('Steve');
                res.body.data.chat.should.equal('This is Steve Chat');
                done();
            })
        })
    })

})
