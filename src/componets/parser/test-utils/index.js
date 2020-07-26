import React from 'react';
import { render } from '@testing-library/react';
import { Store } from "../store";
import { SlotFillProvider } from '@wordpress/components';
import { SlotFillProvider as CustomSlotFillProvider } from '../../slotfill';

const AllTheProviders = ({ children }) => {
  return (
    <SlotFillProvider>
      <CustomSlotFillProvider id="1">
        {children}
      </CustomSlotFillProvider>
    </SlotFillProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }

export const store = new Store();