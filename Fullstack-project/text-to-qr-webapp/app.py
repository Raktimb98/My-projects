from flask import Flask, render_template, request
import qrcode
import io
import base64

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    qr_img = None
    if request.method == 'POST':
        text = request.form['text']
        img = qrcode.make(text)
        buf = io.BytesIO()
        img.save(buf, format='PNG')
        buf.seek(0)
        img_base64 = base64.b64encode(buf.getvalue()).decode('ascii')
        qr_img = img_base64
    return render_template('index.html', qr_img=qr_img)

if __name__ == '__main__':
    app.run(debug=True)
