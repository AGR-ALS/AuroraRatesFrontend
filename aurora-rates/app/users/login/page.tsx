"use client";

export const dynamic = 'force-dynamic';


import {useState} from "react";
import {LoginUser, RegisterUser, UserLoginRequest, UserRegisterRequest} from "@/app/services/UserAuthenticationService";
import {useRouter, useSearchParams} from "next/navigation";
import {AuthenticationForm} from "@/app/components/MantineAuthenticationForm/AuthenticationForm";

export default function UserLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const authenticationType = searchParams.get("authenticationType");

    const defaultValues = {
        nickname: "",
        password: "",
    } as User;

    const [user, setUser] = useState<User>(defaultValues);

    const handleLogin = async (userRequest: UserLoginRequest) => {
        try {
            await LoginUser(userRequest);
        }catch(err: any) {
            if (err.message == "Incorrect login or password") {
                throw new Error(err.message);
            }
        }
        router.push("/reviews");

        setUser(defaultValues);
    }

    const handleRegister = async (userRequest: UserRegisterRequest) => {
        await RegisterUser(userRequest);
        router.push("/reviews");

        setUser(defaultValues);
    }

    const handleCancel = () => {
    } //erase this later


    return (

        <div style={{display: "flex", justifyContent: "center", alignContent: "center", height: '100%'}}>
                <AuthenticationForm key={authenticationType} values={user} handle_login={handleLogin}
                                    handle_register={handleRegister} handle_cancel={handleCancel}
                                    isLoginState={authenticationType === 'login'}/>
        </div>
    );
}