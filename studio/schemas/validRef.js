export default {
  name: 'validRef',
  title: 'Valid Referal',
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
      title: 'user.tel'
    },
    // prepare(selection) {
    //   const {da} = selection
    //   return Object.assign({}, selection, {
    //     subtitle: da
    //   })
    // }
  }
}