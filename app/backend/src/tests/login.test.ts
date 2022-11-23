import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UserModel';
import user from './helpers/login';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Login tests', () => {
  describe('post/login', () => {
    describe('insert a valid user', () => {
      beforeEach(() => {
        sinon.stub(UserModel, 'findOne').resolves(user as UserModel)
      });

      afterEach(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
      });
      
      it('should return a token with status "200"', async () => {
        const result = await chai.request(app).post('/login').send(user)

        expect(result.body).to.have.property('token');
      })

    });
  });
});
