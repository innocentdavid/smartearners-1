export default {
  name: 'paymentProof',
  title: 'PaymentProof',
  type: 'document',
  initialValue: {
    approved: false,
  },
  fields: [
    {
      name: 'amount',
      title: 'Amount',
      type: 'number',
    },
    {
      name: 'imageUrl',
      title: 'Image Url',
      type: 'string',
    },
    {
      name: 'approved',
      title: 'Approved',
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
    },
    prepare(selection) {
      const {amount} = selection
      return Object.assign({}, selection, {
        subtitle: amount &&  `paid ${amount}`
      })
    }
  }
}