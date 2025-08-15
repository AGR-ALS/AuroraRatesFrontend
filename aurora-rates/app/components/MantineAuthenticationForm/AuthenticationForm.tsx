﻿import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { GoogleButton } from './GoogleButton';
import { TwitterButton } from './TwitterButton';
import {UserLoginRequest, UserRegisterRequest} from "@/app/services/UserAuthenticationService";
import {useState} from "react";
import ErrorNotification from "@/app/components/Notifications/ErrorNotification";

interface FormProps extends PaperProps{
    values: User;
    handle_login: (userRequest: UserLoginRequest) => void;
    handle_register: (userRequest: UserRegisterRequest) => void;
    handle_cancel: () => void;
    isLoginState : boolean;
}

export function AuthenticationForm(props: FormProps) {
    const [isLoginIn, setIsLoginIn] = useState(props.isLoginState);
    const [loginError, setLoginError] = useState(false);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
            name: (val) =>
                (!isLoginIn && val.trim().length === 0 ? 'Name is necessary!' : null),
            terms: (val) =>
                (!isLoginIn && !val ? 'You must accept terms of condition to use the service!' : null),
        },
    });


    const onFormSubmit = async () => {
        let userRequest: UserLoginRequest | UserRegisterRequest;

        try {
            if (!isLoginIn) {
                userRequest = {
                    nickname: form.values.name,
                    email: form.values.email,
                    password: form.values.password,
                } as UserRegisterRequest;

                props.handle_register(userRequest as UserRegisterRequest);
            } else {
                userRequest = {
                    email: form.values.email,
                    password: form.values.password,
                } as UserLoginRequest;

                await props.handle_login(userRequest as UserLoginRequest);
            }

            setLoginError(false);
        } catch (error: any) {
            if (error.message === 'Incorrect login or password') {
                setLoginError(true);
            } else {
                console.error('Login error', error);
            }
        }
    };


    return (
        <Paper radius="md" p="lg" withBorder={true} style={{width:'20%', justifySelf: 'center', alignSelf: 'flex-start', minWidth:"370px", position:"relative", top: '17vh'}} >
            <Text size="lg" fw={500}>
                Welcome to AuroraRates, please log in or create an account.
            </Text>

            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl">Google</GoogleButton>
                <TwitterButton radius="xl">Twitter</TwitterButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            {isLoginIn && loginError && (
                <ErrorNotification message={"Incorrect login or password!"} onClose={() => {setLoginError(false)}}>

                </ErrorNotification>
            )}

            <form onSubmit={form.onSubmit(() => onFormSubmit())}>
                <Stack>
                    {!isLoginIn && (
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            error={form.errors.name && 'Name is necessary!'}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {!isLoginIn && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            error={form.errors.terms && 'You must accept terms of condition to use the service!'}
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => setIsLoginIn(!isLoginIn)} size="xs">
                        {!isLoginIn
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {!isLoginIn ? 'Register' : 'Login'}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}