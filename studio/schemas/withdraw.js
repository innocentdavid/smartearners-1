export default {
  name: 'withdraw',
  title: 'Withdraw',
  type: 'document',
  initialValue: {
    status: 'pending',
  },
  fields: [
    {
      name: 'amount',
      title: 'Amount',
      type: 'number',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
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
    },
    {
      name: 'accNo',
      title: 'Account Number',
      type: 'number',
    },
    {
      name: 'accName',
      title: 'Account Name',
      type: 'string',
    },
    {
      name: 'bank',
      title: 'Bank Name',
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
        subtitle: amount && `${amount} - ${status}`
      })
    }
  }
}