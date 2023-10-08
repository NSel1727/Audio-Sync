# Import flask and datetime module for showing date and time
from flask import Flask
import asyncio
  
# Initializing flask app
app = Flask(__name__)
  
# Route for seeing a data
@app.route('/audio')
def callAudioFunc():
    # Calls the callAudio function
    from api import createAudio
    createAudio.main()
    return ""

@app.route('/playlist')
def callPlaylistFunc():
    # Calls the generatePlaylist function
    from api import generatePlaylist
    return asyncio.run(generatePlaylist.main())

# Running app
if __name__ == '__main__':
    app.run(debug=True)