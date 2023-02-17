import { parseFile } from 'music-metadata';
import fs from 'fs';

export async function getLengthMusic(_file, processNumber, processTotal) {
  try {
    console.log('START ' + processNumber + '/' + processTotal)
    const caminhoDoArquivo = _file;
    const metadata = await parseFile(caminhoDoArquivo);
    //console.log(`O comprimento do arquivo é de ${metadata.format.duration} segundos`);
    console.log('FINISHED ' + processNumber + '/' + processTotal)
    return Math.round(metadata.format.duration)
  } catch (error) {
    console.error(error.message);
  }
}
