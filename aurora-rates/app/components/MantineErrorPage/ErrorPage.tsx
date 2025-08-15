'use client'

import { Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './ErrorPage.module.css';
import { ErrorCodeIllustration } from './ErrorCodeIllustration';
import {useRouter} from "next/navigation";



interface Props {
    title: string;
    description: string;
    buttonText: string;
    imagePath: string;
    route: string;
}

export function ErrorPage(props: Props) {

    const router = useRouter();

    const redirect = () => {
      router.push(props.route);
    };


    return (
        <Container className={classes.root}>
            <div className={classes.inner}>
                <ErrorCodeIllustration className={classes.image} imagepath={props.imagePath}/>
                <div className={classes.content}>
                    <Title className={classes.title}>{props.title}</Title>
                    <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                        {props.description}
                    </Text>
                    <Group justify="center">
                        <Button size="md" onClick={redirect}>{props.buttonText}</Button>
                    </Group>
                </div>
            </div>
        </Container>
    );
}