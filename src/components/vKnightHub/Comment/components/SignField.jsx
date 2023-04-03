import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useContext } from 'react'
import { ActionContext } from './ActionContext'

const SignField = () => {
  const actions = useContext(ActionContext)
  const { t } = useTranslation('common')
  return (
    <div className="signBox">
      <div className="signLine">
        {t('askcomment')}
      </div>
      <div>
        <Link
          className="loginBtn"
          href={actions.signinUrl}
        >
          {t('signin')}
        </Link>
        <Link
          className="signBtn"
          href={actions.signupUrl}
        >
          {t('register')}
        </Link>
      </div>
    </div>
  )
}

export default SignField
