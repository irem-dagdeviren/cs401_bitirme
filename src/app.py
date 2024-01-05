from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)
@app.route('/get_result', methods=['POST'])
def get_result():
    try:
        data = request.get_json()
        user_url = data.get('url')

        # Run your Python script with the user-provided URL
        print("calculating your web site grade")
        result = subprocess.check_output(['python', 'main.py', user_url])

        return jsonify({'result': result.decode('utf-8')})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
