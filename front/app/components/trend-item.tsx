import { TrendArticle } from '@type/trend-article-type'

export const TrendItem = ({
  id,
  title,
  url,
  index,
  siteName,
}: TrendArticle & { index: number; siteName: string }) => {
  const listIndex = index + 1
  const domain = siteName === 'zenn' ? 'https://zenn.dev/' : ''

  return (
    <li key={id} className='pl-2 pb-1 pt-1 text-left border-b-2'>
      <a className='sm:text-lg text-xs' href={`${domain}${url}`} target='_blank'>
        <p className='no-underline pt-1 pb-1'>
          {listIndex}
          <span className='px-1'>&#058;</span>
          {title}
        </p>
      </a>
    </li>
  )
}
