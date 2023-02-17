import fs from 'fs';
import readline from 'readline';


export async function readfilevideo() {
	return new Promise((resolve, reject) => {
		// Defina o caminho da pasta que você deseja listar
		const pasta = './videos';

		// Use o módulo fs para listar os arquivos na pasta
		fs.readdir(pasta, (err, files) => {
			if (err) {
				console.error(err);
				return;
			}

			// Crie uma interface readline para permitir a entrada do usuário
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});

			// Exiba a lista de arquivos para o usuário
			console.log('Arquivos na pasta:');
			for (let i = 0; i < files.length; i++) {
				console.log(`${i + 1}. ${files[i]}`);
			}

			// Peça ao usuário que escolha um arquivo
			rl.question('Escolha um arquivo (digite o número correspondente): ', (answer) => {
				const escolha = parseInt(answer);
				if (isNaN(escolha) || escolha < 1 || escolha > files.length) {
					console.log('Escolha inválida');
					rl.close();
					return;
				}

				// Grave o nome do arquivo escolhido em uma variável
				const nomeArquivo = files[escolha - 1];
				console.log(`Você escolheu o arquivo "${nomeArquivo}"`);
				rl.close();
				//return nomeArquivo
				resolve(nomeArquivo)
			});
		});
	})
}