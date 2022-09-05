import sanityClient from '@sanity/client'
const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-08-31', // use a UTC date string
  useCdn: false, // process.env.NODE_ENV === 'production'
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
}
const client = sanityClient(config)

export default client