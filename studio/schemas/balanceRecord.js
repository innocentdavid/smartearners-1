export default {
  name: 'balanceRecord',
  title: 'Balance Record',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'user',
      type: 'reference',
      to: {type: 'user'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'referrer',
      title: 'Referrer',
      type: 'reference',
      to: {type: 'user'},
      validation: (Rule) => Rule.required(),
    }
  ],

  preview: {
    select: {
      title: 'user.tel',
      // referrer: 'referrer.tel'
    },
    // prepare(selection) {
    //   const {referrer} = selection
    //   return Object.assign({}, selection, {
    //     subtitle: `by ${referrer}`
    //   })
    // }
  }
}