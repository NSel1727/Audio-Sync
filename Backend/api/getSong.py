import requests
from pydub import AudioSegment
from shazamio import Shazam
from decouple import config

# Shazam API credentials
API_KEY = config('SHAZAM_API_KEY')

def identify_song(audio_file_path):
    # Load the audio file
    audio = AudioSegment.from_file(audio_file_path)

    # Convert audio to WAV format (Shazam API requires WAV format)
    audio = audio.set_channels(1).set_frame_rate(16000)

    shazam = Shazam(API_KEY)

    # Identify the song
    song_info = shazam.recognize_song(audio.raw_data, audio.frame_rate)

    return song_info

def main():
    audio_file_path = '../../output.wav'
    song_info = identify_song(audio_file_path)

    if song_info:
        artist = song_info['track']['subtitle']
        title = song_info['track']['title']
        song_list.append(f'{artist} - {title}')
        print(f'Identified Song: {artist} - {title}')
    else:
        print('Song not identified.')

if __name__ == '__main__':
    song_list = []
    main()