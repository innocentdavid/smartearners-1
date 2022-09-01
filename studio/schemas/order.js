export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  initialValue: {
    active: true,
  },
  fields: [
    {
      name: 'planId',
      title: 'Plan Id',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'planTitle',
      title: 'Plan Title',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'percentage',
      title: 'Percentage',
      type: 'number',
      readOnly: true,
    },
    {
      name: 'da',
      title: 'Deposit Amount',
      type: 'number',
      readOnly: true,
    },
    {
      name: 'dr',
      title: 'Daily Return',
      type: 'number',
      readOnly: true,
    },
    {
      name: 'returnPeriod',
      title: 'Return Period',
      type: 'number',
      readOnly: true,
    },
    {
      name: 'drTime',
      title: 'Daily Return Time',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      readOnly: true,
    },
    {
      name: 'lastMined',
      title: 'Last Mined',
      type: 'string',
      // readOnly: true,
    },
    {
      name: 'userId',
      title: 'User Id',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'userTel',
      title: 'User Tel',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }
  ],

  preview: {
    select: {
      title: 'planTitle',
      user: 'userTel'
    }
  },
  prepare(selection) {
    const {user} = selection
    return Object.assign({}, selection, {
      subtitle: user
    })
  }
}