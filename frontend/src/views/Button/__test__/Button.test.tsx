import React from 'react';
import Button from '../ui/Button';

import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

describe("view/Button", () => {
  test("renders button with correct text", () => {
    const { getByRole } = render(<Button onclick={() => {}}>Click</Button>);
    expect(getByRole("button", { name: /click/i })).toBeInTheDocument();
  });

  test("callback was called when clicked", () => {
    const callback = jest.fn();
    const { getByRole } = render(<Button onclick={callback}>Click</Button>);

    fireEvent.click(getByRole("button", { name: /click/i }));   // не работает userEvent
    expect(callback).toHaveBeenCalledTimes(1);
  });
});