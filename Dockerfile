# set node image with version
FROM node:18.13.0

# create directory
RUN mkdir /application

# set work directory
WORKDIR /application

# copy all sources to container
COPY . /application

# install dependencies
RUN npm install
RUN npm run build

# run your application
CMD npm run start

EXPOSE 3000