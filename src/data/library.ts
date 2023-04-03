import { useMutation } from "@tanstack/react-query";
import client from "./client";

export const useRemoveLibraryMutation = () => {
    return useMutation(client.library.removelibrary, {
        onSuccess: () => {
        }
    });
};
export const usePostLibrary = () => {
    return useMutation(client.library.postlibrary), {
        onSuccess: () => {
            
        }
    }
}