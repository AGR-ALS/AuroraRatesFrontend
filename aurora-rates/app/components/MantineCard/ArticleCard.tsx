import { Avatar, Card, Group, Image, Text } from '@mantine/core';
import classes from './ArticleCard.module.css';
import moment from "moment";

interface cardProps {
    review : Review;
    handleOpenModal: (review:Review) => void;
}


export function ArticleCard(props: cardProps) {
    return (
        <Card withBorder radius="md" p={0} className={classes.card} onClick={() => props.handleOpenModal(props.review)}>
            <Image
                src={props.review.imagePath === null ? "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" : props.review.imagePath}
                className={classes.image}
            />

            <div className={classes.body}>
                <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                    {props.review.mediaType}
                </Text>
                <Text className={classes.title} mt="xs" mb="md">
                    {props.review.title}
                </Text>
                <Group wrap="nowrap" gap="xs" >
                    <Group gap="xs" wrap="nowrap">
                        {/*<Avatar*/}
                        {/*    size={20}*/}
                        {/*    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"*/}
                        {/*/>*/}
                        <Text size="xs">{props.review.authorNickname}</Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                        •
                    </Text>
                    <Text size="xs" c="dimmed">
                        {moment(props.review.createdAt).format('DD.MM.YYYY HH:mm')}
                    </Text>
                </Group>
            </div>
        </Card>
    );
}