# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./

RUN npm install

RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN ls
RUN npm rebuild node-sass
RUN npm run build

# production environment
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/default.conf  /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]