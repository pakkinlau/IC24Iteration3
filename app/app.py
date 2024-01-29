import streamlit as st
from textblob import TextBlob

# Function to perform sentiment analysis
def analyze_sentiment(text):
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0:
        return 'Positive'
    elif analysis.sentiment.polarity == 0:
        return 'Neutral'
    else:
        return 'Negative'

# Streamlit app
def main():
    st.title("Document Sentiment Analysis")

    # File uploader
    uploaded_file = st.file_uploader("Choose a text file", type="txt")

    if uploaded_file is not None:
        # To read file as string:
        text = str(uploaded_file.read(), "utf-8")
        st.write("Analyzing Sentiment...")
        sentiment = analyze_sentiment(text)
        st.write(f"The overall sentiment of the document is: {sentiment}")

if __name__ == "__main__":
    main()
