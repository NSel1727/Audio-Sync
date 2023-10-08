import sounddevice as sd
import numpy as np
import wavio


def main():

    RATE = 44100  # Sample rate
    CHANNELS = 1  # Mono
    DURATION = 5  # Seconds
    FORMAT = np.int16 #Like pyaudio, but using sounddevice since it automatically accounts for the device's default microphone.

    print("Recording...")

    # Record audio
    recording = sd.rec(int(DURATION * RATE), samplerate=RATE, channels=CHANNELS, dtype=FORMAT)
    sd.wait()  # Wait for the recording to finish

    print("Finished recording")

    # Save as a WAV file
    wavio.write("output.wav", recording, RATE, sampwidth=2)  # sampwidth=2 -> 16 bits


if __name__ == '__main__':
    main()
