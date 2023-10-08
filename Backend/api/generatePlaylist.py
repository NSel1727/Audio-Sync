#NOTES THIS COMBINES GET SONG.PY AND INTEGRATES SPOTIFY FEATURES, STILL HAS SAME FUNCTIONALITY
#CAN REMOVE GET SONG.PY
import asyncio
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from shazamio import Shazam
from pydub import AudioSegment
import requests
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

# API, SPOTFIY DEVELOPERS
SPOTIPY_CLIENT_ID = os.environ.get("CLIENT_ID")
SPOTIPY_CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
SPOTIPY_REDIRECT_URI = 'http://localhost:8888/callback'

# Auth Manage
sp_auth_manager = SpotifyOAuth(
    client_id=SPOTIPY_CLIENT_ID,
    client_secret=SPOTIPY_CLIENT_SECRET,
    redirect_uri=SPOTIPY_REDIRECT_URI,
    scope='playlist-modify-public' 
)

sp = spotipy.Spotify(auth_manager=sp_auth_manager)

async def identify_song(audio_file_path):
    audio = AudioSegment.from_file(audio_file_path)
    audio = audio.set_channels(1).set_frame_rate(16000)
    
    intermediate_file = "../intermediate.wav"
    audio.export(intermediate_file, format="WAV")

    shazam = Shazam()
    
    try:
        song_info = await shazam.recognize_song(intermediate_file)
        if song_info:
            artist = song_info['track']['subtitle']
            title = song_info['track']['title']
            print(f'Identified Song: {artist} - {title}')
            return {
                "artist": artist,
                "title" : title
            }
        else:
            print('Song not identified.')
            return None
    except Exception as e:
        print(f"Error occurred during song identification: {str(e)}")
        print('Song not identified.')
        return None

def create_playlist(username, playlist_name, track_uris):
    playlist = sp.user_playlist_create(user=username, name=playlist_name)
    playlist_id = playlist['id']
    playlist_url = playlist['external_urls']['spotify']

    #creates then adds items to a spotify playlist
    sp.playlist_add_items(playlist_id=playlist_id, items=track_uris)

    return playlist_url

async def main():
    audio_file_path = 'output.wav'
    identified_song = await identify_song(audio_file_path)
    
    if identified_song != None:
        # search all of spotify for a song's URI
        query = f"artist:{identified_song['artist']} track:{identified_song['title']}"
        search_result = sp.search(query, type='track', limit=1)
        if search_result['tracks']['items']:
            track = search_result['tracks']['items'][0]
            track_uri = track['uri']
            cover_art_url = track['album']['images'][0]['url']  # this assumes a song is recognized, and displays the cover art, if no song is recognized we should return None
            
            #Using Image, downloads the cover art, displays it with default image viewing software, would need to connect and display on frontend web app instead changes required
            response = requests.get(cover_art_url)
            img = Image.open(BytesIO(response.content))
            img.show()

            # Creates a playlist and add the identified songs to it
            username = '9poogizcvl3fekpo9eot8n8uq'
            playlist_name = 'Audio-Sync'
            playlist_link = create_playlist(username, playlist_name, [track_uri])
            print(f'Playlist Link: {playlist_link}')

            res = {
                "title": identified_song.title,
                "artist": identified_song.artist,
                "imgLink": cover_art_url,
                "playlistLink": playlist_link
            }

            return res
        else:
            print(f"Song {identified_song['artist']} - {identified_song['title']} not found on Spotify.")
            return None


if __name__ == '__main__':
    asyncio.run(main())

