const todoCompletionStatuses = [
  'Completed',
  'In work',
  'Rejected'
]

const todoPriorityStatuses = [
  'Highest',
  'Medium',
  'Low'
]

const todoPriorityStatusesStyles = {
  'Highest': {
    icon: 'i-heroicons-solid:chevron-double-up',
    color: 'red'
  },
  'Medium': {
    icon: 'i-heroicons-solid:bars-2',
    color: 'orange'
  },
  'Low': {
    icon: 'i-heroicons-solid:chevron-down',
    color: 'green'
  }
}

export {
  todoPriorityStatuses,
  todoCompletionStatuses,
  todoPriorityStatusesStyles
}