export default {
  name: 'order',
  title: 'Order',
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'investmentPlan.title'
    }
  }
}