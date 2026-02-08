import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock react-native Platform
vi.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'web',
  select: vi.fn((obj) => obj.web || obj.default),
}))
