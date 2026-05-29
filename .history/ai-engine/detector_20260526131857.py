from flask import Flask, request, jsonify
from sklearn.ensemble import IsolationForest
import numpy as np

app = Flask(__name__)

# Training data
X_train = [[1], [2], [2], [3], [2], [1], [2]]

# Train AI model
model = IsolationForest(contamination=0.1)
model.fit(X_train)

@app.route('/detect', methods=['POST'])
def detect():

    data = request.json
    activity = data['activity']

    prediction = model.predict([[activity]])

    if prediction[0] == -1:
        result = "⚠ Suspicious Activity Detected"
    else:
        result = "✅ Normal Activity"

    return jsonify({
        "result": result
    })

if __name__ == '__main__':
    app.run(port=5001)