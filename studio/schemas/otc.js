export default {
  name: 'otc',
  title: 'One Time Commision',
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
      name: 'user',
      title: 'user',
      type: 'reference',
      to: {type: 'user'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'referer',
      title: 'Referer',
      type: 'reference',
      to: {type: 'user'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Lv1s Orders',
      type: 'number',
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
      title: 'percentage'
    }
  }
}