from pydub import AudioSegment
from shazamio import Shazam
import os


# Shazam API credentials
API_KEY = os.environ.get('SHAZAM_API_KEY')



async def identify_song(audio_file_path):
    
    audio = AudioSegment.from_file(audio_file_path)
    audio = audio.set_channels(1).set_frame_rate(16000)
    
    intermediate_file = "../intermediate.wav"
    audio.export(intermediate_file, format="WAV")

    shazam = Shazam(API_KEY)  # Using Shazam with its default settings
    

    try:
        song_info = await shazam.recognize_song(intermediate_file)

        if song_info:
            artist = song_info['track']['subtitle']
            title = song_info['track']['title']
            print(f'Identified Song: {artist} - {title}')
            return song_info
        else:
            print('Song not identified.')
            return None
    except Exception as e:
        print(f"Error occurred during song identification: {str(e)}")
        print('Song not identified.')
        return None
    


async def main():
    audio_file_path = 'output.wav'
    
    await identify_song(audio_file_path)

if __name__ == '__main__':
    import asyncio

    asyncio.run(main())