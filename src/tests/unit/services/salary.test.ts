/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import * as service from '../../../services/salaryService';
import * as model from '../../../models/salaryModel';
import * as data from '../../testData/salaryData';

const { expect } = chai;

describe('Test salary services', () => {
  describe('Test create service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(model, 'read').resolves(undefined);
      sinon.stub(model, 'create').resolves(data.salaryMock);

      const salary = await service.create(data.createSalaryData);

      expect(salary).to.be.deep.equal(data.salaryMock);
    });
    it('When the salary already exist in database', async () => {
      sinon.stub(model, 'read').resolves(data.salaryArrayMock);

      try {
        await service.create(data.createSalaryData);
      } catch ({ message, statusCode }) {
        expect(message).to.be.equal('Salary already exists.');
        expect(statusCode).to.be.equal(409)
      }
    });
  });
  describe('Test read service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(model, 'read').resolves(data.salaryArrayMock);

      const salary = await service.read(data.querySalary);

      expect(salary).to.be.deep.equal(data.salaryArrayMock[0]);
    });

    it('When salary is not founded', async () => {
      sinon.stub(model, 'read').resolves([]);

      try {
        await service.read(data.querySalary);
      } catch ({ message }) {
        expect(message).to.be.equal('Salary not exists.');
      }
    });

  });
  describe('Test updateOne service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(model, 'readOne').resolves(data.salaryMock);
      sinon.stub(model, 'updateOne').resolves(data.salaryMock);

      const salary = await service.updateOne(data.updateSalaryData);

      expect(salary).to.be.deep.equal(data.salaryMock);
    });
    it('When the user not exist in database', async () => {
      sinon.stub(model, 'readOne').resolves(null);

      try {
        await service.updateOne(data.updateSalaryData);
      } catch ({ message }) {
        expect(message).to.be.equal('Salary not exists.');
      }
    });
  });
});
