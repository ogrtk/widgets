FROM "mcr.microsoft.com/devcontainers/base:bullseye"
SHELL ["/bin/bash", "-c"]

# Settings for Docker out of Docker(Install docker-cli)
RUN apt update
RUN apt install ca-certificates curl gnupg2 -y
# RUN install -m 0755 -d /etc/apt/keyrings
# RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg2 --dearmor -o /etc/apt/keyrings/docker.gpg
# RUN chmod a+r /etc/apt/keyrings/docker.gpg
# RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
# RUN apt update
# RUN apt install docker-ce-cli -y

# dood settings
# ARG DOCKER_GID
# RUN groupadd -g $DOCKER_GID docker
# RUN usermod -aG $DOCKER_GID vscode 

USER vscode