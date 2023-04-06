import { useMutation, useQuery } from "@tanstack/react-query"
import client from "./client"
import { EcosystemResponse, ProjectTypeListResponse } from "@/types"
import Swal from "sweetalert2"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

export const FetchProjectDetail = (proname: string, lang: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ['project-detail'],
        queryFn: () => client.project.getdetail(
            {
                proname: proname,
            },
            {
                language: lang
            }
        )
    })
    return {
        projectdetail: data?.result.data,
        isLoading
    }
}

export const FetchProjectType = () => {
    const { data, isLoading } = useQuery<ProjectTypeListResponse, Error>(
        ['project-type-list'],
        () => client.project.projectype(),
    )
    return {
        projecttype: data?.result.data,
        isLoading
    }
}

export const FetchEcosystem = () => {
    const { data, isLoading } = useQuery<EcosystemResponse, Error>(
        ['ecosystem-project'],
        () => client.project.ecosystem(),
    )
    return {
        listecosystem: data?.result.data,
        isLoading
    }
}

export const useEditProjectMutation = () => {
    const router = useRouter()
    return useMutation(client.project.edit, {
        onSuccess: () => {
            Swal.fire({
                title: "Edited!",
                html: "Great! Project information have been modified. This project will be come up soon. Click [Ok] back to Project management",
                icon: "success"
            }).then((result) => {
                if (result.value) {
                    router.push('/project-management')
                }
            });
        }
    });
};


export const useApproveProjectMutation = () => {
    const router = useRouter()
    return useMutation(client.project.approve, {
        onSuccess: () => {
            Swal.fire({
                title: "Approved!",
                html: "Great! This project will launching into community.Click [Ok] back to Project management",
                icon: "success"
            }).then((result) => {
                if (result.value) {
                    router.push('/project-management')
                }
            });
        }
    });
};

export const useRemoveProjectMutation = () => {
    const router = useRouter()
    return useMutation(client.project.remove, {
        onSuccess: () => {
            Swal.fire({
                title: "Removed!",
                html: "So Sad! This project will be removed from system.Click [Ok] back to Project management",
                icon: "success"
            }).then((result) => {
                if (result.value) {
                    router.push('/project-management')
                }
            });
        }
    });
};


export const useSetFeaturedProjectMutation = () => {
    const router = useRouter()
    const { t } = useTranslation('common')
    return useMutation(client.project.setfeatured, {
        onSuccess: () => {
            Swal.fire({
                title: `${t('featured')}`,
                html: `${t('successfeatured')}`,
                icon: "success"
            }).then((result) => {
                if (result.value) {
                    router.push('/project-management')
                }
            });
        }
    });
};

export const useApproveReviewScroreProjectMutation = () => {
    const router = useRouter()
    return useMutation(client.project.approvereviewscoreaction, {
        onSuccess: () => {
            Swal.fire("Approved!", "This reviewd has been approved.", "success")
                .then((result) => {
                    if (result.value) {
                        router.reload()
                    }
                });
        }
    });
};