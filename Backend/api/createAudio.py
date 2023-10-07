import sounddevice as sd
import numpy as np
import wavio

RATE = 44100  # Sample rate
CHANNELS = 1  # Mono
DURATION = 5  # Seconds
FORMAT = np.int16  # Similar to pyaudio.paInt16

print("Recording...")

# Record audio
recording = sd.rec(int(DURATION * RATE), samplerate=RATE, channels=CHANNELS, dtype=FORMAT)
sd.wait()  # Wait for the recording to finish

print("Finished recording")

# Save as a WAV file
wavio.write("output.wav", recording, RATE, sampwidth=2)  # sampwidth=2 -> 16 bits
