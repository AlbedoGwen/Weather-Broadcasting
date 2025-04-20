from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def weather():
    city = request.form['city']
    url = f"https://wttr.in/{city}?T"  
    response = requests.get(url)

    if response.status_code == 200:
        weather_report = response.text

        # Remove unwanted promotional line
        lines = weather_report.split('\n')
        lines = [line for line in lines if "Follow @igor_chubin" not in line]
        weather_report = '\n'.join(lines)
    else:
        weather_report = "Sorry, weather data is not available at the moment."

    return render_template('weather.html', city=city.capitalize(), weather_report=weather_report)


if __name__ == '__main__':
    app.run(debug=True)
