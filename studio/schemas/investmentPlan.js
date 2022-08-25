export default {
  name: 'investmentPlan',
  title: 'Investment Plan',
  type: 'document',
  initialValue: {
    returnPeriod: 1,
    da: 1,
    percentage: 1,
    drTime: '22:55-23:25'
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'title',
      percentage: 'percentage',
      returnPeriod: 'returnPeriod',
      da: 'da'
    },
    prepare(selection) {
      const {da, percentage, returnPeriod} = selection
      return Object.assign({}, selection, {
        subtitle: `${da}E - ${percentage}% for ${returnPeriod}days`
      })
    }
  }
}