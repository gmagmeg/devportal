import { FC } from 'react'
import Image from 'next/image'
import { SiteName } from '@type/trend-article-type'

export const SiteLogo: FC<{ siteName: SiteName }> = ({ siteName }) => {
  let imageAttr = {
    name: '',
    path: '',
    class: '',
  }
  switch (siteName) {
    case 'qiita':
      imageAttr = {
        name: 'Qiita',
        path: '/qiita-logo.png',
        class: '',
      }
      break
    case 'zenn':
      imageAttr = {
        name: 'Zenn',
        path: '/zenn-logo.png',
        class: 'mt-[8px] mb-[14px]',
      }
      break
    default:
      throw new Error('存在しないサイト名です。')
  }

  return (
    <h2 className='inline-flex items-center'>
      <Image
        src={imageAttr.path}
        width={100}
        height={100}
        alt={imageAttr.name}
        className={`${imageAttr.class} mr-2 mb-2`}
      />
      のデイリートレンド
    </h2>
  )
}
