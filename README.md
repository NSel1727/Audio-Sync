# Audio Sync Project

AudioSync is a refined web application that engages device microphones to elegantly capture ambient audio. When a recognizable tune graces the air, it swiftly identifies the melody using the adept Shazam API, and graciously displays it on the site's frontend view. As the musical journey unfolds, multiple songs find their way to a meticulously crafted table on the website. The crescendo of this harmonious experience manifests as personalized Spotify links, created seamlessly from the symphony of songs that were captured and recognized, orchestrating a melodious bridge between the physical and digital realms of music.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python (3.8 or higher)
- Node.js (14.x or higher)

### Installing

1. Clone the repository

```
git clone https://github.com/your-username/audio-sync.git
cd audio-sync
```

3. Install the required Python libraries (This will also install Flask framework)
```
pip install -r requirements.txt
```

4. Install JavaScript dependencies
npm install


### Configuration

To run this project, you'll need to create a Spotify Developer account, create an application, and obtain the Client ID and Client Secret.

1. Go to Spotify Developer Dashboard.
2. log in or create an account.
3. Click on 'Create an App' and follow the prompts to create a new application.
4. Once your application is created, save the Client ID and Client Secret.

Now, create a .env file in the root directory of the project and add the following lines, replacing your-client-id and your-client-secret with your Spotify application credentials:
```
SPOTIPY_CLIENT_ID=your-client-id 
SPOTIPY_CLIENT_SECRET=your-client-secret
```

### Running the Application

Start the Flask backend
```
cd api
cd backend
python3 server.py
```

In a separate terminal, start the React frontend
```
cd api
cd frontend
npm start
```

### Now navigate to http://localhost:3000 in your browser to use Audio Sync!
