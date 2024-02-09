# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
# Docker uses linux-style containers by default
# This address is following the logic of linux file system
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /usr/src/app
# . . means "copy everything from the context directory 
# (usually the directory where the Dockerfile is located) 
# into the current working directory inside the container,"
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
# Match the port number in app.py
EXPOSE 5000

# Create a non-root user and switch to it
# This is a security best practice when building docker containers. 
RUN useradd -m myuser
USER myuser

# Define environment variable
#  this name environment variable can be accessed by python at runtime. 
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]