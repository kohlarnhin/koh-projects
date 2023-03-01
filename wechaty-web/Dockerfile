FROM node:16.15.0
WORKDIR /app
RUN apt-get update
RUN apt-get install -y

COPY . /app
# Install dependencies
RUN npm install
RUN npm install --global nodemon
# 设置时区
RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
ENTRYPOINT ["npm", "run"]
CMD ["dev"]