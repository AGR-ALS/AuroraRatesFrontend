"use client";


import {FloatButton} from "antd";
import {PlusCircleOutlined} from '@ant-design/icons';
import {Reviews} from "../components/Reviews";
import {useEffect, useState} from "react";
import {AddReview, DeleteReview, GetAllReviews, ReviewRequest, UpdateReview} from "../services/ReviewsServices";
import {useRouter, useSearchParams} from "next/navigation";
import CreateUpdateReviewModal, {Mode} from "@/app/components/MontineModal/CreateUpdateReviewModal";
import ReadModal from "@/app/components/MontineModal/ReadModal";
import {Title} from "@mantine/core";
import {GetUserNickname} from "@/app/services/UserAuthenticationService";

export default function ReviewsPage() {

    const searchParams = useSearchParams();
    const mediaType = searchParams.get("MediaTypeName");
    const router = useRouter();

    const defaultValues = {
        title: "",
        content: "",
        createdAt: "",
        mediaTypeName: "",
        image: null,
    } as unknown as Review;
    const [values, setValues] = useState<Review>(defaultValues);

    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [isReadModalOpen, setIsReadModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);
    const [userNickname, setUserNickname] = useState<string|null>("");

    useEffect(() => {
        const getUserNickname = async () =>
        {
            const res = await GetUserNickname();
            setUserNickname(res);
        };

        getUserNickname();

    }, []);

    const handleCreateReview = async (review: ReviewRequest) => {
        await AddReview(review, () => { router.push("/users/login?authenticationType=login"); });
        closeFormModal();

        const reviews = await GetAllReviews(mediaType);
        setReviews(reviews);
    }

    const handleUpdateReview = async (id: string, review: ReviewRequest) => {
        await UpdateReview(id, review);
        closeFormModal();
        closeReadModal();

        const reviews = await GetAllReviews(mediaType);
        setReviews(reviews);
    }

    const handleDeleteReview = async (id: string) => {
        await DeleteReview(id);
        closeReadModal();

        const reviews = await GetAllReviews(mediaType);
        setReviews(reviews);
    }
    const openModal = () => {
        setMode(Mode.Create);
        setIsModalFormOpen(true);
    }
    const closeFormModal = () => {
        if (mode === Mode.Create) {
            setValues(defaultValues);
        }
        setIsModalFormOpen(false);
    }

    const closeReadModal = () => {
        setValues(defaultValues);
        setIsModalFormOpen(false);
        setIsReadModalOpen(false);
    }

    const openEditModal = (review: Review) => {
        setMode(Mode.Edit);
        setIsModalFormOpen(true);
        setValues(review);
    }

    const openReadModal = (review: Review) => {
        setIsReadModalOpen(true);
        setValues(review);
    }


    useEffect(() => {
        const getReviews = async () => {
            const reviews = await GetAllReviews(mediaType);
            setIsLoading(false)
            setReviews(reviews);
        };
        getReviews();
    }, [mediaType]);


    return (
        <div>

                <ReadModal values={values} isOpen={isReadModalOpen} handleClose={closeReadModal}
                           handleOpenEditModal={openEditModal} handleDelete={handleDeleteReview} userNickname={userNickname}></ReadModal>
                <CreateUpdateReviewModal isOpen={isModalFormOpen} values={values} mode={mode}
                                         handleCreate={handleCreateReview} handleUpdate={handleUpdateReview}
                                         handleCancel={closeFormModal}/>
                {isLoading ? (<Title>Loading...</Title>) :
                    <Reviews reviews={reviews} handleOpen={openReadModal}></Reviews>}
                <FloatButton style={{insetInlineEnd: 50}} type={"primary"} icon={<PlusCircleOutlined/>}
                             onClick={openModal}></FloatButton>
        </div>
    )
}

