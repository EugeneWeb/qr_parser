# RabbitMQ nest.js парсинг API-ответа

## Описание

Приложение состоит из сервиса __core__, который принимает _Post_ запрос по адресу _/api/v1/parse-qr_ с body: { "qr": "URL..." }, валидирует значения и отправляет сообщение в брокер с помощью метода send, дожидаясь ответ от сервиса __parse_service__, отвечающего за парсинг данных по url строке qr. Парсинг был реализован следущим образом: было замечено, что данные на странице подгружаются с сервера через обратный прокси по адресу /api/*, таким образом, __parse_service__ берет параметры из url строки qr и добавляет их к базовому url сервера, делая запрос с помощью HttpModule.
После успешного парсинга __parse_service__ возвращает: ИНН продавца, название продавца, массив покупок, стоимость всех покупок в __core__, который в свою очередь отдает эти данные в качестве ответа на посланный _Post_ запрос.

## Используемые технологии и подходы
* Проект был написан с использованием __monorepo__
* В качестве библиотеки для работы с RabbitMQ была выбрана __amqplib__
* Общие части конфигурации rmqp, такие как подтверждение сообщения(ack), получения объекта с конфигурацией RmqOptions, регистрация клиента микросервиса были вынесены в общую библиотеку в libs/common
* Для валидации переменных среды использовал пакет __Joi__ 
* Написал кастомный валидатор __QrUrlValidator__ для проверки параметров qr
* Написал кастомный мидлвар __LoggingMiddleware__ для логирования http запросов
* Добавил __HttpExceptionFilter__ для обработки и логгирования HttpException
* Добавил возможность многоступенчатой сборки образов в docker-compose: вариант для разработки(development) и продакшена(production).
* Ограничил максимальное количество сообщений,которое может обработать консьюмер за раз до 5 с помощью __prefetchCount__.
* Ограничил время на обработку сообщения консьюмером до 5 секунд(c помощью __send().pipe(timeout(5000))__).



## Пример запроса с помощью curl
```
curl -X POST http://localhost:3000/api/v1/parse-qr \
-H "Content-Type: application/json" \
-d '{
      "qr": "https://consumer.1-ofd.ru/v1?fn=7380440800830906&fp=1315384961&i=24505&t=20250221T095434&s=149&n=1"
   }'
```



## Запуск приложения

> Для удобства добавил .env файлы в проект. Переменные среды настраивать не нужно.

### 1. Установка docker
Использовал версию docker 27.1.1

Для автоматизации установки версии docker 27.1.1 или перехода на версию docker 27.1.1 в папке ansible_docker_install находится инвентори файл и ansible playbook, который запускается следующей командой:
```
ansible-playbook -i inventory.ini install_docker.yml
```

### 2. Запуск приложения через docker-compose файл
Команда для запуска приложения:
```
docker-compose up
```







