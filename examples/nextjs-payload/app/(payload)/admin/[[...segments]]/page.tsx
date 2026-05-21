import config from '@payload-config'
import '@payloadcms/next/css'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams })

export default Page
