import { FAQsResponse, SettingsQueryOptions } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import client from "./client"

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

export const useEditFaqs = () => {
    return useMutation(client.faq.edit), {
        onSuccess: () => {

        }
    }
}
