/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import * as service from '../../../services/salaryService';
import * as model from '../../../models/salaryModel';
import * as userModel from '../../../models/userModel';
import * as data from '../../testData/salaryData';
import * as userData from '../../testData/userData';

const { expect } = chai;

describe('Test salary services', () => {
  describe('Test create service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(userModel, 'readOneById').resolves(userData.createdUserMock);
      sinon.stub(model, 'create').resolves(data.salaryMock);

      const salary = await service.create(data.createSalaryData);

      expect(salary).to.be.deep.equal(data.salaryMock);
    });
    it('When the user not exist in database', async () => {
      sinon.stub(userModel, 'readOneById').resolves(null);

      try {
        await service.create(data.createSalaryData);
      } catch ({ message }) {
        expect(message).to.be.equal('User not exists.');
      }
    });
  });
  describe('Test readOne service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(userModel, 'readOneById').resolves(userData.createdUserMock);
      sinon.stub(model, 'readOne').resolves(data.salaryArrayMock);

      const salary = await service.readOne(data.querySalary);

      expect(salary).to.be.deep.equal(data.salaryArrayMock[0]);
    });
    it('When the user not exist in database', async () => {
      sinon.stub(userModel, 'readOneById').resolves(null);

      try {
        await service.readOne(data.querySalary);
      } catch ({ message }) {
        expect(message).to.be.equal('User not exists.');
      }
    });
    it('When salary is not founded', async () => {
      sinon.stub(userModel, 'readOneById').resolves(userData.createdUserMock);
      sinon.stub(model, 'readOne').resolves([]);

      try {
        await service.readOne(data.querySalary);
      } catch ({ message }) {
        expect(message).to.be.equal('Salary not exists.');
      }
    });
  });
  describe('Test updateOne service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(model, 'readOneById').resolves(data.salaryMock);
      sinon.stub(model, 'updateOne').resolves(data.salaryMock);

      const salary = await service.updateOne(data.updateSalaryData);

      expect(salary).to.be.deep.equal(data.salaryMock);
    });
    it('When the user not exist in database', async () => {
      sinon.stub(model, 'readOneById').resolves(null);

      try {
        await service.updateOne(data.updateSalaryData);
      } catch ({ message }) {
        expect(message).to.be.equal('Salary not exists.');
      }
    });
  });
});
