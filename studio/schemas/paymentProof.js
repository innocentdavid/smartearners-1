export default {
  name: 'paymentProof',
  title: 'PaymentProof',
  type: 'document',
  initialValue: {
    approved: 'pending',
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
    }
  ],

  preview: {
    select: {
      title: 'userTel',
      amount: 'amount',
      approved: 'approved',
    },
    prepare(selection) {
      const {amount, approved} = selection
      return Object.assign({}, selection, {
        subtitle: amount &&  `paid: ${amount}, status: ${approved}`
      })
    }
  }
}