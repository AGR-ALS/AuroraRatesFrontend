import {useRouter} from "next/navigation";
import {router} from "next/client";

export interface ReviewRequest {
    title: string;
    content: string;
    mediaTypeName: string;
    image: File | null;
}

export const GetAllReviews = async (mediaType: string | null) => {
    let url = "https://localhost:7131/reviews";
    if (mediaType) {
        url += `?MediaTypeName=${encodeURIComponent(mediaType)}`;
    }
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();

}

export const AddReview = async (review: ReviewRequest, handleRedirect: () => void) => {
    const formData = new FormData();

    formData.append("title", review.title);
    formData.append("content", review.content);
    formData.append("mediaTypeName", review.mediaTypeName);

    if (review.image) {
        formData.append("image", review.image); // File
    }

    const response = await fetch("https://localhost:7131/reviews", {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    if (response.status === 401) {
        handleRedirect();
    } else if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

};


export const UpdateReview = async (id: string, review: ReviewRequest) => {
    const formData = new FormData();

    formData.append("title", review.title);
    formData.append("content", review.content);
    formData.append("mediaTypeName", review.mediaTypeName);

    if (review.image) {
        formData.append("image", review.image); // File
    }

    const response = await fetch(`https://localhost:7131/reviews/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
}

export const DeleteReview = async (id: string) => {
    const response = await fetch(`https://localhost:7131/reviews/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
}