# Use an explicit, tag-pinned version of the Python image for better reproducibility
FROM python:3.10-slim as base

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies in a separate layer
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application source code
COPY . .

# Expose the Streamlit port
EXPOSE 8501

# Create a non-root user and switch to it
RUN useradd -m myuser
USER myuser

# Set the default browser.serverAddress to localhost to make the logs less confusing
# This does not change the actual listening behavior of Streamlit
ENV STREAMLIT_SERVER_ADDRESS=localhost

# Set the Streamlit healthcheck
HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health || exit 1

# Set the entrypoint to run the Streamlit app
ENTRYPOINT ["streamlit", "run", "app/app.py", "--server.port=8501", "--server.address=0.0.0.0"]