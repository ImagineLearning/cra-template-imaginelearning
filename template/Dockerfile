#########################
### build environment ###
#########################

# base image
FROM node:12.16.0 as builder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# start with dependencies
COPY .*rc /usr/src/app/
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

# install dependencies
RUN yarn install --non-interactive

# add app source files
COPY . /usr/src/app

# generate build
RUN yarn build

###################
### test runner ###
###################

FROM builder as test-runner
ENV CI=true
ENTRYPOINT ["yarn", "test"]

##################
### production ###
##################

# base image
FROM nginx:1.15.9-alpine

# tell Docker how to properly shut down nginx
STOPSIGNAL SIGQUIT

# add nginx config and starup script
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY docker-entrypoint.sh /usr/local/bin/

# remove default nginx config and make startup script executable
RUN rm /etc/nginx/conf.d/default.conf && \
	chmod +x /usr/local/bin/docker-entrypoint.sh && \
	ln -s /user/local/bin/docker-entrypoint.sh /

# copy build artifacts from the 'builder' stage
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# expose port
EXPOSE 80

# run startup script
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
