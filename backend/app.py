from flask import Flask, request, jsonify
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential
import pandas as pd
import numpy as np

app = Flask(__name__)

# Replace with your Azure Document Intelligence key and endpoint
key = "dd508fa001674a76a10c909e3268b98f"
endpoint = "https://analyzedocuments.cognitiveservices.azure.com/"

# Authenticate the client with your key and endpoint
document_analysis_client = DocumentAnalysisClient(endpoint, AzureKeyCredential(key))

@app.route('/')
def home():
    return "Welcome to the Document Analysis API!"

@app.route('/analyze', methods=['POST'])
def analyze_document():
    if 'document' not in request.files:
        return jsonify({"error": "No document part in the request"}), 400

    file = request.files['document']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    try:
        # Open the file and send it to the Azure service
        poller = document_analysis_client.begin_analyze_document("prebuilt-document", document=file.stream)
        result = poller.result()

        # Initialize an empty list to hold data for each table
        tables = []

        for table_idx, table in enumerate(result.tables):
            tbl = table.to_dict()
            row = tbl['row_count']
            col = tbl['column_count']
            result_tbl = np.empty((row, col), dtype=object)
            for cell in tbl['cells']:
                result_tbl[cell['row_index'], cell['column_index']] = str(cell['content'])
            result_df = pd.DataFrame(result_tbl)
            # Convert DataFrame to JSON
            tables.append(result_df.to_json(orient='split'))

        response = jsonify(tables)

    except Exception as e:
        print(e)  # This will print the error to the console
        return jsonify({"error": str(e)}), 500
    
    # Add CORS headers
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")

    return response, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)