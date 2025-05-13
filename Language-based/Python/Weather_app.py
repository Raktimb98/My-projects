import sys
import requests
from PyQt5.QtWidgets import QApplication, QLabel, QLineEdit, QPushButton, QVBoxLayout, QWidget
from PyQt5.QtCore import Qt

class WeatherApp(QWidget):
    def __init__(self):
        super().__init__()
        self.city_label = QLabel("Enter city name:", self)
        self.city_input = QLineEdit(self)
        self.get_weather_button = QPushButton("Get Weather", self)
        self.temperature_label = QLabel(self)
        self.emoji_label = QLabel(self)
        self.description_label = QLabel(self)
        self.initUI()

    def initUI(self):
        self.setWindowTitle("Weather App")

        vbox = QVBoxLayout()
        vbox.addWidget(self.city_label)
        vbox.addWidget(self.city_input)
        vbox.addWidget(self.get_weather_button)
        vbox.addWidget(self.temperature_label)
        vbox.addWidget(self.emoji_label)
        vbox.addWidget(self.description_label)
        self.setLayout(vbox)

        self.city_label.setAlignment(Qt.AlignCenter)
        self.city_input.setAlignment(Qt.AlignCenter)
        self.temperature_label.setAlignment(Qt.AlignCenter)
        self.emoji_label.setAlignment(Qt.AlignCenter)
        self.description_label.setAlignment(Qt.AlignCenter)

        self.city_label.setObjectName("city_label")
        self.city_input.setObjectName("city_input")
        self.get_weather_button.setObjectName("get_weather_button")
        self.temperature_label.setObjectName("temperature_label")
        self.emoji_label.setObjectName("emoji_label")
        self.description_label.setObjectName("description_label")

        self.setStyleSheet("""
QLabel, QPushButton {
    font-family: Arial;
}
QLabel#city_label {
    font-size: 40px;
    font-style: italic;
}
QLineEdit#city_input {
    font-size: 40px;
}
QPushButton#get_weather_button {
    font-size: 30px;
    font-weight: bold;
}
QLabel#temperature_label {
    font-size: 100px;
    color: blue;
}
QLabel#emoji_label {
    font-size: 100px;
    font-family: Segoe UI Emoji;
}
QLabel#description_label {
    font-size: 40px;
    color: green;
}
""")
        
        self.get_weather_button.clicked.connect(self.get_weather)

    def get_weather(self):
        api_key = "👍"
        city = self.city_input.text()
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            if data["cod"] == 200:
                self.display_weather(data)
            
        except requests.exceptions.HTTPError:
            match response.status_code:
                case 400:
                    self.display_error("Bad request.")
                case 401:
                    self.display_error("Invalid API key.")
                case 403:
                    self.display_error("Access denied.")
                case 404:
                    self.display_error("City not found.")
                case 429:
                    self.display_error("Too many requests.")
                case 500:
                    self.display_error("Internal server error.")
                case 502:
                    self.display_error("Bad gateway.")
                case 503:
                    self.display_error("Service unavailable.")
                case 504:
                    self.display_error("Gateway timeout.")
                case _:
                    self.display_error("An error occurred.\n{response.status_code}")
        except requests.exceptions.ConnectionError:
            self.display_error("Connection error. Please check your internet connection.")
        except requests.exceptions.Timeout:
            self.display_error("Request timed out. Please try again later.")
        except requests.exceptions.TooManyRedirects:
            self.display_error("Too many redirects. Please check the URL.")
        except requests.exceptions.RequestException as req_err:
            self.display_error(f"An error occurred: {req_err}")

    def display_error(self, message):
        self.temperature_label.setStyleSheet("color: red; font-size: 20px;")
        self.temperature_label.setText(message)

    def display_weather(self,data):
        temperature_K = data["main"]["temp"]
        temperature_C = temperature_K - 273.15
        # temperature_F = (temperature_K * 9/5) - 459.67
        weather_id = data["weather"][0]["id"]
        weather_description = data["weather"][0]["description"]
        self.temperature_label.setStyleSheet("color: blue; font-size: 20px;")

        self.temperature_label.setText(f"{temperature_C:.0f}°C")
        self.emoji_label.setText(self.get_emoji(weather_id))
        self.description_label.setText(weather_description.capitalize())

    @staticmethod
    def get_emoji(weather_id):

        if 200 <= weather_id < 232:
            return "⛈️"
        elif 300 <= weather_id < 321:
            return "🌦️"
        elif 500 <= weather_id < 532:
            return "🌧️"
        elif 600 <= weather_id < 622:
            return "❄️"
        elif 701 <= weather_id < 782:
            return "🌫️"
        elif 800 <= weather_id < 801:
            return "☀️"
        elif weather_id == 801:
            return "🌤️"
        elif 802 <= weather_id < 804:
            return "☁️"
        elif weather_id == 900:
            return "🌪️"
        elif weather_id == 901:
            return "🌊"
        elif weather_id == 902:
            return "🌀"
        elif weather_id == 903:
            return "❄️"
        elif weather_id == 904:
            return "🌡️"
        elif weather_id == 905:
            return "💨"
        elif weather_id == 906:
            return "🌨️"
        elif weather_id == 951:
            return "🌬️"
        elif weather_id == 952:
            return "🌪️"
        elif weather_id == 953:
            return "🌫️"
        else:
            return "❓"
        # Add more emojis as needed

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = WeatherApp()
    window.show()
    sys.exit(app.exec_())