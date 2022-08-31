export default {
  name: 'irc',
  title: 'irc - Level 1 2% Investment Return Commission',
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
    },
    {
      name: 'commission',
      title: 'Commission',
      type: 'number',
    },
  ],

  preview: {
    select: {
      title: 'referrer.tel',
      referrer: 'user.tel',
    },
    prepare(selection) {
      const {referrer} = selection
      return Object.assign({}, selection, {
        subtitle: `downLink ${referrer}`
      })
    }
  }
}