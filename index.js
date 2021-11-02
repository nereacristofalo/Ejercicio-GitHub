import { getRepoData } from './response-manager.js';
import { createInterface } from 'readline';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Ingresar nombre de usuario: ', (user) => {
  getRepoData(user).then(async (res) => {
    console.log('\nLa respuesta es:', JSON.stringify(await res, null, 2));
  });
  readline.close();
});
