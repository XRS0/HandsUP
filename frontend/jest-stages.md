## 1. Настройка проекта

### Установка зависимостей
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Настройка Jest (файл jest.config.js)
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // ...
  // Дополнительные необходимые конфиги
};
```

### Создание файла настройки (jest.setup.js)
```javascript
import '@testing-library/jest-dom';
```

### Обновление package.json
```json
{
  "scripts": {
    // Другие скрипты
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## 2. Создание тестируемого компонента (Button.jsx)

```jsx
import React from 'react';

export const Button = ({ onClick, disabled, children, variant = 'primary' }) => {
  const baseClasses = 'button';
  const variantClasses = {
    primary: 'primary-class',
    secondary: 'secondary-class',
    danger: 'danger-class',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'disabled' : ''}`}
    >
      {children}
    </button>
  );
};
```

## 3. Создание тестов (Button.test.jsx)

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button component', () => {
  // Тест на рендеринг
  it('renders button with correct text', () => {
    const { getByRole } = render(<Button onClick={() => {}}>Click me</Button>);
    expect(getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  // Тест на вызов обработчика
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
    
    userEvent.click(getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Тест на disabled состояние
  it('is disabled when disabled prop is true', () => {
    const { getByRole } = render(<Button onClick={() => {}} disabled>Click me</Button>);
    expect(getByRole('button', { name: /click me/i })).toBeDisabled();
  });

  // Тест на вариации стилей
  it('applies correct styles for primary variant', () => {
    const { getByRole } = render(<Button onClick={() => {}} variant="primary">Primary</Button>);
    const button = getByRole('button', { name: /primary/i });
    
    expect(button).toHaveClass('primary');
  });

  // Тест на вариации стилей для secondary варианта
  it('applies correct styles for secondary variant', () => {
    const { getByRole } = render(<Button onClick={() => {}} variant="secondary">Secondary</Button>);
    const button = getByRole('button', { name: /secondary/i });
    
    expect(button).toHaveClass('secondary');
  });

  // Тест на snapshot
  it('matches snapshot', () => {
    const { container } = render(<Button onClick={() => {}}>Snapshot</Button>);
    expect(container).toMatchSnapshot();
  });
});
```

## 4. Запуск тестов

```bash
npm test              # однократный запуск
npm run test:watch    # запуск в watch-режиме (отладка)
npm run test:coverage # запуск с отчетом о покрытии
```

## 5. Дополнительные рекомендации

1. **Структура проекта**: Храните тесты рядом с компонентами в файлах `ComponentName.test.jsx` в папке `__test__`

2. **Best Practices**:
   - Используйте `userEvent` вместо `fireEvent` для более реалистичного моделирования действий пользователя
   - Используйте возвращаемый объект метода `render` для всех запросов
   - Добавляйте `data-testid` только когда нет других способов найти элемент (например `container.querySelector('.className')`)

3. **Тестирование асинхронного кода**:
   ```javascript
   it('handles async actions', async () => {
     const { findByText } = render(<AsyncComponent />);
     expect(await findByText('Loaded data')).toBeInTheDocument();
   });
   ```

4. **Моки**:
   ```javascript
   jest.mock('../api', () => ({
     fetchData: jest.fn().mockResolvedValue({ data: 'test' })
   }));
   ```

5. **Покрытие тестами**: Нужно 100% покрытия.