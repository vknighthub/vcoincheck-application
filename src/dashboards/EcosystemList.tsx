import client from '@/data/client'
import { EcosystemResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import React from 'react'

const EcosystemList = () => {

    const { t } = useTranslation('common')

    const FetchEcosystem = () => {
        const { data, isLoading } = useQuery<EcosystemResponse, Error>(
            ['ecosystem-project'],
            () => client.project.ecosystem(),
        )
        return {
            listecosystem: data?.result.data,
            isLoading
        }
    }


    const { listecosystem } = FetchEcosystem()

    return (
        <>
            <div className="card-header d-block d-sm-flex border-0">
                <div>
                    <h4 className="fs-20 text-black">{t('ecosystemlist')}</h4>
                </div>
            </div>
            <div className="card-body tab-content p-0">
                <div className="table-responsive">
                    <table className="table shadow-hover card-table">
                        <thead>
                            <tr>
                                <th className="width150">
                                    <strong>{t('no')}</strong>
                                </th>
                                <th>
                                    <strong>{t('ecosystem')}</strong>
                                </th>
                                <th>
                                    <strong>{t('shortname')}</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listecosystem?.map((data, i) => (
                                <tr key={i}>
                                    <td>
                                        <span className="bgl-success p-3 d-inline-block">
                                            {i + 1}
                                        </span>
                                    </td>
                                    <td className="font-w500">
                                        {data.econame}
                                    </td>
                                    <td className="font-w500">{data.shortname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default EcosystemList