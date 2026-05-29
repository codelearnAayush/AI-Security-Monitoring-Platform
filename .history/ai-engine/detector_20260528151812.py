from flask import Flask, request, jsonify

from sklearn.ensemble import IsolationForest

import numpy as np

app = Flask(__name__)

# Training Data
# Normal user behavior examples

X = np.array([
    [10],
    [12],
    [15],
    [18],
    [20],
    [22],
    [25],
    [28],
    [30]
])

# Train AI Model

model = IsolationForest(
    contamination=0.2,
    random_state=42
)

model.fit(X)

@app.route('/predict', methods=['POST'])

def predict():

    data = request.json

    activity = data['activity']

    prediction = model.predict([[activity]])

    if prediction[0] == -1:

        result = '⚠ Suspicious Activity Detected'

    else:

        result = '✅ Normal Activity'

    return jsonify({
        'result': result
    })

if __name__ == '__main__':

    app.run(port=5001)