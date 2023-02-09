const ffmpeg = require('ffmpeg');
// https://www.npmjs.com/package/ffmpeg

// TRANSFORMAR QUALQUER VIDEO EM H.264
async function convert(){
	return new Promise((resolve, reject) => {
		try {
			let process = new ffmpeg('video.mp4');
			// ver https://gist.github.com/mikoim/27e4e0dc64e384adbcb91ff10a2d3678
			
			process.then(function (video) {
				video.addCommand('-c:v', 'libx264');
				video.save('video_p1.mp4', function (error, file) {
					if (!error)
						console.log('Convert success.');
						resolve()
				});
		
			}, function (error) {
				console.log('Error: ' + error);
				return reject(error)
			});
		} catch (e) {
			console.log(e.code);
			console.log(e.msg);
			return reject(e)
		}
	})		
}

async function extendVideoToMusic(musicLenghtSeconds){
	// ESTENDER VIDEO PARA O TAMANHO DA MUSICA
	return new Promise((resolve, reject) => {
		try {
			let process = new ffmpeg('video_p1.mp4');
			process.then(function (video) {
				//./ffmpeg -stream_loop 3 -i video_p1.mp4 -c copy -t 160 video_p2.mp4 (estende o video com limite de 160 segundos)
				//video.inputOption('-stream_loop 1000');
				//video.addFilterComplex('-stream_loop 1000');
				//.inputOption(-stream_loop -1);
				//video.addCommand('-i', 'video_p1.mp4');
				video.addCommand('-c', 'copy');
				video.addCommand('-t', musicLenghtSeconds);
				video.save('video_p2.mp4', function (error, file) {
					if (!error){
						console.log('Video extended: ' + file);
						resolve()
					}else {
						console.log('Video extended error: ' + error);
					}
						
				});
		
			}, function (err) {
				console.log('Error: ' + err);
				return reject(error)
			});
		} catch (e) {
			console.log(e.code);
			console.log(e.msg);
			return reject(e)
		}
	})	
}



async function start(){
	await convert();
	await extendVideoToMusic(724);
	
	
}

start();

