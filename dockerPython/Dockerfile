FROM alpine:3.1

# Update
RUN apk add --update python py-pip

# Install app dependencies
RUN pip install Flask Tensorflow Fire regex

# Bundle app source
COPY hive3.py /src/hive3.py

EXPOSE  8000
CMD ["python", "/src/hive3.py", "-p 8000"]