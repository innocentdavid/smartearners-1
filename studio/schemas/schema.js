// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import user from './user'
import investmentPlan from './investmentPlan'
import order from './order'
import rfCommission from './rfCommission'
import validRef from './validRef'
import dailyReturn from './dailyReturn'
import referral from './referral'
import record from './record'
import paymentProof from './paymentProof'
import withdraw from './withdraw'
import irc from './investmentReturnCommission'
import company from './company'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    user,
    investmentPlan,
    order,
    rfCommission,
    validRef,
    paymentProof,
    dailyReturn,
    irc,
    referral,
    record,
    withdraw,
    company,
  ]),
})
