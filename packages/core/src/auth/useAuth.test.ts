import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from './useAuth'

describe('useAuth', () => {
  it('starts with no user', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.user).toBeNull()
  })

  it('logs in a user', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })

    expect(result.current.user).toEqual({
      id: '1',
      email: 'test@example.com',
    })
  })

  it('logs out a user', async () => {
    const { result } = renderHook(() => useAuth())

    // Login first
    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })
    expect(result.current.user).not.toBeNull()

    // Then logout
    act(() => {
      result.current.logout()
    })
    expect(result.current.user).toBeNull()
  })

  it('returns user data from login', async () => {
    const { result } = renderHook(() => useAuth())

    let user
    await act(async () => {
      user = await result.current.login('test@example.com', 'password')
    })

    expect(user).toEqual({
      id: '1',
      email: 'test@example.com',
    })
  })
})
