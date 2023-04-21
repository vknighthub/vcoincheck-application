import { FAQsResponse, SettingsQueryOptions } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import client from "./client"
import { useRouter } from "next/router"

export const useFAQQuery = (languages: SettingsQueryOptions) => {
    const { data, isLoading, refetch } = useQuery<FAQsResponse, Error>(
        ['faq'],
        () => client.faq.all(languages),
    )
    return {
        faq: data?.result.data,
        isLoading,
        refetch
    }
}

export const useAddFaqs = () => {
    const router = useRouter()
    return useMutation(client.faq.add, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                router.reload()
            }
        }
    });
};

export const useEditFaqs = () => {
    const router = useRouter()
    return useMutation(client.faq.edit, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                router.reload()
            }
        }
    });
};

export const useDeleteFaqs = () => {
    const router = useRouter()
    return useMutation(client.faq.delete, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                router.reload()
            }
        }
    });
};








