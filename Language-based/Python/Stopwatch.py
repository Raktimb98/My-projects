import sys
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QPushButton, QLabel, QHBoxLayout
from PyQt5.QtCore import QTimer, QTime, Qt

class Stopwatch(QWidget):
    def __init__(self):
        super().__init__()
        self.time = QTime(0, 0, 0, 0)
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_display)

        self.time_label = QLabel("00:00:00:000", self)
        self.start_button = QPushButton("Start", self)
        self.stop_button = QPushButton("Stop", self)
        self.reset_button = QPushButton("Reset", self)

        self.initUI()

    def initUI(self):
        self.setWindowTitle("Stopwatch")
        self.setFixedSize(300, 200)

        # Styling
        self.setStyleSheet("""
            QWidget {
                background-color: #2E2E2E;
                color: white;
                font-family: Arial;
            }
            QLabel {
                font-size: 32px;
                padding: 20px;
                border: 2px solid #5C5C5C;
                border-radius: 10px;
                background-color: #1C1C1C;
            }
            QPushButton {
                font-size: 16px;
                padding: 10px;
                border-radius: 8px;
                background-color: #007ACC;
                color: white;
            }
            QPushButton:hover {
                background-color: #005999;
            }
            QPushButton:pressed {
                background-color: #003F73;
            }
        """)

        self.time_label.setAlignment(Qt.AlignCenter)

        # Layouts
        vbox = QVBoxLayout()
        hbox = QHBoxLayout()

        vbox.addWidget(self.time_label)
        hbox.addWidget(self.start_button)
        hbox.addWidget(self.stop_button)
        hbox.addWidget(self.reset_button)
        vbox.addLayout(hbox)

        self.setLayout(vbox)

        # Connect buttons
        self.start_button.clicked.connect(self.start)
        self.stop_button.clicked.connect(self.stop)
        self.reset_button.clicked.connect(self.reset)

    def start(self):
        if not self.timer.isActive():
            self.timer.start(10)

    def stop(self):
        if self.timer.isActive():
            self.timer.stop()

    def reset(self):
        self.timer.stop()
        self.time = QTime(0, 0, 0, 0)
        self.time_label.setText("00:00:00:000")

    def update_display(self):
        self.time = self.time.addMSecs(10)
        self.time_label.setText(self.format_time(self.time))

    def format_time(self, time):
        return time.toString("hh:mm:ss:zzz")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    stopwatch = Stopwatch()
    stopwatch.show()
    sys.exit(app.exec_())
