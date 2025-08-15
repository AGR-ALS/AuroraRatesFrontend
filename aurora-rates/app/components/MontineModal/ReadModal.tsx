import { Button, Group, Modal, Stack } from "@mantine/core";

interface props {
    isOpen: boolean;
    handleClose: () => void;
    values: Review;
    handleOpenEditModal: (review: Review) => void;
    handleDelete: (id: string) => void;
    userNickname: string|null;
}


export default function (props: props) {
    return (

        <Modal.Root opened={props.isOpen} onClose={props.handleClose} trapFocus={false}>
            <Modal.Overlay/>
            <Modal.Content>
                <Modal.Header style={{position: "relative", padding:'4%', paddingBottom: '2%', borderBottom:'1px solid var(--mantine-color-gray-3)'}}>
                    <Stack >
                    <div style={{ display: "flex",  gap: "8px" }}>
                        {props.userNickname === props.values.authorNickname ? (<Group gap={"xs"}>
                            <Button
                                variant="light"
                                onClick={() => props.handleOpenEditModal(props.values)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="light"
                                onClick={() => props.handleDelete(props.values.id)} color={"red"}
                            >
                                Delete
                            </Button>
                        </Group> )
                            : (<Group style={{marginBottom:'4%'}}></Group>) }
                        <Modal.CloseButton variant="transparent" style={{
                            position: "absolute",
                            top: "auto",
                            right: "4%",
                        }}/>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                        <Modal.Title style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                            {props.values.title}
                        </Modal.Title>
                    </div>
                    </Stack>

                </Modal.Header>



                <Modal.Body style={{whiteSpace: "pre-wrap", wordBreak: "break-word", padding:'4%', paddingTop: '2%'}}>
                    {props.values.content}
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>

    );
}