import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import Header from '../src/components/Header'

const Component = Header
type ComponentType = typeof Component

export default { component: Component } as ComponentMeta<ComponentType>

export const Index: ComponentStoryObj<ComponentType> = {
	args: {},
}
