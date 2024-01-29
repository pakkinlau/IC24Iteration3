# utils.py
from azure.storage.blob import BlobServiceClient
import config

def upload_to_blob_storage(file_stream, file_name):
    """
    Uploads file to Azure Blob Storage.

    Args:
    file_stream: The file stream to upload.
    file_name: The name of the file in the blob storage.
    """
    blob_service_client = BlobServiceClient(account_url=config.BLOB_ACCOUNT_URL, credential=config.BLOB_SAS_TOKEN)
    blob_client = blob_service_client.get_blob_client(container=config.BLOB_CONTAINER_NAME, blob=file_name)

    try:
        blob_client.upload_blob(file_stream, blob_type="BlockBlob")
        return True
    except Exception as e:
        print(f"An error occurred: {e}")
        return False