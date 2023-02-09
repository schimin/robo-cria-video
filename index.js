var ffmpeg = require('fluent-ffmpeg');

// TRANSFORMAR QUALQUER VIDEO EM H.264
async function convert(){
	return new Promise((resolve, reject) => {
		ffmpeg()
		.input('video.mp4')
		.videoCodec('libx264')
		.output('video_p1.mp4')
		.on('end', function() {
		  console.log('conversion completed');
		  resolve()
		})
		.on('error', function(err) {
		  console.log('error: ', +err);
		  return reject(err)
		})
		.run();
	})
}

async function extendVideoToMusic(musicLenghtSeconds){ 
	// ESTENDER VIDEO PARA O TAMANHO DA MUSICA
	return new Promise((resolve, reject) => {
		ffmpeg()
		.input('video_p1.mp4')
		.inputOptions([
			'-stream_loop 1000'
		  ])
		.duration(700)
		//.noVideo()
  		//.noAudio()
		.output('video_p2.mp4')
		.on('end', function() {
		  console.log('conversion completed 2');
		  resolve()
		})
		.on('error', function(err) {
		  console.log('error: ', +err);
		  return reject(err)
		})
		.run();
	})

}

async function addMusic(){ 
	// ESTENDER VIDEO PARA O TAMANHO DA MUSICA
	return new Promise((resolve, reject) => {
		ffmpeg()
		.addInput('video_p2.mp4')
		.addInput('music.mp3')

		.outputOptions(['-map 0:v', '-map 1:a', '-c:v copy', '-shortest'])
		
		.on('end', function() {
		  console.log('Add music completed');
		  resolve()
		})
		.on('error', function(err) {
		  console.log('error: ', +err);
		  return reject(err)
		})
		.saveToFile("video_p3.mp4", "./")
	})
	
}

//./ffmpeg -stream_loop 10000 -i video_p3.mp4 -c copy -t 3600 video_final.mp4
async function extendVideo(LenghtSeconds){ 
	// ESTENDER VIDEO PARA O TAMANHO DA MUSICA
	return new Promise((resolve, reject) => {
		ffmpeg()
		.input('video_p3.mp4')
		.inputOptions([
			'-stream_loop 1000'
		  ])
		//.duration(700)
		.outputOptions(['-c copy', '-t ' + LenghtSeconds,])
		//.noVideo()
  		//.noAudio()
		.output('video_final.mp4')
		.on('end', function() {
		  console.log('extendVideo completed');
		  resolve()
		})
		.on('error', function(err) {
		  console.log('error: ', +err);
		  return reject(err)
		})
		.run();
	})

}


async function start(){
	//await convert();
	//await extendVideoToMusic(724);
	//await addMusic();
	await extendVideo(3660);
	
}

start();