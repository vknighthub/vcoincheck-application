import { useMutation } from "@tanstack/react-query";
import client from "./client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export const useAddNewsMutation = () => {
    const router = useRouter()
    return useMutation(client.news.addnews, {
        onSuccess: () => {
            Swal.fire("Approved!", "This reviewd has been approved.", "success")
                .then((result) => {
                    if (result.value) {
                        router.push("/event/news")
                    }
                });
        }
    });
};
