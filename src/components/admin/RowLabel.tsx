'use client'

import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

/**
 * Generic array row label for the admin: shows the row's `label`, `number`, `platform` or
 * `value`, whichever exists, instead of "Item 01".
 */
export const RowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const text =
    (typeof data?.label === 'string' && data.label) ||
    (typeof data?.number === 'string' && data.number) ||
    (typeof data?.platform === 'string' && data.platform) ||
    (typeof data?.value === 'number' && String(data.value)) ||
    ''
  const index = String((rowNumber ?? 0) + 1).padStart(2, '0')
  return <span>{text ? `${index} · ${text}` : `Item ${index}`}</span>
}
