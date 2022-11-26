import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UserModel';
import { user, userBcrypt } from './helpers/login';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Login tests', () => {
  
  describe('post/login', () => {
    describe('Inserting a valid user', () => {
      beforeEach(() => {
        sinon.stub(UserModel, 'findOne').resolves(userBcrypt as UserModel)
      });

      afterEach(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
      });
      
      it('Should return a token with status "200"', async () => {
        const result = await chai.request(app).post('/login').send(user)

        expect(result.body).to.have.property('token');
      })

    });
  });

  describe('get/login/validate', () => {
    describe('Receiving a invalid token', () => {
      it('Should return a error with status 401', async () => {
        const res = await chai.request(app).get('/login/validate');
        // expect status
        expect(res.body).to.be.deep.equal({"message": "a valid token is required"});
      })
    })
  
  })
});
