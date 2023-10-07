# Import flask and datetime module for showing date and time
from flask import Flask
  
# Initializing flask app
app = Flask(__name__)
  
# Route for seeing a data
@app.route('/audio')
def callAudioFunc():
    # Calls the callAudio function
    return None

@app.route('/song')
def callSongFunc():
    # Calls the getSong function
    return None

# Running app
if __name__ == '__main__':
    app.run(debug=True)