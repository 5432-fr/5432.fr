FROM python:3.12-slim-bookworm

RUN apt-get update \
 && apt-get install --no-install-recommends -y \
      graphviz \
      imagemagick \
      make \
      gettext \
      sshpass \
      openssh-client \
 && apt-get autoremove \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
 && rm -rf /tmp/* /var/tmp/* \
 && rm -f /etc/ssh/ssh_host_*

RUN python3 -m pip install --no-cache-dir -U pip
