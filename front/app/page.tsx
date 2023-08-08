import { SiteLayout } from './components/site-layout'
import { BiInfoCircle } from 'react-icons/bi'

export default async function Home() {
  return (
    <>
      <p className='sm:mx-4 sm:my-2 mx-2 my-1 inline-flex sm:items-center '>
        <BiInfoCircle className='mr-1' />
        <span className='text-xs sm:text-base'>
          ZennとQiitaのトレンドを日単位で纏めています。毎日6時/18時の2回更新。連絡先
          <a className='pl-1 underline' target='_blank' href='https://twitter.com/ma_me'>
            @ma_me
          </a>
        </span>
      </p>
      <div className='max-h-screen ml-2 mr-2 flex flex-col sm:flex-row justify-center'>
        <SiteLayout siteName='zenn' />
        <SiteLayout siteName='qiita' />
      </div>
    </>
  )
}
