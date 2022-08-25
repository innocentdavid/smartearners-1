export default {
  name: 'referal',
  title: ' Referal',
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
      name: 'referer',
      title: 'Referer',
      type: 'reference',
      to: {type: 'user'},
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
      title: 'user.tel',
      referer: 'referer.tel'
    },
    prepare(selection) {
      const {referer} = selection
      return Object.assign({}, selection, {
        subtitle: `by ${referer}`
      })
    }
  }
}