/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { notFound, useSearchParams } from 'next/navigation';
import Link from 'next/link'
import moment from 'moment'
import _ from 'lodash'
// components
import { ImageHolder } from '@/components/shared';
import { formatRouteName } from '@/function/formatting';

export function Blogs({ blogs, authors }) {
  let searchParams = useSearchParams();
  const match = searchParams.toString().match(/page=(\d+)/)
  const page = match ? (match[1] - 1) : 0

  const startIndex = (6 * page);
  const itemCount = 6;

  const pageBlogs = blogs.slice(startIndex, startIndex + itemCount);

  if (pageBlogs.length === 0) {
    notFound()
  }

  return (
    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
      {pageBlogs.map((post) => {
        const removeChar = post.name.replace(/[^a-zA-Z0-9 ]/g, '')
        const slug = `/blog/${formatRouteName(removeChar.replace(/  +/g, ' '))}`

        return (
          <article key={post.id} className="relative flex flex-col gap-8 lg:flex-row">
            <ImageHolder
              image={_.get(post, 'fields.image')} 
              className={{
                figure: "relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-96 lg:shrink-0",
                image: "absolute inset-0 h-full w-full rounded-xl bg-gray-50 object-cover"
              }}
            />
            <div className="py-4">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={_.get(post, 'fields.date')} className="text-gray-500">
                  {moment(_.get(post, 'fields.date')).format('LL')}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  {_.get(post, 'name')}
                </h3>
                <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-600 line-clamp-6" dangerouslySetInnerHTML={{__html: _.get(post, 'fields.body')}}/>

                <Link href={slug} className="mt-4 button button-xs inline-flex border-white bg-secondary-600 text-white hover:bg-secondary-700">Read More</Link>
              </div>
              {
                (_.get(post, 'fields.authors') && _.get(post, 'fields.authors').length > 0) && (
                  _.get(post, 'fields.authors')?.map(item => {
                    const author = _.find(authors, data => data.id === item)

                    return (
                      <div className="mt-6 flex border-t border-gray-900/5 pt-2" key={item.id}>
                        <div className="relative flex items-center gap-x-4">
                          {
                            _.get(author, 'fields.image') && (
                              <ImageHolder
                                image={_.get(author, 'fields.image')} 
                                className={{
                                  figure: "",
                                  image: "h-10 w-10 rounded-full bg-gray-50"
                                }}
                              />
                            )
                          }

                          <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                              <span className="absolute inset-0" />
                              By: {_.get(author, 'name')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )
              }
            </div>
          </article>
        )
      })}
    </div>
  )
}


