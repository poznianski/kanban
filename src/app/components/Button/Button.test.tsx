import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Button from '@/app/components/Button/Button'

describe('Button', () => {
  it('applies correct styles if small', () => {
    render(
      <Button
        label="Test Button"
        sm
      />,
    )
    const button = screen.getByRole('button', { name: /test button/i })
    expect(button).toHaveClass('h-[36px] border')
  })
})
