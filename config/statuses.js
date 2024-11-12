const todoCompletionStatuses = [
  'Completed',
  'In work',
  'Rejected'
]

const todoCompletionStatusesStyles = {
  'Completed': {
    color: '#27AE2E'
  },
  'In work': {
    color: '#F5BB49'
  },
  'Rejected': {
    color: '#FF6161'
  }
}

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
  todoPriorityStatusesStyles,
  todoCompletionStatusesStyles
}