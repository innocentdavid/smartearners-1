export default {
  name: 'user',
  title: 'User',
  type: 'document',
  initialValue: {
    level: 1,
    myTicket: 0,
    roi: 0,
    ri: 0
  },
  fields: [
    {
      name: 'tel',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'level',
      title: 'Level',
      type: 'number',
    },
    {
      name: 'myTicket',
      title: 'My Ticket',
      type: 'number'
    },
    {
      name: 'referrer',
      title: 'Referrer',
      type: 'reference',
      to: {type: 'user'}
    },
    {
      name: 'roi',
      title: 'Return Over Investment',
      type: 'number',
    },
    {
      name: 'ri',
      title: 'Referral Income',
      type: 'number',
    },
    {
      name: 'tbalance',
      title: 'Balance',
      type: 'number',
    },
    {
      name: 'lastChecked',
      title: 'Last Checked',
      type: 'datetime',
    },
  ],

  preview: {
    select: {
      title: 'tel',
      ri: 'ri',
      roi: 'roi'
    },
    prepare(selection) {
      const {ri, roi} = selection
      return Object.assign({}, selection, {
        subtitle: ri && roi &&  ri + roi
      })
    }
  }
}