from sklearn.ensemble import IsolationForest
import numpy as np

# Normal user behavior data
data = np.array([
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
    [1, 1],
    [2, 1]
])

# Train model
model = IsolationForest(
    n_estimators=100,
    contamination=0.2,
    random_state=42
)

model.fit(data)

# Very abnormal activity
new_activity = np.array([[100, 100]])

# Predict
prediction = model.predict(new_activity)

print("Prediction:", prediction)

if prediction[0] == -1:
    print("⚠ Suspicious Activity Detected")
else:
    print("✅ Normal Activity")