import fs from 'fs';
import { dataStore } from './interface';

let data: dataStore = {
  voteSessions: [],
  voters: [],
  hosts: [],
}

/**
 * 
 * @returns {dataStore} data - The data store object containing vote sessions, voters, and hosts.
 * @description This function retrieves the data from the data store file.
 * It checks if the file exists, reads its content, and parses it into a JavaScript object.
 */
const getData = (): dataStore | undefined => {
  const filePath ="./dataStore.json";
  if (fs.existsSync(filePath)) {
    const voteSessionDataBuffer = fs.readFileSync(filePath);
    const jsonString = String(voteSessionDataBuffer);
    const data: dataStore = JSON.parse(jsonString);
    return data;
  }
}

/**
 * 
 * @param newData - The new data to be set in the data store.
 * @returns {void}
 * @description This function updates the data store with the new data provided.
 * It reads the existing data from the data store, updates it with the new data,
 * and writes the updated data back to the data store.
 */
const setData = (newData: dataStore) => {
  const updateData = JSON.stringify(newData);
  fs.writeFileSync('./dataStore.json', updateData);
}

export { getData, setData };