import "antd/es/card/style";
import {ArticleCard} from "@/app/components/MantineCard/ArticleCard"; // Optional: import styles if not already imported globally
import styles from "./Reviews.module.css";

type ReviewCardProps = {
    reviews: Review[];
    handleOpen: (review: Review) => void;
}

export const Reviews = ({ reviews, handleOpen }: ReviewCardProps) => {
    return (
        <div className={styles.grid}>
            {reviews.map((review: Review) => (
                <div className={styles.item} key={review.id}>
                    <ArticleCard review={review}  handleOpenModal={handleOpen}/>
                </div>
            ))}
        </div>
    );
};