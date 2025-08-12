import * as chai from 'chai';
import { request, default as chaiHttp } from 'chai-http';
import { app, server } from '../server.js';

chai.use(chaiHttp);  // Correct plugin registration

describe("Notes API", () => {
  let token = '';
  let noteId = '';

  before(async () => {
    const res = await request.execute(app)
      .post('/api/auth/login')
      .send({ username: 'sunny', password: 'sunny124' });
    token = res.body.token;
  });

  it("should return all notes", async () => {
    const res = await request.execute(app)
      .get('/api/notes')
      .set("Authorization", `Bearer ${token}`);
    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.be.an("array");
  });

  it("should create a new note", async () => {
    const res = await request.execute(app)
        .post('/api/notes')
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "My test note",
            content: "This is the note for testing POST"
        });
    
    chai.expect(res).to.have.status(201);
    chai.expect(res.body).to.have.property("title", "My test note");
    chai.expect(res.body).to.have.property("content", "This is the note for testing POST");

    noteId = res.body._id;
  });

  it("should update the note", async () => {
    const res = await request.execute(app)
        .put(`/api/notes/${noteId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "updated test note",
            content: "updated content" 
        });

    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.have.property("title", "updated test note");
    chai.expect(res.body).to.have.property("content", "updated content");
  });

  it("should delete the note", async ()=> {
    const res = await request.execute(app)
        .delete(`/api/notes/${noteId}`)
        .set("Authorization", `Bearer ${token}`);

    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.have.property("message");
  });

  after((done) => {
    server.close(done);
  });
});
