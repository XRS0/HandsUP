import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Мок для проблемных модулей
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: (props: any) => <div>{props.children}</div>
}));