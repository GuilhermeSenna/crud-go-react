FROM golang:1.19.3-alpine

WORKDIR /backend
COPY . .

RUN go build -o main main.go
# EXPOSE ${API_PORT}

CMD ["/backend/main"]
