video.mp4
music.mp3


PASSO 1: CONVERTER VIDEO PARA H264
./ffmpeg -i video.mp4 -filter_complex "[0:v]setpts=PTS-STARTPTS,loop=200:0[v]" -map "[v]" -c:v libx264 video_p1.mp4
./ffmpeg -i video.mp4 -c:v libx264 video_p1.mp4 (Mais simples)

PASSO 2: ESTENDER O VIDEO DE 1 MINUTO PARA 2:40
./ffmpeg -stream_loop 3 -i video_p1.mp4 -c copy output.mp4 (estende o video em mais 3x, 1 minuto ficou 4 minutos)
./ffmpeg -stream_loop 3 -i video_p1.mp4 -c copy -t 160 video_p2.mp4 (estende o video com limite de 160 segundos)

153

PASSO 3: ADICIONAR A MUSICA
./ffmpeg -i video_p2.mp4 -i music.mp3 -c:v copy -c:a aac -map 0:v -map 1:a -shortest video_p3.mp4

PASSO 4: ESTENDER VIDEO PARA DURAÇÃO FINAL
./ffmpeg -stream_loop 10000 -i video_p3.mp4 -c copy -t 3600 video_final.mp4

PASSO 5: opcional CONVERTER PARA OTIMIZAR YOUTUBE
./ffmpeg -i video_final.mp4 -c:v libx264 -preset slow -b:v 3500k -c:a aac -b:a 256k -r 30 video_final_final.mp4














