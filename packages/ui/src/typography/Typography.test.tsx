import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Typography } from './Typography'

// Mock Tamagui Typography components
vi.mock('tamagui', async () => {
  const React = await import('react')
  return {
    H1: ({ children, color }: any) => React.createElement('h1', { style: { color } }, children),
    H2: ({ children, color }: any) => React.createElement('h2', { style: { color } }, children),
    H3: ({ children, color }: any) => React.createElement('h3', { style: { color } }, children),
    H4: ({ children, color }: any) => React.createElement('h4', { style: { color } }, children),
    H5: ({ children, color }: any) => React.createElement('h5', { style: { color } }, children),
    H6: ({ children, color }: any) => React.createElement('h6', { style: { color } }, children),
    Text: ({ children, color }: any) => React.createElement('p', { style: { color } }, children),
  }
})

describe('Typography', () => {
  it('renders body text by default', () => {
    render(<Typography>Hello World</Typography>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders h1 variant', () => {
    render(<Typography variant="h1">Heading 1</Typography>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading 1')
  })

  it('renders h2 variant', () => {
    render(<Typography variant="h2">Heading 2</Typography>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Heading 2')
  })

  it('renders h3 variant', () => {
    render(<Typography variant="h3">Heading 3</Typography>)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Heading 3')
  })

  it('renders all heading levels', () => {
    const { container } = render(
      <>
        <Typography variant="h4">H4</Typography>
        <Typography variant="h5">H5</Typography>
        <Typography variant="h6">H6</Typography>
      </>
    )
    expect(container.querySelector('h4')).toHaveTextContent('H4')
    expect(container.querySelector('h5')).toHaveTextContent('H5')
    expect(container.querySelector('h6')).toHaveTextContent('H6')
  })

  it('applies custom color', () => {
    render(<Typography color="red">Colored Text</Typography>)
    const element = screen.getByText('Colored Text')
    expect(element).toHaveStyle({ color: 'red' })
  })
})
