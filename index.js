//var ffmpeg = require('fluent-ffmpeg');
import ffmpeg from 'fluent-ffmpeg';
//const {google} = require('googleapis');
import {google} from 'googleapis';

// TRANSFORMAR QUALQUER VIDEO EM H.264
async function convert(_video, processNumber, processTotal){
	return new Promise((resolve, reject) => {
		console.log('START ' + processNumber + '/' + processTotal)
		ffmpeg()
		.input(_video)
		.videoCodec('libx264')
		.output('video_p1.mp4')
		.on('progress', (progress) => {
			console.log(`Progresso do processo ${processNumber}/${processTotal}: ${Math.round(progress.percent)}% concluído`);
		})
		.on('end', function() {
			console.log('FINISHED ' + processNumber + '/' + processTotal)
		  resolve()
		})
		.on('error', function(err) {
		  console.log('error: ', +err);
		  return reject(err)
		})
		.run();
	})
}

async function extendVideoToMusic(musicLenghtSeconds, processNumber, processTotal){ 
	// ESTENDER VIDEO PARA O TAMANHO DA MUSICA
	return new Promise((resolve, reject) => {
		console.log('START ' + processNumber + '/' + processTotal)
		ffmpeg()
		.input('video_p1.mp4')
		.inputOptions(['-stream_loop 1000'])
		.duration(musicLenghtSeconds)
		.output('video_p2.mp4')
		.outputOptions('-shortest')
		//.noVideo()
  		//.noAudio()
		.on('progress', (progress) => {
			console.log(`Progresso do processo ${processNumber}/${processTotal}: ${Math.round(progress.percent)}% concluído`);
		})
		.on('end', function() {
			console.log('FINISHED ' + processNumber + '/' + processTotal)
		  resolve()
		})
		.on('error', function(err) {
		  console.log('error: ', +err);
		  return reject(err)
		})
		.run();
	})

}

async function addMusic(music, processNumber, processTotal){ 
	// ESTENDER VIDEO PARA O TAMANHO DA MUSICA
	return new Promise((resolve, reject) => {
		console.log('START ' + processNumber + '/' + processTotal)
		ffmpeg()
		.addInput('video_p2.mp4')
		.addInput(music)

		.outputOptions(['-map 0:v', '-map 1:a', '-c:v copy', '-shortest'])
		.on('progress', (progress) => {
			console.log(`Progresso do processo ${processNumber}/${processTotal}: ${Math.round(progress.percent)}% concluído`);
		})
		.on('end', function() {
			console.log('FINISHED ' + processNumber + '/' + processTotal)
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
async function extendVideo(LenghtSeconds, processNumber, processTotal){ 
	// ESTENDER VIDEO PARA O TAMANHO DA MUSICA
	return new Promise((resolve, reject) => {
		console.log('START ' + processNumber + '/' + processTotal)
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
		.on('progress', (progress) => {
			console.log(`Progresso do processo ${processNumber}/${processTotal}: ${Math.round(progress.percent)}% concluído`);
		})
		.on('end', function() {
			console.log('FINISHED ' + processNumber + '/' + processTotal)
		  resolve()
		})
		.on('error', function(err) {
		  console.log('error: ', +err);
		  return reject(err)
		})
		.run();
	})

}


async function searchBestKeywords(subject) {
	google.search(subject, function(err, res) {
	  if (err) {
		console.error(`Ocorreu um erro ao pesquisar as palavras-chave para o tema "${subject}"`);
		return;
	  }
	
	  const keywords = [];
	
	  for (let i = 0; i < res.links.length; i += 1) {
		const link = res.links[i];
		keywords.push(link.title);
	  }
	
	  console.log(`As melhores palavras-chave para o tema "${subject}" são: ${keywords.join(', ')}`);
	});
  }


//const chooseVideo = require('./robots/readfilevideo');
//const chooseMusic = require('./robots/readfilemusic');
//const music = require('./robots/music');
//const input = require('./robots/input');


import { readfilevideo } from './robots/readfilevideo.js';
import { readfilemusic } from './robots/readfilemusic.js';
import { getLengthMusic } from './robots/music.js';
import { input } from './robots/input.js';

const folderVideo = './videos/'
const folderMusic = './musicas/'
const processTotal = 5

async function start(){
	var videoSelected	= await readfilevideo()
	var musicSelected 	= await readfilemusic()
	var duration 		= await input()

	console.log('### AGUARDE ###')

	await convert(folderVideo + videoSelected, 1, processTotal);
	var musicLength = await getLengthMusic(folderMusic + musicSelected, 2, processTotal)
	await extendVideoToMusic(musicLength, 3, processTotal);
	await addMusic(folderMusic + musicSelected, 4, processTotal);
	await extendVideo(duration, 5, processTotal);

	//console.log('videoSelected: ', videoSelected)
	//console.log('musicSelected: ', musicSelected)
	//console.log('duration: ', duration)
	//console.log('musicLength: ', musicLength)
	
}

start();