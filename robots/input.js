import readline from 'readline';

export async function input() { 
    return new Promise((resolve, reject) => { 

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Escolha a duração do vídeo final (em minutos): ', (answer) => {
            const escolha = parseInt(answer);
            if (isNaN(escolha) || escolha < 1) {
                console.log('Escolha inválida');
                rl.close();
                return;
            }
            rl.close();
            resolve(escolha * 60)
            
        })
    })
}