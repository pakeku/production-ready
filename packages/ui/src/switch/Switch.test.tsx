import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Switch } from './Switch'

// Mock Tamagui Switch
vi.mock('tamagui', async () => {
  const React = await import('react')
  return {
    Switch: Object.assign(
      ({ checked, onCheckedChange, disabled, children }: any) => 
        React.createElement('button', {
          role: 'switch',
          'aria-checked': checked,
          disabled,
          onClick: () => onCheckedChange?.(!checked),
        }, children),
      {
        Thumb: () => React.createElement('span', null),
      }
    ),
  }
})

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('calls onCheckedChange when toggled', () => {
    const handleChange = vi.fn()
    render(<Switch checked={false} onCheckedChange={handleChange} />)
    
    fireEvent.click(screen.getByRole('switch'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('reflects checked state', () => {
    const { rerender } = render(<Switch checked={false} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')

    rerender(<Switch checked={true} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('can be disabled', () => {
    render(<Switch disabled />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })
})
