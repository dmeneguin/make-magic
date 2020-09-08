import app from '../../../app';
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

describe('Character Test', () => {
  describe('Controller Tests', () => {
    describe('character controller', () => {
      before((done) => {
        mongoose.connection.dropDatabase(done);
      });

      it ('should reject invalid data with 400 status', async (done) => {
        const badReq = {
            role: "student",
            school: "Hogwarts School of Witchcraft and Wizardry",
            house: "5a05da69d45bd0a11bd5e06f",
            patronus: "corvo"
        };
        request(app)
          .post('/character')
          .send(badReq)
          .expect(400, done);
      });

      it ('should accept valid data and return 200 status with saved object', (done) => {
        const goodReq = {
            name: "siberius",
            role: "student",
            school: "Hogwarts School of Witchcraft and Wizardry",
            house: "5a05da69d45bd0a11bd5e06f",
            patronus: "corvo"
        };
        request(app)
          .post('/character')
          .send(goodReq)
          .expect((res) => {
            expect(res.body).to.include({message: "Character successfully created"});
          })
          .expect(200, done);
      });

      it('should respond to API request with all listings', (done) => {
        const goodReq = {
            name: "harry potter",
            role: "student",
            school: "Hogwarts School of Witchcraft and Wizardry",
            house: "5a05da69d45bd0a11bd5e06f",
            patronus: "stag"
        };
        request(app)
          .post('/character')
          .send(goodReq)
          .then(() => {
            request(app)
              .get('/character')
              .expect((res) => {
                expect(res.body.length).to.eq(2);
              })
              .expect(200, done);
          });
      });

      it('should update object', (done) => {
        request(app)
          .get('/character')
              .expect((res) => {
                request(app)
                .put(`/character/${res.body[0]._id}`)
                .send({name: 'newName'})
                .expect((res) => res.body.message.to.eq('Character successfully updated'));
              })
              .expect(200, done);
      });

      it('should delete object', (done) => {
        request(app)
          .get('/character')
              .expect((res) => {
                request(app)
                .delete(`/character/${res.body[0]._id}`)
                .expect((res) => res.body.message.to.eq('Character successfully deleted'));
              })
              .expect(200, done);
      });
      
      after(() => {
        mongoose.connection.close();
        process.exit(0);
      });
    });
  });
});