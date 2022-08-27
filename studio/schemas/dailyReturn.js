export default {
  name: 'dailyReturn',
  title: 'Daily Return',
  type: 'document',
  fields: [
    {
      name: 'investmentPlan',
      title: 'Investment Plan',
      type: 'reference',
      to: {type: 'investmentPlan'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Lv1s Orders',
      type: 'number',
    }
  ],

  preview: {
    select: {
      title: 'percentage'
    }
  }
}