from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../dist", static_url_path="/")

# Enable CORS for API routes (optional)
CORS(app)

# Serve static files from the 'dist' folder
@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_static(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        # Fallback to index.html for SPA routing
        return send_from_directory(app.static_folder, "index.html")

# Example API endpoint
@app.route("/api/hello", methods=["GET"])
def hello_api():
    return {"message": "Hello from the Python backend!"}

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
