export default {
  name: 'withdraw',
  title: 'Withdraw',
  type: 'document',
  initialValue: {
    status: false,
  },
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'boolean',
    },
    {
      name: 'userId',
      title: 'User Id',
      type: 'string',
    },
    {
      name: 'userTel',
      title: 'User Tel',
      type: 'string',
    }
  ],

  preview: {
    select: {
      title: 'userTel',
      amount: 'amount',
      status: 'status',
    },
    prepare(selection) {
      const {amount, status} = selection
      return Object.assign({}, selection, {
        subtitle: amount && status `${amount} - ${status}`
      })
    }
  }
}