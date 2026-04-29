import winsound
import os

sound_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ulala.wav")
winsound.PlaySound(sound_path, winsound.SND_FILENAME)
