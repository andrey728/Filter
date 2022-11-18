# Filter

Компонент "фильтр" для генерации части запроса к источнику данных, а именно фильтр. В компоненте пользователь имеет возможность указать условия по доступным для фильтрации полям.


## Состав проекта

Проет состоит из фронта, в папке Client и бека в папке Server.
Фронт написан на Vue.js с использованием Vite.
Бек на питоне с использованием FastAPI.

## Project Setup

Сперва необходимо установить node.js, а после для запускаа следующие команды.

```sh
npm install
```

Для FastAPI

```sh
pip install fastapi
```

```sh
pip install "uvicorn[standard]"
```


### Компиляция и горячая перезагрузка для разработки на фронте

```sh
npm run dev
```

### Запуск сервера (FastAPI)

```sh
uvicorn main:app --reload
```

### Compile and Minify for Production

```sh
npm run build
```
