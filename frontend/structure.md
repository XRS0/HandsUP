### 1. **Общая структура проекта**

#### `src/app`
Эта папка содержит инфраструктурный код, который относится к основному приложению. Это могут быть:
- **API**: настройка API-клиента, интерсепторы, базовые запросы.
- **Providers**: провайдеры для DI, контексты React, обертки для Redux Provider и т.д.
- **Конфигурация**: настройки приложения, переменные окружения, конфигурация сборки.

Пример:
```javascript
// src/app/api/index.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export default apiClient;
```

---

#### `src/containers`
Здесь находятся **UI-компоненты, привязанные к Redux**. Эти компоненты используют `connect`, `useSelector` или `useDispatch` для взаимодействия с состоянием приложения.

Пример:
```javascript
// src/containers/summary-section/index.js
import { useSelector } from 'react-redux';
import { selectSummary } from '../../features/summary/slice';

const SummarySection = () => {
  const summary = useSelector(selectSummary);
  return <div>{summary}</div>;
};

export default SummarySection;
```

---

#### `src/views`
Это **UI-компоненты, которые не привязаны к Redux**. Они получают данные через пропсы и отвечают только за отображение.

Пример:
```javascript
// src/views/form-field/index.js
const FormField = ({ label, value, onChange }) => (
  <div>
    <label>{label}</label>
    <input value={value} onChange={onChange} />
  </div>
);

export default FormField;
```

---

#### `src/shared`
Эта папка содержит **утилиты, которые не привязаны к конкретному проекту** и могут быть вынесены в отдельный пакет в будущем. Например:
- Общие функции для работы с API.
- Конфигурации, которые могут использоваться в нескольких проектах.

Пример:
```javascript
// src/shared/api/index.js
export const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};
```

---

#### `src/features`
Здесь находятся **общие "фичи"** приложения. Каждая фича — это логически завершенная часть функциональности, которая может включать в себя:
- Redux-слайсы.
- Саги.
- Компоненты, специфичные для этой фичи.

Пример структуры фичи:
```
src/features/user-settings/
├── index.ts
├── slice.ts
└── sagas.ts
```

---

#### `src/pages`
Эта папка содержит **страницы приложения**. Каждая страница может иметь свою собственную структуру, аналогичную общей структуре проекта. Например:
- `app`: инфраструктурный код для страницы.
- `containers`: компоненты, привязанные к Redux.
- `views`: компоненты, не привязанные к Redux.
- `server.js` и `client.js`: точки входа для серверного и клиентского рендеринга.

Пример:
```javascript
// src/pages/mobile/client.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactDOM.hydrate(<App />, document.getElementById('root'));
```

---

### 2. **Структура проекта: Redux**

Redux-логика организована по **фичам**, где каждая фича представляет собой логически завершенную часть состояния приложения. Это позволяет изолировать логику и упростить поддержку кода.

#### Пример структуры фичи:
```
src/features/products/
├── index.ts
├── slice.ts
└── sagas.ts
```

---

#### `slice.ts`
Содержит **Redux-слайс**, который определяет состояние, редьюсеры и действия (actions).

Пример:
```typescript
// src/features/products/slice.ts
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
```

---

#### `sagas.ts`
Содержит **Redux-саги**, которые используются для асинхронных операций, таких как запросы к API.

Пример:
```typescript
// src/features/products/sagas.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchProducts } from '../../shared/api';
import { setProducts } from './slice';

function* loadProducts() {
  const products = yield call(fetchProducts);
  yield put(setProducts(products));
}

export const productsSagas = {
  load: loadProducts,
};
```

---

#### `index.ts`
Точка входа фичи, которая реэкспортирует слайс и саги.

Пример:
```typescript
// src/features/products/index.ts
export { default as productsReducer } from './slice';
export { productsSagas } from './sagas';
```

---

### 3. **Использование фичи**

Фичи используются только через их точку входа. Это позволяет скрыть внутреннюю структуру и упростить рефакторинг.

Пример использования:
```typescript
// src/app/providers/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { productsReducer, productsSagas } from '../features/products';
import { all } from 'redux-saga/effects';

const rootReducer = {
  products: productsReducer,
};

function* rootSaga() {
  yield all([productsSagas.load()]);
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;
```

---

### Преимущества такой структуры:
1. **Изоляция логики**: Каждая фича изолирована, что упрощает тестирование и поддержку.
2. **Масштабируемость**: Новые фичи добавляются без изменения существующего кода.
3. **Читаемость**: Структура явно отражает функциональность приложения.
4. **Переиспользуемость**: Утилиты и компоненты из `shared` могут быть вынесены в отдельные пакеты.

---
