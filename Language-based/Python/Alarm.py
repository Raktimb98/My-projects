import time
import datetime
import pygame

def set_alarm(alarm_time):
    print("Alarm set for", alarm_time)
    sound_file = "alarm.mp3"
    is_running = True

    while is_running:
        current_time = datetime.datetime.now().strftime("%H:%M:%S")
        print("Current time:", current_time)

        if current_time == alarm_time:
            print("Wake up!")
            pygame.mixer.init()
            pygame.mixer.music.load(sound_file)
            is_running = False
        time.sleep(1)

if __name__ == "__main__":
    alarm_time = input("Enter the alarm time in HH:MM:SS format: ")
    set_alarm(alarm_time)