import {Modal, Button, TextInput, Textarea, Menu, Stack} from '@mantine/core';
import {ReviewRequest} from "@/app/services/ReviewsServices";
import {useEffect, useState} from "react";
import {DropzoneButton} from "@/app/components/MantineDropzone/DropzoneButton";


interface Props {
    isOpen: boolean;
    values: Review;
    mode: Mode;
    handleCreate: (request: ReviewRequest) => void;
    handleUpdate: (id: string, request: ReviewRequest) => void;
    handleCancel: () => void;
}

export enum Mode {
    Create,
    Edit,
}

export default function CreateUpdateReviewModal(props: Props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mediaTypeName, setMediaTypeName] = useState("");
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        setTitle(props.values.title);
        setContent(props.values.content);
        setMediaTypeName(props.values.mediaType);
    }, [props.values]);

    const handleOnOk = async () => {

        const reviewRequest = {title, content, mediaTypeName, image};
        
        if (props.mode == Mode.Create) {
            props.handleCreate(reviewRequest);
        } else {
            props.handleUpdate(props.values.id, reviewRequest);
        }
        setImage(null);
    };

    return (
        <div>
            <Modal opened={props.isOpen} title={props.mode === Mode.Create ? "Create" : "Edit Review"}
                   onClose={props.handleCancel}>
                <Stack>
                    <TextInput value={title} onChange={e => setTitle(e.target.value)} placeholder={"Enter title"}>

                    </TextInput>
                    <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder={"Enter content"}
                              autosize>

                    </Textarea>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Button>{mediaTypeName == undefined ? 'Choose category' : mediaTypeName}</Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                onClick={() => setMediaTypeName("Movie")}>Movie</Menu.Item>
                            <Menu.Item onClick={() => setMediaTypeName("Game")}>Game</Menu.Item>
                            <Menu.Item onClick={() => setMediaTypeName("Music")}>Music</Menu.Item>
                            <Menu.Item onClick={() => setMediaTypeName("Series")}>Series</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                    <Button onClick={() => handleOnOk()}>
                        {props.mode === Mode.Create ? "Create" : "Edit Review"}
                    </Button>
                    <DropzoneButton onDrop={(file : File) => setImage(file)}></DropzoneButton>
                </Stack>
            </Modal>
        </div>
    );
}