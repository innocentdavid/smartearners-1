export default {
  name: 'paymentProof',
  title: 'PaymentProof',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      title: 'bank',
      type: 'string',
    }
  ],

  preview: {
    select: {
      title: 'title',
    }
  }
}