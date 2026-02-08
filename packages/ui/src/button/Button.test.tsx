import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

// Mock Tamagui components
vi.mock('tamagui', async () => {
  const React = await import('react')
  return {
    Button: ({ children, onPress, disabled, ...props }: any) => 
      React.createElement('button', { onClick: onPress, disabled, ...props }, children),
    ThemeableStack: ({ children }: any) => React.createElement('div', null, children),
    'Button.Text': ({ children, ...props }: any) => 
      React.createElement('span', props, children),
  }
})

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onPress when clicked', () => {
    const handlePress = vi.fn()
    render(<Button onPress={handlePress}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handlePress).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when state is disabled', () => {
    render(<Button state="disabled">Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when state is loading', () => {
    render(<Button state="loading">Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByText('Primary')).toBeInTheDocument()

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByText('Secondary')).toBeInTheDocument()

    rerender(<Button variant="tertiary">Tertiary</Button>)
    expect(screen.getByText('Tertiary')).toBeInTheDocument()
  })

  it('renders different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByText('Small')).toBeInTheDocument()

    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByText('Medium')).toBeInTheDocument()

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByText('Large')).toBeInTheDocument()
  })
})
