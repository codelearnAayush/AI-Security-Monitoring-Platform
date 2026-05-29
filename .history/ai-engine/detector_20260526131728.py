from sklearn.ensemble import IsolationForest
import numpy as np

# Training data (normal activity)
X_train = [[1], [2], [2], [3], [2], [1], [2]]

# Create model
model = IsolationForest(contamination=0.1)

# Train model
model.fit(X_train)

# Test suspicious activity
X_test = [[100]]

# Prediction
prediction = model.predict(X_test)

print(prediction)

if prediction[0] == -1:
    print("⚠ Suspicious Activity Detected")
else:
    print("✅ Normal Activity")