from sklearn.ensemble import IsolationForest
import numpy as np

# Sample user activity data
# Normal behavior
data = np.array([
    [2, 1],
    [3, 1],
    [2, 2],
    [3, 2],
    [2, 1]
])

# Train AI model
model = IsolationForest(contamination=0.1)
model.fit(data)

# New suspicious activity
new_activity = np.array([[50, 50]])

prediction = model.predict(new_activity)

if prediction[0] == -1:
    print("⚠ Suspicious Activity Detected")
else:
    print("✅ Normal Activity")