import React from 'react'
import { GetStaticPaths, GetStaticPropsContext } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext): Promise<{
  redirect?: Record<string, any>
  props?: Record<string, any>
  revalidate?: number
}> {
  const { country } = params || {}

  return {
    props: {
      country,
    },
    revalidate: 600,
  }
}

export default function Country({
  country,
}: {
  country: string
}) {
  return (
    <div>{country}</div>
  )
}
