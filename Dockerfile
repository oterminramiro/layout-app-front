FROM node:11.13.0-alpine

# create destination directory
RUN mkdir -p /usr/src/front
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app
COPY . /usr/src/nuxt-app/

# install and build
RUN npm install
RUN npm run build

# expose port
EXPOSE 3000

# set app host
ENV HOST 0.0.0.0
ENV NUXT_HOST=0.0.0.0

# set app port
ENV NUXT_PORT=3000
ENV PORT=3000

CMD [ "npm", "run", "dev" ]
#CMD ["npm", "start"]
#CMD [ "npm", "run", "start" ]
