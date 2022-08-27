export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'planId',
      title: 'Plan Id',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'planTitle',
      title: 'Plan Title',
      type: 'string',
    },
    {
      name: 'percentage',
      title: 'Percentage',
      type: 'number',
    },
    {
      name: 'da',
      title: 'Deposit Amount',
      type: 'number',
    },
    {
      name: 'dr',
      title: 'Daily Return',
      type: 'number',
    },
    {
      name: 'returnPeriod',
      title: 'Return Period',
      type: 'number',
    },
    {
      name: 'drTime',
      title: 'Daily Return Time',
      type: 'string',
    },
    {
      name: 'userId',
      title: 'User Id',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'userTel',
      title: 'User Tel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }
  ],

  preview: {
    select: {
      title: 'investmentPlan.title'
    }
  }
}