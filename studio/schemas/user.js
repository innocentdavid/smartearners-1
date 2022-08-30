export default {
  name: 'user',
  title: 'User',
  type: 'document',
  initialValue: {
    level: 1,
    myTicket: 0,
    roi: 0,
    ri: 0,
    vrs: 0,
    isAdmin: false,
  },
  fields: [
    {
      name: 'tel',
      title: 'Phone',
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
      name: 'vrs',
      title: 'Valid Refer Salary',
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
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'isAdmin',
      title: 'Is User Admin?',
      type: 'boolean',
    },
    {
      name: 'lastWithdrawDate',
      title: 'Last Withdraw Date',
      type: 'string',
    },
  ],

  preview: {
    select: {
      title: 'tel',
      tbalance: 'tbalance',
      ri: 'ri',
      roi: 'roi',
      vrs: 'vrs',
      myTicket: 'myTicket',
    },
    prepare(selection) {
      const {ri, roi, tbalance, vrs, myTicket} = selection
      return Object.assign({}, selection, {
        subtitle: `${ri && roi &&  ri + roi + tbalance + vrs} Ticket: ${myTicket}`
      })
    }
  }
}