FROM node:10.13-alpine
# ENV NODE_ENV production
WORKDIR /frontend
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
EXPOSE 3100
CMD npm start