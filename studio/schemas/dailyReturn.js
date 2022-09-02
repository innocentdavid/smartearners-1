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
      name: 'user',
      title: 'user',
      type: 'reference',
      to: {type: 'user'},
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'investmentPlan.title',
      userTel: 'user.tel',
    },
    prepare(selection) {
      const {userTel} = selection
      return Object.assign({}, selection, {
        subtitle: `by ${userTel}`
      })
    }
  }
}