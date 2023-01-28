import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import Clock from '../src/components/Clock'

const Component = Clock
type ComponentType = typeof Component

export default { component: Component } as ComponentMeta<ComponentType>

export const Index: ComponentStoryObj<ComponentType> = {
	args: {},
}
