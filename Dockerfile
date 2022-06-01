FROM ethereum/client-go

COPY genesis.json /tmp

ARG ACCOUNT_PASSWORD

RUN geth init /tmp/genesis.json 

RUN rm -f ~/.ethereum/geth/nodekey

RUN echo ${ACCOUNT_PASSWORD} > /tmp/password \
  && geth account new --password /tmp/password \
  && rm -f /tmp/password

ENTRYPOINT ["geth"]