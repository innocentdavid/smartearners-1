// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import user from './user'
import investmentPlan from './investmentPlan'
import order from './order'
import otc from './otc'
import validRef from './validRef'
import dailyReturn from './dailyReturn'
import referral from './referral'
import record from './record'
// import balanceRecord from './nbalanceRecord'
// import ticketRecord from './ticketRecord'


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    user,
    investmentPlan,
    order,
    otc,
    validRef,
    dailyReturn,
    referral,
    record
    // balanceRecord,
    // ticketRecord,
  ]),
})
