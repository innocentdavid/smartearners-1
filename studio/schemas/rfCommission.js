export default {
  name: 'rfCommission',
  title: 'Referral Commision',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'user',
      type: 'reference',
      to: { type: 'user' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'referrer',
      title: 'Referrer',
      type: 'reference',
      to: { type: 'user' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'level',
      title: 'Commission Level',
      type: 'number',
    },
    {
      name: 'depositedAmount',
      title: 'Deposited Amount',
      type: 'number',
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
      level: 'level',
      commission: 'commission',
    },
    prepare(selection) {
      const { level, commission } = selection
      return Object.assign({}, selection, {
        subtitle: level && commission && `received level${level} ${commission}`
      })
    }
  }
}