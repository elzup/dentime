import {
	PeriodStatusFinish,
	PeriodStatusProgress,
	PeriodTerm,
} from '../src/types'

import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import TimeRow from '../src/components/TimeRow'

const Component = TimeRow
type ComponentType = typeof Component
type Story = ComponentStoryObj<ComponentType>

export default { component: Component } as ComponentMeta<ComponentType>

const pb: PeriodTerm = {
	info: {
		start: '10:40',
		end: '12:10',
		period: '2',
	},
	study: false,
	status: null,
}

export const Before: Story = {
	args: {
		period: { ...pb, status: { type: 'before' } },
	},
}

const statusProgress1: PeriodStatusProgress = {
	type: 'progress',
	progress: 0,
	rate: 0.0 / 100,
}
export const Progress1: Story = {
	args: {
		period: { ...pb, status: statusProgress1, study: true },
	},
}

const statusProgress2: PeriodStatusProgress = {
	type: 'progress',
	progress: 40,
	rate: 40.0 / 100,
}
export const Progress2: Story = {
	args: {
		period: { ...pb, status: statusProgress2, study: true },
	},
}

const statusProgress3: PeriodStatusProgress = {
	type: 'progress',
	progress: 85,
	rate: 85.0 / 100,
}
export const Progress3: Story = {
	args: {
		period: { ...pb, status: statusProgress3 },
	},
}

const statusFinish: PeriodStatusFinish = {
	type: 'finish',
}
export const Finish: Story = {
	args: {
		period: { ...pb, status: statusFinish },
	},
}
