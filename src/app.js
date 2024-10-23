import { createObjectCsvWriter } from 'csv-writer';
import { faker } from '@faker-js/faker';
import moment from 'moment-timezone';
import { generateCode } from './codeGenerator.js';

const csvWriter = createObjectCsvWriter({
  path: './files/output.csv',
  header: [
    { id: 'poliza', title: 'Poliza' },
    { id: 'monto', title: 'Monto' },
    { id: 'fecha', title: 'Fecha' },
    { id: 'descripcion', title: 'Descripcion' },
  ]
});

const getRandomAmount = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createPoliza = () => {
  try {
    const poliza = {
      poliza: generateCode(5),
      monto: getRandomAmount(1000, 10000),
      fecha: moment(faker.date.past()).format('DD/MM/YYYY HH:mm:ss'),
      descripcion: faker.lorem.sentence(),
    }
  
    csvWriter
      .writeRecords([poliza])
      .then(() => console.log('The CSV file was written successfully'));
  } catch (error) {
    console.log(error)
  }
}