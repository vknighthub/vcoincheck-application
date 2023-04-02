import { useQuery } from "@tanstack/react-query"
import client from "./client"
import { FAQsResponse } from "@/types"

export const useFAQQuery = () => {
    const { data, isLoading, refetch } = useQuery<FAQsResponse, Error>(
        ['faq'],
        () => client.faq.all(),
    )
    return {
        faq: data?.result.data,
        isLoading,
        refetch
    }
}
