import client from '@/data/client';
import { ProjectResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FilteringTable } from './../components/table/FilteringTable/FilteringTable';
import { COLUMNSFILTER as COLUMNS_EN } from './locale/en/Columns';
import { COLUMNSFILTER as COLUMNS_JP } from './locale/jp/Columns';
import { COLUMNSFILTER as COLUMNS_VN } from './locale/vn/Columns';
import Skeleton from 'react-loading-skeleton';

type Props = {}

const ProjectTable = (props: Props) => {
    const { t } = useTranslation('common');
    const { locale } = useRouter();

    const columns = () => {
        switch (locale) {
            case 'en': return COLUMNS_EN
            case 'vn': return COLUMNS_VN
            case 'jp': return COLUMNS_JP
            default: return COLUMNS_EN
        }
    }


    const Project = () => {

        const { data, isLoading, error } = useQuery<ProjectResponse, Error>(
            ['all-project'],
            () => client.project.all(),
        )
        return {
            projects: data?.result.data,
            isLoading,
            error,
        }
    }

    const { projects, isLoading } = Project();
    
    if (isLoading) {
        return <Skeleton count={10} />
    }

    return (
        <div className="card">
            <div className="card-header d-block d-sm-flex border-0">
                <div>
                    <h2 className="fs-20 text-black">{t('allproject')}</h2>
                </div>
            </div>
            <div className="card-body tab-content p-0">
                {projects && <FilteringTable colunmsfilter={columns()} datafilter={projects} />}
            </div>
        </div>
    )
}

export default ProjectTable