import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { MyButton, MySendButton } from './Button'

describe('MyButton', () => {
    it('render component Button', () => {
        render(<MyButton>Change Name</MyButton>)
    })

    it('render with snapshot', () => {
        const { asFragment } = render(<MyButton>Change name</MyButton>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('render component with text name button', () => {
        render(<MyButton>Change name</MyButton>)
        expect(screen.getByText(/Change name/)).toBeInTheDocument()
    })

    it('render multiple components', () => {
        render(
            <>
                <MyButton>Edit</MyButton>
                <MyButton>Delete</MyButton>
            </>
        )
        expect(screen.queryAllByRole('button').length).toBe(2)
    })

    it('button disabled', () => {
        render(<MyButton disabled>Delete</MyButton>)
        expect(screen.getByText(/Delete/)).toBeDisabled()
    })

    it('test example', async () => {
        const onChange = jest.fn()
        render(<input type="checkbox" onChange={onChange} />)

        const checkbox = screen.getByRole('checkbox')
        await userEvent.dblClick(checkbox)
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(checkbox).not.toBeChecked()
    })
})

describe('MySendButton', () => {
    it('render component Button', () => {
        render(<MySendButton>Send</MySendButton>)
    })

    it('render with snapshot', () => {
        const { asFragment } = render(<MySendButton>Send</MySendButton>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('render component with text name button', () => {
        render(<MySendButton>Send</MySendButton>)
        expect(screen.getByText(/Send/)).toBeInTheDocument()
    })

    it('render multiple components', () => {
        render(
            <>
                <MySendButton>Edit</MySendButton>
                <MySendButton>Delete</MySendButton>
            </>
        )
        expect(screen.queryAllByRole('button').length).toBe(2)
    })

    it('button disabled', () => {
        render(<MySendButton disabled>Delete</MySendButton>)
        expect(screen.getByText(/Delete/)).toBeDisabled()
    })
})
