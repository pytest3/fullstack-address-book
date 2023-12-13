# # syntax = docker/dockerfile:1

# # Adjust NODE_VERSION as desired
# ARG NODE_VERSION=20.7.0
# FROM node:${NODE_VERSION}-slim as base

# LABEL fly_launch_runtime="Node.js"

# # Node.js app lives here
# WORKDIR /app

# # Set production environment
# ENV NODE_ENV="production"


# # Throw-away build stage to reduce size of final image
# FROM base as build

# # Install packages needed to build node modules
# RUN apt-get update -qq && \
#     apt-get install -y build-essential pkg-config python-is-python3

# # Install node modules
# COPY --link package-lock.json package.json ./
# RUN npm ci

# # Copy application code
# COPY --link . .


# # Final stage for app image
# FROM base

# # Copy built application
# COPY --from=build /app /app

# # Start the server by default, this can be overwritten at runtime
# EXPOSE 3000
# CMD [ "npm", "run", "start" ]


FROM debian:bullseye as builder

ENV PATH=/usr/local/node/bin:$PATH
ARG NODE_VERSION=16.15.1

RUN apt-get update; apt install -y curl python-is-python3 pkg-config build-essential && \
    curl -sL https://github.com/nodenv/node-build/archive/master.tar.gz | tar xz -C /tmp/ && \
    /tmp/node-build-master/bin/node-build "${NODE_VERSION}" /usr/local/node && \
rm -rf /tmp/node-build-master

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install

FROM debian:bullseye-slim

LABEL fly_launch_runtime="nodejs"

COPY --from=builder /usr/local/node /usr/local/node
COPY --from=builder /app /app
COPY release.sh /release.sh

WORKDIR /app
ENV NODE_ENV production
ENV PATH /usr/local/node/bin:$PATH

CMD [ "npm", "run", "start" ]