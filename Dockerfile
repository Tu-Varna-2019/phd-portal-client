FROM alpine:3.21
ARG DOCKER_USER=react
RUN addgroup -S ${DOCKER_USER} && adduser -S ${DOCKER_USER} -G ${DOCKER_USER}

FROM node:23.3.0-alpine3.19 AS build
USER ${DOCKER_USER}

COPY --chown=${DOCKER_USER}:${DOCKER_USER} package.json /phd-portal-client/
COPY --chown=${DOCKER_USER}:${DOCKER_USER} package-lock.json /phd-portal-client/

WORKDIR /phd-portal-client
RUN npm install --legacy-peer-deps



LABEL org.opencontainers.image.source=https://github.com/Tu-Varna-2019/phd-portal-server \
	version="0.0.1-RELEASE" \
	description="Masters thesis for developing Client web app" \
	author="Iliyan Kostov" \
	env="prod"

FROM node:23.3.0-alpine3.19
WORKDIR /client_app
COPY --from=build /phd-portal-client/ /client_app/
COPY --chown=${DOCKER_USER}:${DOCKER_USER} src /client_app/src/
COPY --chown=${DOCKER_USER}:${DOCKER_USER} jsconfig.json /client_app/
COPY --chown=${DOCKER_USER}:${DOCKER_USER} next.config.mjs /client_app/
COPY --chown=${DOCKER_USER}:${DOCKER_USER} tailwind.config.js /client_app/

USER ${DOCKER_USER}
EXPOSE 3000
CMD [ "sh", "-c", "npm run build && npm run start" ]
